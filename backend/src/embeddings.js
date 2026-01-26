export async function embedText(text, purpose = "document") {
  // Best practice for Nomic models: prefix query vs document text
  // (keeps embeddings in the right “space” for retrieval)
  const prefix = purpose === "query" ? "search_query: " : "search_document: ";
  const prompt = prefix + text;

  const res = await fetch(`${process.env.OLLAMA_BASE_URL}/api/embeddings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.OLLAMA_EMBED_MODEL,
      prompt
    })
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Ollama embeddings failed: ${res.status} ${msg}`);
  }

  const data = await res.json();
  return data.embedding; // number[]
}