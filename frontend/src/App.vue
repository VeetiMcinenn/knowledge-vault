<script setup>
  import { ref } from 'vue'
  import { addDocument } from './api'

  const documentBody = ref('')
  const title = ref('')

  const submitDocument = () => {
    addDocument({
      title: title.value,
      text: documentBody.value
    })
  }
</script>

<template>
    <div id="Add_documents">
      <input 
        type="text"
        v-model="title"
        placeholder="Document title"
      />
      
      <textarea
       v-model="documentBody"
       placeholder="Paste your document here">
      </textarea>
    
      <button @click="submitDocument">Submit document</button>
    </div>

</template>

<style>

</style>