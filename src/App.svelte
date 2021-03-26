<script>
	import NavBar from "./components/NavBar.svelte";
	import Chart from "./components/Chart.svelte";
	import DummyChart from "./components/DummyChart.svelte";

	import { charts, removeOne } from "./store";

	const remove = ({ fsym, tsym }) => {
		removeOne({ fsym, tsym });
	};
</script>

<main class="bg-gray-200 p-6">
	<NavBar />
	<article class="grid grid-cols-2 grid-rows-2 gap-6">
		{#if !$charts.length}
			<DummyChart />
		{/if}

		{#each $charts as chart}
			<Chart removeCallback={remove} fsym={chart.fsym} tsym={chart.tsym} />
		{/each}
	</article>
</main>

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	main {
		font-family: "IBM Plex Mono", sans-serif;
		width: 100%;
		height: 100%;
	}
	article {
		width: 100%;
		height: calc(100% - 5.5rem);
	}
</style>
