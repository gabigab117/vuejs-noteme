import { defineStore } from "pinia";
import { computed, ref } from "vue";

// Utilise toujours use, et definStore prend le nom du fichier
export const useNoteStore = defineStore("notes", () => {

    const notes = ref([
        {
          id: "id1",
          content: "Lorem machin truc"
        },
        {
          id: "id2",
          content: "Lorem machin truc"
        },
        {
          id: "id3",
          content: "Lorem machin truc"
        },
      ]);

      const totalNotesCount = computed(() => notes.value.length);
      const totalCharactersCount = computed(() => {
        let count = 0;
        notes.value.forEach(note => count += note.content.length);
        return count;
      })

      const deleteNote = (noteID) => {
        const idToDelete = notes.value.findIndex((element));
        function element(note) {
          return note.id === noteID;
        };
        // Je pourrais faire const idToDelete = notes.value.findIndex(notes => notes.id === noteID); Une fonction flechée raccourcie sans return
        notes.value.splice(idToDelete, 1);
      };


      const addContentToNewNote = (content) => {
        const lastId = notes.value.length ? parseInt(notes.value[notes.value.length - 1].id.substring(2)) : 1
        // Si length renvoie une information (pas false) on renvoie 1, sinon on passe dans le parseInt
        const newNote = {
          id: "id" + (lastId + 1),
          content: content
        };
        notes.value.push(newNote);
      };

      return { notes, deleteNote, addContentToNewNote, totalNotesCount, totalCharactersCount };

});