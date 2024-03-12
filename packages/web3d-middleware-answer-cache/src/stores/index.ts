import { useAnswerStore, useDrama } from '@cutie/web3d';
import { klona } from 'klona';
import localforage from 'localforage';
import { defineStore, storeToRefs } from 'pinia';
import { ref } from 'vue';

export const useAnswerCacheStore = defineStore('plugin::answer-cache', () => {
    const { answer } = storeToRefs(useAnswerStore());
    const { page, onApplyOperation } = useDrama();
    const key = `answer-${page.response!.id}`;

    const autoSave = ref(false);

    const save = () => {
        localforage.setItem(key, klona(answer.value));
    };

    onApplyOperation(() => {
        if (autoSave.value) save();
    });

    return {
        key,
        autoSave,
        save
    };
});