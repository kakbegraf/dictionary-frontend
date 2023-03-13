<template>
  <v-form @submit.prevent="onSubmit">
    <v-container>
      <v-row>
        <v-col cols="12">
          Add New Word
        </v-col>
        <v-col cols="12" md="6" lg="4" class="pb-0">
          <v-text-field
              v-model="word.value.value"
              name="word"
              label="Word"
              :error-messages="word.errorMessage.value"
          />

        </v-col>
        <v-col cols="12" md="6" lg="4" class="pb-0">
          <v-text-field
              v-model="translation.value.value"
              name="Translation"
              label="Translation"
              :error-messages="translation.errorMessage.value"
          />
        </v-col>
        <v-col cols="12" lg="4" class="d-flex justify-end">
          <v-btn :color="isEdit ? 'blue': 'green'" size="x-large" type="submit" :block="!isEdit">{{isEdit ? 'Update': 'Add New'}}</v-btn>
          <v-btn v-if="isEdit" class="ml-2" size="x-large" type="button" @click="onCancel">Cancel</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, watch, PropType } from 'vue';
import { useField, useForm } from "vee-validate";
import {wordWithIdI} from "@/interfaces";

const props = defineProps({
  editWordObject: { type: Object as PropType<wordWithIdI>, required: true },
  isEdit: { type: Boolean, required: true },
});

watch((): wordWithIdI => props.editWordObject, (values: wordWithIdI) => {
  if(values) {
    word.value.value = values.word
    translation.value.value = values.translation
  }
});

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    word(value: string): string | boolean {
      if (value) return true
      return 'Word field is required'
    },
    translation(value: string): string | boolean {
      if (value) return true
      return 'Translation field is required'
    }
  }
});
const word = useField('word');
const translation = useField('translation');
const emit = defineEmits(['onSubmit', 'onCancel']);

const onSubmit = handleSubmit((values) => {
  const currenId = props.editWordObject ? props.editWordObject.id : null
  emit('onSubmit', values, currenId);
  handleReset();
})
const onCancel = handleSubmit((values) => {
  const currenId = props.editWordObject ? props.editWordObject.id : null
  emit('onCancel');
  handleReset();
})
</script>

<style scoped>

</style>