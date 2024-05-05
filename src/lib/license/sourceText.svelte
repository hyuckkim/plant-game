<script lang="ts">
  export let href: string;
  export let img: string;

  let isHovered = false;
</script>

<p
  on:mouseenter={() => {
    isHovered = true;
  }}
  on:mouseleave={() => {
    isHovered = false;
  }}
>
  <a {href}><slot /></a>
</p>
{#if isHovered}
  <img src={img} alt="" />
{/if}

<style>
  p {
    height: auto;
  }
  img {
    width: auto;
    max-width: 600px;
    height: auto;
    max-height: 200px;
    position: sticky;
  }
</style>
