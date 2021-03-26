<script>
  export let type = "";
  export let onClick = () => {};

  let typeClasses;
  if (type === "primary") {
    typeClasses = "bg-blue-600 text-white hover:bg-blue-700 hover:white";
  } else {
    typeClasses =
      "bg-gray-200 text-gray-500 hover:bg-gray-300 hover:text-black";
  }
</script>

<button
  class="h-10 px-5 text-center rounded-lg font-bold text-sm focus:outline-none appearance-none {typeClasses}"
  on:click={onClick}
>
  <slot />
</button>
