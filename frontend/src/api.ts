// src/api.ts

export type VaultDocument = {
  _id?: string
  title: string
  text: string
  createdAt?: string
  updatedAt?: string
}

export type AddDocumentPayload = {
  title: string
  text: string
}

export type SearchResponse = VaultDocument[]

export async function addDocument(
  { title, text }: AddDocumentPayload
): Promise<VaultDocument> {
  const res = await fetch("/api/documents", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, text }),
  })

  if (!res.ok) {
    throw new Error(await res.text())
  }

  console.log("Ran successfully")
  return res.json() as Promise<VaultDocument>
}

export async function search(
  query: string
): Promise<SearchResponse> {
  const res = await fetch("/api/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, limit: 10 }),
  })

  if (!res.ok) {
    throw new Error(await res.text())
  }

  return res.json() as Promise<SearchResponse>
} 