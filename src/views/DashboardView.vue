<template>
  <v-container class="home">
    <WordForm :is-edit="isEdit" @onSubmit="handleSubmit" @onCancel="resetWordObject" :edit-word-object="editWordObject" />
    <WordsList @onRemove="handleRemoveWord" @onEdit="handleEditWord" :list-words="words" />
  </v-container>
</template>

<script setup lang="ts">
import WordsList from "@/components/WordsList.vue";
import WordForm from "@/components/WordForm.vue";
import { useWords } from "@/hooks/words";
import { wordI } from "@/interfaces";
import { ref } from "vue";
const { words, createWord, removeWord, updateWord } = useWords();
const isEdit = ref(false);
const editWordObject = ref();

const handleSubmit = (bodyRequest: wordI, id: string | null) => {
  if (isEdit.value && id) {
    updateWord(bodyRequest, id);
    resetWordObject();
    return;
  }

  createWord(bodyRequest);
}

const handleEditWord = (word: wordI) => {
  editWordObject.value = word;
  isEdit.value = true;
}
const resetWordObject = () => {
  isEdit.value = false;
  editWordObject.value = null;
}

const handleRemoveWord = (id: string) => {
  removeWord(id);
}
</script>
