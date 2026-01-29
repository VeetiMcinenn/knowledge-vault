export async function addDocument({ title, text }) {
  const res = await fetch("/api/documents", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, text })
  });
  if (!res.ok) throw new Error(await res.text());
  console.log("Ran successfully")
  return res.json();
}

export async function search(query) {
  const res = await fetch("/api/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, limit: 10 })
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}