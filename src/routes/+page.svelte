<script>
    import Movielist from '../components/movielist.svelte';
     import Nav from '../components/Nav.svelte';

</script>
<Nav />
<div class="content">
<Movielist />
</div>
<style lang="postcss">
  @reference "tailwindcss";
  :global(html) {
    background-color: theme(--color-blue-100);
  }
  .content{
    margin-bottom: 10%;
    margin-left:5%
     margin-right:5%
  }
</style>