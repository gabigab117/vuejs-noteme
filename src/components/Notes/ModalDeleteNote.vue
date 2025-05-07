<template>
    <div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-card" ref="modalCardRef">
    <header class="modal-card-head">
      <p class="modal-card-title">Delete note ?</p>
      <button @click="closeModal" class="delete" aria-label="close"></button>
    </header>
    <section class="modal-card-body">
      A re you sure you want to delete this note ?
    </section>
    <footer class="modal-card-foot is-justify-content-end">
      <div class="buttons">
        <button @click="store.deleteNote(props.noteId)" class="button is-success">Delete</button>
        <button @click="closeModal" class="button">Cancel</button>
      </div>
    </footer>
  </div>
</div>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core';
import { ref } from 'vue';
import { useNoteStore } from '@/stores/notes';

const store = useNoteStore();

const modalCardRef = ref(null);

const props = defineProps({
    modelValue: { // on récupère le props, modelValue convention
        type: Boolean,
        default: true
    },
    noteId: { // Ce que l'on rédupère de Notes.vue et on l'utilise dans delete
    type: String,
    required: true,
  }
});

const emit = defineEmits(["update:modelValue"]) // On déclare la liste, on est obligé de mettre update pour mettre à jour, convention
// Il sera mis à jour dans son parent
const closeModal = () => emit("update:modelValue", false) // et ici la fonction flechée pour mettre à jour.

// Avec le modalCardRef
onClickOutside(modalCardRef, closeModal);

</script>