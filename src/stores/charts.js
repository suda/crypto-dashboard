import { writable } from 'svelte/store';

const stored = localStorage.charts ? JSON.parse(localStorage.charts) : undefined;
let lastValue = stored;
export const charts = writable(stored || [{ fsym: 'BTC', tsym: 'USD' }]);
charts.subscribe((value) => {
  localStorage.charts = JSON.stringify(value);
  lastValue = value;
});
export const removeOne = ({ fsym, tsym }) => {
  lastValue = lastValue.filter((o) => !(o.fsym === fsym && o.tsym === tsym));
  charts.set(lastValue);
};
export const addOne = ({ fsym, tsym }) => {
  lastValue.push({ fsym, tsym });
  charts.set(lastValue);
};