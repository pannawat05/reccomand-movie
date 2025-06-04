import { writable } from 'svelte/store';

let watchlist;

if (typeof localStorage !== 'undefined') {
  const stored = localStorage.getItem('watchlist');
  const initial = stored ? JSON.parse(stored) : [];

  watchlist = writable(initial);

  watchlist.subscribe((value) => {
    localStorage.setItem('watchlist', JSON.stringify(value));
  });

  watchlist.toggle = (id) => {
    watchlist.update((list) =>
      list.includes(id) ? list.filter((i) => i !== id) : [...list, id]
    );
  };
} else {
  // placeholder store during SSR (does nothing)
  const { subscribe } = writable([]);
  watchlist = {
    subscribe,
    toggle: () => {}
  };
}

export { watchlist };
