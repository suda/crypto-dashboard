import cc from "cryptocompare";
import _ from "lodash";

export class Model {
  constructor({ fsym, tsym, timeframe }) {
    this.fsym = fsym;
    this.tsym = tsym;
    this.timeframe = timeframe;
  }

  async getData(lastTimestamp) {
    const options = {};
    if (lastTimestamp) {
      // CC API doesn't allow specifying "from" timestamp so we have to eyeball
      // limit for a similar functionality
      options.limit = Math.ceil((Date.now() / 1000 - lastTimestamp) / 60) + 2;
    }
    let data = await cc[`histo${this.timeframe}`](this.fsym, this.tsym, options);
    data = data.filter((d) => d.volumeto !== 0);

    if (lastTimestamp) {
      data = data.filter((d) => d.time > lastTimestamp);
    }
    const prices = data.map(this.pricesMapFn);
    const volume = data.map(this.volumeMapFn);
    return { prices, volume };
  }

  pricesMapFn(d) {
    return _.pick(d, ["time", "open", "high", "low", "close"]);
  }

  volumeMapFn({ volumeto, time }) {
    return {
      value: volumeto,
      time,
    };
  }
}