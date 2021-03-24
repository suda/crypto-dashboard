<script>
	import Chart from './components/Chart.svelte';
</script>

<main class="bg-gray-200 grid grid-cols-2 grid-rows-2 gap-6 p-6">
	<Chart />
	<Chart fsym="BTC" />
	<Chart fsym="LTC" />
	<Chart fsym="XLM" />
</main>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

	main {
		font-family: 'IBM Plex Mono', sans-serif;
		width: 100%;
		height: 100%;
	}
</style>