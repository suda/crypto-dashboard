<script>
	import { onMount } from "svelte";
	import NavBar from "./components/NavBar.svelte";
	import Chart from "./components/Chart.svelte";
	import DummyChart from "./components/DummyChart.svelte";
	import AddChartDialog from "./components/AddChartDialog.svelte";
	import ApiKeyDialog from "./components/ApiKeyDialog.svelte";

	import { charts, removeOne, addOne } from "./stores/charts";
	import { apiKey } from "./stores/apiKey";

	let lastUpdated = new Date();
	let showAddDialog = false;
	let showApiKeyDialog = false;
	let chartElements = [];

	const removeChart = ({ fsym, tsym }) => {
		removeOne({ fsym, tsym });
	};

	const addChart = ({ fsym, tsym }) => {
		addOne({ fsym, tsym });
		showAddDialog = false;
	};

	const updateAll = () => {
		for (const el of chartElements) {
			if (el) {
				el.update();
			}
		}
	}

	onMount(() => {
		showApiKeyDialog = !$apiKey;
		apiKey.subscribe(updateAll);
	});

	setInterval(() => {
		lastUpdated = new Date();
	}, 1000 * 10);
</script>

<main class="bg-gray-200 p-6">
	<AddChartDialog
		visible={showAddDialog}
		onCancel={() => (showAddDialog = false)}
		onSubmit={addChart}
	/>
	<ApiKeyDialog
		visible={showApiKeyDialog}
		onCancel={() => (showApiKeyDialog = false)}
		onSubmit={() => (showApiKeyDialog = false)}
	/>
	<NavBar
		{lastUpdated}
		onAddChart={() => (showAddDialog = true)}
		onApiKey={() => (showApiKeyDialog = true)}
		onUpdate={updateAll}
	/>
	<article class="grid grid-cols-2 grid-rows-2 gap-6">
		{#if !$charts.length}
			<DummyChart />
		{/if}

		{#each $charts as chart, index}
			<Chart bind:this={chartElements[index]} removeCallback={removeChart} fsym={chart.fsym} tsym={chart.tsym} />
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
