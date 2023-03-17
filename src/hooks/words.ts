import {useFetch} from "@/hooks/fetch";
import { ref } from "vue";
import {wordI, wordWithIdI} from "@/interfaces";

export function useWords() {
    const loading = ref(false);
    const {response, request} = useFetch();
    const words = ref();
    const getAllWords = async () => {
        await request('/words', {
            method: 'GET'
        });
        loading.value = true;
        words.value = response.value;
    }

    const createWord =  async (body: wordI) => {
        const response = await request('/words', {
            body: JSON.stringify(body),
            method: 'Post',
            headers: {
                "Content-Type": "application/json",
            },
        });

        words.value.push(response.value);
    }

    const updateWord = async (body: wordI, id: string) => {
        await request(`/words/${id}`, {
            body: JSON.stringify(body),
            method: 'Put',
            headers: {
                "Content-Type": "application/json",
            },
        });

        const index =  words.value.findIndex((word: wordWithIdI) => word.id === response.value.id);

        words.value[index] = {...response.value};
    }

    const removeWord =  async (id: string) => {
        await request(`/words/${id}`, {
            method: 'Delete',
        });

        words.value = words.value.filter((word: wordWithIdI) => word.id !== id);
    }

    if(!loading.value) {
        getAllWords();
    }

    return {words, createWord, removeWord, updateWord};
 }