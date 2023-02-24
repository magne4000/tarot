<script lang="ts">
  export let label: string;
  export let name: string;
</script>

<div class="form-control">
  <label class="label" for={name}>
    <span class="label-text">{label}</span>
  </label>
  <slot />
</div>
