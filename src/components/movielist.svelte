<script>
  import { Modal, Trigger, Content } from 'sv-popup';
  import { watchlist } from '../stores/watchlistStore.js';
  import { get } from 'svelte/store';
  import { onMount } from 'svelte';

  let movies = [];
  let creditsByMovie = new Map();
  let selectedTrailerUrl = null;

  function toggleWatch(id) {
    watchlist.toggle(id);
    window.location.reload()
    alert("movie added to watchlist")
  }

  function isInWatchlist(id) {
    return get(watchlist).includes(id);
  }

 
 

  const apiKey = '8f1aed9577242f589e9228998ae9be49';

  const fetchMovies = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
    const data = await res.json();
    movies = data.results;
  };

  const fetchCredits = async (movieId) => {
    if (!creditsByMovie.has(movieId)) {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`);
      const data = await res.json();
      creditsByMovie.set(movieId, data.cast.slice(0, 5));
      creditsByMovie = new Map(creditsByMovie); // trigger reactivity

    }
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
  .trigger:hover {
    cursor: pointer;
  }
</style>

<h1>🎬 หนังยอดนิยม</h1>

{#if movies.length > 0}
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
    {#each movies as movie}
      <div class="shadow-lg bg-white p-2 rounded-md items-center flex flex-col">
        <img src={"https://image.tmdb.org/t/p/w200" + movie.poster_path} alt={movie.title} class="rounded w-39 h-45 mt-1 mb-1" />

        <Modal basic>
          <Trigger>
            <button
              type="button"
              class="font-bold text-red-400 underline text-center bg-transparent border-none p-0 m-0 cursor-pointer"
              on:click={() => fetchCredits(movie.id)}
              style="background: none; border: none;"
            >
              {movie.title}
            </button>
          </Trigger>

          <Content>
            <img src={"https://image.tmdb.org/t/p/w200" + movie.poster_path} alt={movie.title} class="rounded w-39 h-45 mb-2 mx-auto" />
            <h2 class="text-lg font-bold text-center">{movie.title}</h2>
            <p><b>Overview:</b><br>{movie.overview}</p>
            <p class="text-sm text-gray-500">Release Date: {movie.release_date}</p>
            <p class="text-sm text-gray-500">Rating: {movie.vote_average}</p>
            <p class="text-sm text-gray-500">Popularity: {movie.popularity}</p>

            <h3 class="font-semibold mt-3">นักแสดงนำ:</h3>
            {#if creditsByMovie.has(movie.id)}
              {#each creditsByMovie.get(movie.id) as credit}
                <p class="text-sm text-gray-700">👤 {credit.name} รับบท {credit.character}</p>
              {/each}
            {:else}
              <p class="text-sm text-gray-500">⏳ กำลังโหลดนักแสดง...</p>
            {/if}

            <button
              class={`px-2 py-1 rounded text-white font-bold mt-2 ${
                isInWatchlist(movie.id) ? 'bg-green-600' : 'bg-gray-600'
              }`}
              on:click={() => toggleWatch(movie.id)}
            >
              {isInWatchlist(movie.id) ? '✔ In Watchlist' : '+ Add to Watchlist'}
            </button>
          </Content>
        </Modal>

        <button on:click={() => openTrailer(movie.id)} class="trigger rounded-lg bg-black shadow text-white font-bold w-30 h-8 text-center mt-3 mb-2">
          <i class="fa-solid fa-film"></i> Teaser
        </button>

        <div class="detail mt-2 text-center text-sm">
          <p>{movie.release_date}</p>
          <p><i class="fa-brands fa-imdb"></i> {movie.vote_average}</p>
        </div>
      </div>
    {/each}
  </div>
{:else}
  <p>⏳ กำลังโหลดข้อมูลหนัง...</p>
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
