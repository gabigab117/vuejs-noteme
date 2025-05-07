<template>
    <div class="card" ref="cardRef">

  <div class="card-content">
    <textarea v-if="isEditEvent" ref="textAreaRef" class="textarea is-success" v-model="textareaContent" maxlength="10" />

    <div v-else class="content">
      {{ props.note.content }}
    
    </div>

    <div class="has-text-right has-text-success">
      {{ charactersCount }}
    </div>


  </div>
  <footer v-if="isEditEvent" class="card-footer">
    <a 
    @click.prevent="editOut(true)"
    href="#" 
    class="card-footer-item"
    >Save</a>
    <a
    @click.prevent="editOut(false)"
     href="#" 
     class="card-footer-item"
     >Cancel</a>
  </footer>

  
  <footer v-else class="card-footer">
    <a href="#"
    @click.prevent="editNote"
     class="card-footer-item"
     >Edit</a>
    <a
    @click.prevent="store.deleteNote(props.note.id)"
     href="#" 
     class="card-footer-item"
     >Delete</a>
  </footer>
</div>
</template>

<script setup>
import { computed, ref, nextTick } from 'vue';
import { useNoteStore } from '@/stores/notes';
import { useWatchCharacters } from '@/composables/useWatcherCharacters';
import { onClickOutside } from "@vueuse/core";

const store = useNoteStore();

const props = defineProps({
  note: {
    type: Object,
    required: true,
  }
});

const charactersCount = computed(() => {
  const length = isEditEvent ? textareaContent.value.length : props.note.content.length; // EN mode edit taille de la textareaContent
  return `${length} ${length > 1 ? "characters": "character"}`
});

// Edit
const textareaContent = ref(props.note.content);
const textAreaRef = ref(null);
const isEditEvent = ref(false);

const editNote = async () => {
  isEditEvent.value = true;
  // Attendre que le dom soit mis à jour.
  await nextTick(() => {
    textAreaRef.value.focus();
    useWatchCharacters(textareaContent, textAreaRef.value.maxLength);
  });
  
};

const editOut = (save) => {
  if (save) {
    props.note.content = textareaContent.value;
  } else {
    textareaContent.value = props.note.content;
  }
  isEditEvent.value = false;
};

const cardRef = ref(null)
onClickOutside(cardRef, () => isEditEvent.value = false); // click outside de la ref
</script>