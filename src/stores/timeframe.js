import { writable } from 'svelte/store';

const stored = parseInt(localStorage.timeframe, 10);
export const timeframe = writable(stored || 60);
timeframe.subscribe((value) => {
  localStorage.timeframe = value;
});