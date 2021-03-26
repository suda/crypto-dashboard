<script>
  import Dialog from "./Dialog.svelte";
  import { apiKey } from "../stores/apiKey";

  export let visible = false;
  export let onCancel = () => {};
  export let onSubmit = () => {};
</script>

<Dialog title="CryptoCompare API Key" onCancel={onCancel} onSubmit={onSubmit} visible={visible} nonCancelable={true}>
  <p class="py-4 text-sm text-gray-400">Please enter an API key:</p>
  <input class="border border-gray-300 rounded-lg text-gray-600 h-10 w-80 px-2 bg-white hover:border-gray-400 focus:outline-none appearance-none" type="text" placeholder="API Key" bind:value={$apiKey} />
  <p class="py-4 text-sm text-gray-400"><strong>Hint:</strong> you can find it in the <a href="https://www.cryptocompare.com" class="font-bold text-blue-600 border-blue-600 border-b-2" target="_blank">API Keys</a> section in CryptoCompare.</p>
</Dialog>
