import { writable } from 'svelte/store';

const stored = localStorage.apiKey;
export const apiKey = writable(stored || "");
apiKey.subscribe((value) => {
  localStorage.apiKey = value;
});