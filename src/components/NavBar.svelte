<script>
  import Select from './Select.svelte';
  import Button from './Button.svelte';

  export let lastUpdated = new Date();
  export let onAddChart = () => {};
  export let onApiKey = () => {};

  const timeframes = [
    { label: '1m', value: 1 },
    { label: '5m', value: 5 },
    { label: '15m', value: 15 },
    { label: '1h', value: 60 },
    { label: '6h', value: 360 },
    { label: '1d', value: 1440 }
  ];
</script>

<nav>
  <div>
    <h1 class="text-base font-bold">Crypto Dashboard</h1>
    <h2 class="text-xs text-gray-400">
      Last updated: {lastUpdated.toLocaleString()}
    </h2>
  </div>
  <div>
    <Select options={timeframes} />
    <Button onClick={onApiKey}>API Key</Button>
    <Button type="primary" onClick={onAddChart}>+ Add a chart</Button>
  </div>
</nav>

<style>
  nav {
    @apply shadow p-3 rounded-lg bg-white w-full h-16 mb-6 flex justify-between;
  }
</style>
