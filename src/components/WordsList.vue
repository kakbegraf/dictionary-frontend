<template>
  <v-container class="mt-4">
    <v-row>
      <v-col>
        Words List:
      </v-col>
      <v-col cols="12" class="d-flex justify-space-between" v-for="item in props.listWords" :key="item.id">
        {{item.word}} - {{item.translation}}
        <div class="d-flex">
          <v-btn color="blue" @click="onEdit(item)" class="mr-2">
            <v-icon icon="mdi-pencil"></v-icon>
          </v-btn>
          <v-btn color="red" @click="onRemove(item.id)">
            <v-icon icon="mdi-delete"></v-icon>
          </v-btn>
        </div>

      </v-col>
    </v-row>
  </v-container>

</template>

<script setup lang="ts">
import {defineProps, defineEmits} from "vue";
import {SweetAlertResult} from "sweetalert2";
import {wordI} from "@/interfaces";
import Swal from 'sweetalert2'

const emit = defineEmits(['onRemove', 'onEdit'])

const props = defineProps({
  listWords: { required: true },
});

const onRemove = (id: string) => {
  const options = {
    title: 'Are you sure?',
    showCancelButton: true,
    confirmButtonText: 'Delete It',
  }
  Swal.fire(options).then((result: SweetAlertResult) => {
    if (result.isConfirmed) {
      emit('onRemove', id);
    }
  })
}

const onEdit = (word: wordI) => {
  emit('onEdit', word);
}

</script>

<style scoped>

</style>