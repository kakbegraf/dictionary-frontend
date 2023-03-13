import { ref } from 'vue';

export function useFetch() {
    const response = ref();
    const apiUrl = process.env.VUE_APP_API_URL;
    const controller = new AbortController();
    const signal = controller.signal;
    const request = async (url: string, options: RequestInit) => {
        const res = await fetch(apiUrl + url, {signal, ...options})
        response.value = await res.json()
    }

    return {response, request};
}