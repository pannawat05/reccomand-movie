<script>
  let movies = [];

  const apiKey = '8f1aed9577242f589e9228998ae9be49';

  const fetchMovies = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
    const data = await res.json();
    movies = data.results;
  };

  fetchMovies();
</script>

<h1>🎬 หนังยอดนิยม</h1>

{#if movies.length > 0}
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
    {#each movies as movie}
      <div>
        <img src={"https://image.tmdb.org/t/p/w200" + movie.poster_path} alt={movie.title} class="rounded   shadow-lg" />
        <p class="font-bold text-red-400 underline">{movie.title}</p>
      </div>
    {/each}
  </div>
{:else}
  <p>กำลังโหลด...</p>
{/if}
