import {useFetch} from "@/hooks/fetch";
import { ref } from "vue";
import { wordI } from "@/interfaces";

export function useWords() {
    const loading = ref(false);
    const {response: words, request} = useFetch();
    const getAllWords = async () => {
        await request('/words', {
            method: 'GET'
        })
        loading.value = true
    }

    const createWord =  async (body: wordI) => {
        await request('/words', {
            body: JSON.stringify(body),
            method: 'Post',
            headers: {
                "Content-Type": "application/json",
            },
        })

        await getAllWords()
    }

    const updateWord = async (body: wordI, id: string) => {
        await request(`/words/${id}`, {
            body: JSON.stringify(body),
            method: 'Put',
            headers: {
                "Content-Type": "application/json",
            },
        })

        await getAllWords()
    }

    const removeWord =  async (id: string) => {
        await request(`/words/${id}`, {
            method: 'Delete',
        })

        await getAllWords()
    }

    if(!loading.value) {
        getAllWords();
    }

    return {words, createWord, removeWord, updateWord};
 }