<script>
    import Movielist from '../components/movielist.svelte';
</script>
<h1 class="text-3xl font-bold underline">
  Hello world!
</h1>
<Movielist />
<style lang="postcss">
  @reference "tailwindcss";
  :global(html) {
    background-color: theme(--color-blue-100);
  }
</style>