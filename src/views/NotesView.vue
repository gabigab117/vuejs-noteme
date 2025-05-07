<template>
  <div class="notes">



    <div class="card p-4 mt-5 has-background-success-light">
      <div class="field">
        <label class="label">Message</label>
        <div class="control">
          <textarea ref="textareaRef" v-autofocus v-model="textareaContent" class="textarea" placeholder="Textarea" maxlength="10"></textarea>
        </div>
      </div>


      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button @click="addContentToNewNote" :disabled="!textareaContent"
            class="button is-link has-background-success">
            Add new note
          </button>
        </div>

      </div>
    </div>

    <Note v-for="note in store.notes.slice().reverse()" :key="note.id" :note=note /><!--note de v-for-->

  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import Note from '@/components/Note.vue';
import { useNoteStore } from '@/stores/notes';
import { vAutofocus } from '@/directives/vAutofocus'; // On a fait v-autofocus, il reconnait comme ça.
import { useWatchCharacters } from '@/composables/useWatcherCharacters';


const store = useNoteStore() // contient notes


const textareaContent = ref("");
const textareaRef = ref(null);


const addContentToNewNote = () => {
  store.addContentToNewNote(textareaContent.value);
  textareaContent.value = "";
  textareaRef.value.focus();
};

onMounted(() => useWatchCharacters(textareaContent, textareaRef.value.maxLength));
</script>