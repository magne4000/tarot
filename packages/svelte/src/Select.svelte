<script lang="ts">
  import FormControl from './FormControl.svelte';

  export let label: string;
  export let name: string;
  export let value: number = -1;

  let _value: string | number = value;

  $: {
    if (typeof _value === 'string') {
      value = parseInt(_value, 10);
    } else {
      value = _value;
    }
  }
</script>

<FormControl {label} {name}>
  <select class="select select-bordered" {name} bind:value={_value}>
    <slot />
  </select>
</FormControl>
