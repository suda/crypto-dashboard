<script>
  import Button from "./Button.svelte";

  export let visible = false;
  export let title = "Dialog";
  export let positiveButtonLabel = "OK";
  export let nonCancelable = false;
  export let onCancel = () => {};
  export let onSubmit = () => {};
</script>

<div
  class="{visible
    ? ''
    : 'hidden'} absolute inset-0 flex justify-center items-center z-30"
>
  <div
    class="bg-gradient-to-b from-blue-100 to-blue-400 absolute inset-0 z-40"
    on:click={() => nonCancelable ? '' : onCancel}
  />
  <div class="bg-white rounded-lg z-50">
    <div class="w-96 border-t-8 border-blue-600 rounded-lg flex">
      <div class="w-full pt-4 px-4">
        <h3 class="font-bold text-blue-700">{title}</h3>
        <slot></slot>
      </div>
    </div>

    <div class="p-4 flex space-x-4">
      {#if !nonCancelable}
        <Button onClick={onCancel}>Cancel</Button>
      {/if}
      <Button type="primary" onClick={onSubmit}>{positiveButtonLabel}</Button>
    </div>
  </div>
</div>
