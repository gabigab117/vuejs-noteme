<template>
    <div class="stats">
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>Stat</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Number of notes</td>
                    <td>{{ store.totalNotesCount }}</td>
                </tr>
                <tr>
                    <td>Number of Characters</td>
                    <td>{{ store.totalCharactersCount }}</td>
                </tr>
            </tbody>

        </table>
        

    </div>

</template>

<script setup>
import { useNoteStore } from '@/stores/notes';

const store = useNoteStore();

console.log(store.totalNotesCount, store.totalCharactersCount);
</script>