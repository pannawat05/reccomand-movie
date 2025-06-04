<script>
  import { onMount } from 'svelte';
  import { watchlist } from '../../stores/watchlistStore.js';
  import { get } from 'svelte/store';

  let movies = [];
  const apiKey = '8f1aed9577242f589e9228998ae9be49';

  // ดึงหนังจาก watchlist เมื่อ component ถูก mount
  async function loadMovies() {
    const watchlistIds = get(watchlist);

    if (watchlistIds.length === 0) {
      movies = [];
      return;
    }

    const promises = watchlistIds.map(id =>
      fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`)
        .then(res => res.json())
    );

    movies = await Promise.all(promises);
  }

  onMount(loadMovies);

  function removeFromWatchlist(id) {
    watchlist.update(list => {
      const updated = list.filter(movieId => movieId !== id);
      movies = movies.filter(movie => movie.id !== id);
      return updated;
    });
  }
</script>

<h1>🎬 Watchlist ของคุณ</h1>

{#if movies.length > 0}
  <div class="grid">
    {#each movies as movie}
      <div class="card">
        <img
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://via.placeholder.com/200x300?text=No+Image'}
          alt={movie.title}
        />
        <h2>{movie.title}</h2>
        <button on:click={() => removeFromWatchlist(movie.id)}>
          ลบออกจาก Watchlist
        </button>
      </div>
    {/each}
  </div>
{:else}
  <p>ยังไม่มีภาพยนตร์ใน Watchlist ของคุณ</p>
{/if}

<style>
  h1 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 1rem;
  }

  .card {
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 0.5rem;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  img {
    width: 100%;
    max-width: 120px;
    height: auto;
    margin: 0 auto;
    border-radius: 4px;
  }

  h2 {
    font-size: 1rem;
    margin: 0.5rem 0;
  }

  button {
    background-color: #ff4444;
    color: white;
    border: none;
    padding: 0.4rem 0.6rem;
    font-size: 0.9rem;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #cc0000;
  }
</style>
