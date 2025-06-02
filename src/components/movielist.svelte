<script>
  let movies = [];
  let selectedTrailerUrl = null;

  const apiKey = '8f1aed9577242f589e9228998ae9be49';

  const fetchMovies = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
    const data = await res.json();
    movies = data.results;
  };

  const fetchTrailerUrl = async (movieId) => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`);
    const data = await res.json();
    const video = data.results.find(
      v => (v.type === "Trailer" || v.type === "Teaser") && v.site === "YouTube"
    );
    return video ? `https://www.youtube.com/embed/${video.key}` : null;
  };

  const openTrailer = async (movieId) => {
    selectedTrailerUrl = await fetchTrailerUrl(movieId);
  };

  const closeTrailer = () => {
    selectedTrailerUrl = null;
  };

  fetchMovies();
</script>

<style>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.75);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .trigger:hover{
    cursor: pointer;
  }

</style>

<h1>🎬 หนังยอดนิยม</h1>

{#if movies.length > 0}
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1.5fr)); gap: 1rem;">
    {#each movies as movie}
      <div class=" shadow-lg bg-white p-1 rounded-md">
        <img src={"https://image.tmdb.org/t/p/w200" + movie.poster_path} alt={movie.title} class="rounded w-39 h-45 ms-1 mt-1 mb-1" />
        <p class="font-bold text-red-400 underline">{movie.title}</p>
        <button on:click={() => openTrailer(movie.id)} class=" trigger rounded-lg bg-black shadow text-white font-bold w-40 h-8 text-center">
          <i class="fa-solid fa-film"></i> Teaser
        </button>
        <div class="detail mt-5 text-center">
        <p>{movie.release_date}</p>
        <p><i class="fa-brands fa-imdb"></i>{movie.vote_average}</p>
        </div>
      </div>
    {/each}
  </div>
{:else}
  <p>กำลังโหลด...</p>
{/if}

{#if selectedTrailerUrl}
  <div class="modal" on:click={closeTrailer}>
    <div on:click|stopPropagation>
      <iframe
        width="560"
        height="315"
        src={selectedTrailerUrl}
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>
    </div>
  </div>
{/if}
