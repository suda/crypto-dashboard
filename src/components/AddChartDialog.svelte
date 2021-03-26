<script>
  import Select from "./Select.svelte";
  import Button from "./Button.svelte";
  import { tsyms, fsyms } from "../dataSource";

  let fsym;
  let tsym;
  export let visible = false;
  export let onCancel = () => {};
  export let onSubmit = () => {};

  const onAdd = () => {
    onSubmit({ fsym, tsym });
  };
</script>

<div
  class="{visible
    ? ''
    : 'hidden'} absolute inset-0 flex justify-center items-center z-10"
>
  <div
    class="bg-gradient-to-b from-blue-100 to-blue-400 absolute inset-0 z-20"
    on:click={onCancel}
  />
  <div class="bg-white rounded-lg z-30">
    <div class="w-96 border-t-8 border-blue-600 rounded-lg flex">
      <div class="w-full pt-4 px-4">
        <h3 class="font-bold text-blue-700">Add a chart</h3>
        <p class="py-4 text-sm text-gray-400">Select the market:</p>
        <Select options={fsyms} onChange={(o) => (fsym = o)} />
        <Select options={tsyms} onChange={(o) => (tsym = o)} />
      </div>
    </div>

    <div class="p-4 flex space-x-4">
      <Button onClick={onCancel}>Cancel</Button>
      <Button type="primary" onClick={onAdd}>Add</Button>
    </div>
  </div>
</div>
