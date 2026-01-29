<script setup lang="ts">
import { ref } from "vue"
import { addDocument } from "./api"
import type { VaultDocument } from "./api"

const documentBody = ref<string>("")
const title = ref<string>("")

const isSubmitting = ref<boolean>(false)
const errorMessage = ref<string | null>(null)
const created = ref<VaultDocument | null>(null)

const submitDocument = async (): Promise<void> => {
  errorMessage.value = null
  created.value = null

  if (!title.value.trim() || !documentBody.value.trim()) {
    errorMessage.value = "Title and document body are required."
    return
  }

  try {
    isSubmitting.value = true
    created.value = await addDocument({
      title: title.value.trim(),
      text: documentBody.value.trim(),
    })

    title.value = ""
    documentBody.value = ""
  } catch (err) {
    errorMessage.value = err instanceof Error ? err.message : String(err)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div id="Add_documents">
    <input
      type="text"
      v-model="title"
      placeholder="Document title"
      :disabled="isSubmitting"
    />

    <textarea
      v-model="documentBody"
      placeholder="Paste your document here"
      :disabled="isSubmitting"
    />

    <button @click="submitDocument" :disabled="isSubmitting">
      {{ isSubmitting ? "Submitting..." : "Submit document" }}
    </button>

    <p v-if="errorMessage" style="color: red;">
      {{ errorMessage }}
    </p>

    <p v-if="created">
      Saved: <strong>{{ created.title }}</strong>
    </p>
  </div>
</template>