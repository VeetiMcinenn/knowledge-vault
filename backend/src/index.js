import "dotenv/config";
import express from "express";
import cors from "cors";
import { getCollection } from "./db.js";
import { embedText } from "./embeddings.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});


app.post("/api/documents", async (req, res) => {
  try {
    const { title = "", text } = req.body;
    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "text is required" });
    }

    const embedding = await embedText(text, "document");

    const col = await getCollection();
    const doc = {
      title,
      text,
      embedding,
      createdAt: new Date()
    };

    const result = await col.insertOne(doc);
    res.json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post("/api/search", async (req, res) => {
  try {
    const { query, limit = 10 } = req.body;
    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "query is required" });
    }

    const queryVector = await embedText(query, "query");
    const col = await getCollection();

    const pipeline = [
      {
        $vectorSearch: {
          index: process.env.VECTOR_INDEX_NAME,
          path: "embedding",
          queryVector,
          numCandidates: 100,
          limit: Number(limit)
        }
      },
      {
        $project: {
          title: 1,
          text: 1,
          score: { $meta: "vectorSearchScore" }
        }
      }
    ];

    const results = await col.aggregate(pipeline).toArray();
    res.json({ results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


