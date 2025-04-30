import { watch } from "vue";

export function useWatchCharacters(noteContent, limit) {
    watch(noteContent, newValue => {
        if (newValue.length >= limit)
        alert(`${limit} characters max !`);
    });
}