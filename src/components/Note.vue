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
    @click.prevent="modals.deleteNote = true"
     href="#" 
     class="card-footer-item"
     >Delete</a>
  </footer>

  <ModalDeleteNote 
  v-if="modals.deleteNote"
  v-model="modals.deleteNote"
  :noteId="props.note.id"
   /><!-- On créé un v-model avec ce que l'on veut passer à false ou true, 
   il va être envoyer sur ModalDeleteNote, on le récupère en props
   v-model permet de renvoyer des informations, et peut changer  
   Pour noteID, on récupère notre const props qui est une note et on l'envoie ModalDeleteNote
   
   -->
  
</div>
</template>

<script setup>
import { computed, ref, nextTick, reactive } from 'vue';
import { useNoteStore } from '@/stores/notes';
import { useWatchCharacters } from '@/composables/useWatcherCharacters';
import { onClickOutside } from "@vueuse/core";
import ModalDeleteNote from '@/components/Notes/ModalDeleteNote.vue';

const store = useNoteStore();

const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
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

// Pour gérer le Modal quand on clique sur delete
// Un objetp our réunir tous les modal que l'on peut avoir
const modals = reactive({
  deleteNote: false
});

</script>