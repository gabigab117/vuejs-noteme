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

      const deleteNote = (noteID) => { // l'ID de la note à supprimer est passé en paramètre
        const idToDelete = notes.value.findIndex(element); // finIndex est comme un map, itère sur chaque élément du tableau et renvoie l'index de l'élément qui correspond à la condition
        function element(note) {
          return note.id === noteID; // findIndex renvoie la réponse de la fonction element
        };
        // Je pourrais faire const idToDelete = notes.value.findIndex(notes => notes.id === noteID); Une fonction flechée raccourcie sans return
        notes.value.splice(idToDelete, 1); // Supprime 1 élément à partir de l'index idToDelete (1 car 1 element)
      };


      const addContentToNewNote = (content) => {
        const lastId = notes.value.length ? parseInt(notes.value[notes.value.length - 1].id.substring(2)) : 0;
        // Si le lenght n'est pas à O, on renvoie le dernier ID de la note, sinon on renvoie 0. ? c'est IF et les deux points c'est ELSE
        // le parseInt permet de convertir une chaîne de caractères en nombre entier
        // On prend la taille de notre liste de notes, on soustrait 1 pour avoir l'index du dernier élément et on prend son ID
        // substring(2) permet de ne pas prendre les deux premiers caractères de l'ID (id)
        // Si length renvoie une information (pas false) on renvoie 1, sinon on passe dans le parseInt
        const newNote = {
          id: "id" + (lastId + 1),
          content: content
        };
        notes.value.push(newNote);
      };

      return { notes, deleteNote, addContentToNewNote, totalNotesCount, totalCharactersCount };

});