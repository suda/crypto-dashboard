import coins from "./coins.js";

export const tsyms = [
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "KRW"
].map((o) => { return { value: o, label: o } });

export const fsyms = coins.map((o) => { return { value: o, label: o } });
