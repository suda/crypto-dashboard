<script>
	import NavBar from "./components/NavBar.svelte";
	import Chart from "./components/Chart.svelte";
	import DummyChart from "./components/DummyChart.svelte";
	import AddChartDialog from "./components/AddChartDialog.svelte";

	import { charts, removeOne, addOne } from "./store";

	let lastUpdated = new Date();
	let showAddDialog = false;

	const remove = ({ fsym, tsym }) => {
		removeOne({ fsym, tsym });
	};

	const onAddChart = () => {
		showAddDialog = true;
	}

	const onCloseDialog = () => {
		showAddDialog = false;
	}

	const addChart = ({ fsym, tsym }) => {
		addOne({ fsym, tsym });
		onCloseDialog();
	}

	setInterval(() => lastUpdated = new Date(), 1000 * 10);
</script>

<main class="bg-gray-200 p-6">
	<AddChartDialog visible={showAddDialog} onCancel={onCloseDialog} onSubmit={addChart} />
	<NavBar lastUpdated={lastUpdated} onAddChart={onAddChart} />
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
