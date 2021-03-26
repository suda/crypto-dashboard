<script>
  import Dialog from "./Dialog.svelte";
  import Select from "./Select.svelte";
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

<Dialog title="Add a chart" positiveButtonLabel="Add" onCancel={onCancel} onSubmit={onAdd} visible={visible}>
  <p class="py-4 text-sm text-gray-400">Select the market:</p>
  <Select options={fsyms} onChange={(o) => (fsym = o)} />
  <Select options={tsyms} onChange={(o) => (tsym = o)} />
</Dialog>
