<script lang="ts">
  export let href: string;
  export let sound: string;
</script>

<p><a {href} target="_blank"><slot /></a></p>
<audio src={sound} controls></audio>

<style>
  p {
    height: auto;
  }
  audio {
    width: 300px;
    height: 50px;
  }
</style>
