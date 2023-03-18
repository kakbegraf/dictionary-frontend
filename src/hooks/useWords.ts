import {useFetch} from "@/hooks/useFetch";
import { ref } from "vue";
import {wordI, wordWithIdI} from "@/interfaces";
import {useError} from "@/hooks/useError";

export function useWords() {
    const loading = ref(false);
    const {response, request} = useFetch();
    const {displayError} = useError();
    const words = ref();
    const getAllWords = async () => {
        try {
            await request('/words', {
                method: 'GET'
            });
            loading.value = true;
            words.value = response.value;
        } catch (e: any) {
            displayError(e.message);
        }
    }

    const createWord = async (body: wordI) => {
        try {
            const response = await request('/words', {
                body: JSON.stringify(body),
                method: 'Post',
                headers: {
                    "Content-Type": "application/json",
                },
            });

            words.value.push(response.value);
        } catch (e: any) {
            displayError(e.message);
        }

    }

    const updateWord = async (body: wordI, id: string) => {
        try {
            await request(`/words/${id}`, {
                body: JSON.stringify(body),
                method: 'Put',
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const index =  words.value.findIndex((word: wordWithIdI) => word.id === response.value.id);

            words.value[index] = {...response.value};
        } catch (e: any) {
            displayError(e.message);
        }

    }

    const removeWord = async (id: string) => {
        try {
            await request(`/words/${id}`, {
                method: 'Delete',
            });

            words.value = words.value.filter((word: wordWithIdI) => word.id !== id);
        } catch (e: any) {
            displayError(e.message);
        }

    }

    if(!loading.value) {
        getAllWords();
    }

    return {words, createWord, removeWord, updateWord};
 }