<script>
  import { onMount } from "svelte";
  import { createChart } from "lightweight-charts";
  import _ from "lodash";
  import { Model } from "../Model";

  let chartElement,
    chart,
    candlestickSerie,
    volumeSerie,
    pricesData,
    volumeData,
    model,
    interval;
  let change = 0;
  let lastPrice = 0;
  let totalVolume = 0;
  let loadingFinished = false;

  export let fsym = "ETH";
  export let tsym = "EUR";
  export let timeframe = "Minute"; // Also possible Hour and Day
  export let updateInterval = 1;
  export let removeCallback = () => {};

  const donationAddresses = {
    BTC: "1K7Uc9MDzokCGEsUxrQQXn59VQ1Q9AWGvZ",
    BCH: "1BHM8oACVN6F4xksXAAP3nR9EoAkfd8sGF",
    ETH: "0x8CcA7589d8061ad4D3D913412d1EAD71cbEae081",
    LTC: "LRJ4Evzmyynp8Uswiy7e2uWhPKBNiSHroq",
    NU: "0x921B265a6DB3C3b0e3DD9CBD7aD9634B52a0EbdB",
    BAT: "0x52680f27fC20A60AbEe9413128b4420eC86709C4",
    ADA: "addr1vye3t0y88qvhuyf3png0xthncyggjcxhtdflc7cavh3fkjqw7u868",
    UNI: "0xd7884711a4Db2d1392Eafd2d5109de49B019E76F",
    LINK: "0x72E3Ad2332Ae59FE09Bfe2fAce3a3F5E71ee9B7e",
  };

  const calculateStats = (prices, volume) => {
    lastPrice = prices[prices.length - 1].close;
    change = (lastPrice / prices[0].open) * 100 - 100;
    totalVolume = volume.reduce((previous, current) => {
      return previous + current.value;
    }, 0);
  };

  const initCandlestick = (chart, data) => {
    const serie = chart.addCandlestickSeries({
      upColor: "rgb(38,166,154)",
      downColor: "rgb(255,82,82)",
      wickUpColor: "rgb(38,166,154)",
      wickDownColor: "rgb(255,82,82)",
      borderVisible: false,
    });
    serie.setData(data);
    return serie;
  };

  const initVolume = (chart, data) => {
    const serie = chart.addHistogramSeries({
      color: "rgba(0, 0, 0, 0.1)",
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "",
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });
    serie.setData(data);
    return serie;
  };

  onMount(async () => {
    model = new Model({ fsym, tsym, timeframe });
    const data = await model.getData();
    pricesData = data.prices;
    volumeData = data.volume;
    calculateStats(pricesData, volumeData);
    loadingFinished = true;

    chart = createChart(chartElement, {
      width: chartElement.width,
      height: chartElement.height,
      timeScale: {
        timeVisible: timeframe !== "Day",
      },
      layout: {
        fontFamily: "IBM Plex Mono",
      },
    });
    candlestickSerie = initCandlestick(chart, pricesData);
    volumeSerie = initVolume(chart, volumeData);

    interval = setInterval(async () => {
      const lastTimestamp = pricesData[pricesData.length - 1].time;
      const { prices, volume } = await model.getData(lastTimestamp);
      pricesData.push(...prices);
      volumeData.push(...volume);

      calculateStats(pricesData, volumeData);
      candlestickSerie.setData(pricesData);
      volumeSerie.setData(volumeData);
    }, updateInterval * 1000 * 60);
  });
</script>

<div class="chart-container">
  <div class="flex justify-between items-center h-12 pb-3">
    <div>
      <div class="text-xl md:text-sm text-gray-800 font-bold leading-tight">
        {fsym}-{tsym}
      </div>
      <div class="text-gray-400 md:text-xs">Market</div>
    </div>
    <div>
      <div class="text-xl md:text-sm text-gray-800 font-bold leading-tight">
        {lastPrice.toLocaleString()}
        {tsym}
      </div>
      <div class="text-gray-400 md:text-xs">Last trade price</div>
    </div>
    <div>
      <div
        class="text-xl md:text-sm text-gray-800 font-bold leading-tight {change >
        0
          ? 'text-green-500'
          : 'text-red-500'}"
      >
        {change.toFixed(2)}%
      </div>
      <div class="text-gray-400 md:text-xs">24h price</div>
    </div>
    <div>
      <div class="text-xl md:text-sm text-gray-800 font-bold leading-tight">
        {totalVolume.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        {fsym}
      </div>
      <div class="text-gray-400 md:text-xs">24h volume</div>
    </div>
  </div>
  <div id="chart" bind:this={chartElement}>
    {#if !loadingFinished}
      <div
        class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64"
      />
    {/if}
  </div>
  {#if donationAddresses[fsym]}
    <div
      class="bg-blue-400 leading-none text-white rounded-lg p-2 shadow text-xs w-full"
    >
      Support this work by donating <strong>{fsym}</strong> to:
      <strong>{donationAddresses[fsym]}</strong>
    </div>
  {/if}
  <div class="remove" on:click={removeCallback({ fsym, tsym })} />
</div>

<style>
  #chart {
    height: calc(100% - 4.5rem);
    width: 100%;
    @apply flex items-center justify-center;
  }

  .chart-container {
    height: 100%;
    width: 100%;
    @apply shadow p-6 rounded-lg bg-white relative;
  }

  .chart-container:hover .remove {
    @apply block;
  }

  .remove {
    @apply w-8 h-8 bg-red-500 text-white shadow rounded-full absolute -right-4 -top-4 cursor-pointer hidden;
    content: "";
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="-8 -8 48 48" x="0px" y="0px"><g><path fill="white" d="M27.86,22.19,21.68,16l6.18-6.18a4,4,0,0,0-5.67-5.67L16,10.34,9.82,4.15A4,4,0,0,0,4.16,9.83L10.33,16,4.15,22.19a4,4,0,0,0,0,5.67,4,4,0,0,0,5.67,0L16,21.68l6.18,6.18a4,4,0,0,0,5.67,0A4,4,0,0,0,27.86,22.19Z"/></g></svg>');
  }

  .loader {
    border-top-color: rgba(96, 165, 250);
    -webkit-animation: spinner 1.5s linear infinite;
    animation: spinner 1.5s linear infinite;
  }

  @-webkit-keyframes spinner {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
