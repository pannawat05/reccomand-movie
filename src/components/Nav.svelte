<script>
    import { goto } from '$app/navigation';
    let navOpen = false;

    function navigate(path) {
        navOpen = false;
        goto(path);
    }
</script>

<nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
            <div class="flex items-center">
                <span class="text-white font-bold text-xl cursor-pointer" on:click={() => navigate('/')}>
                    MovieApp
                </span>
                <div class="hidden md:block ml-10 flex items-baseline space-x-4">
                    <button class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        on:click={() => navigate('/')}>
                        Home
                    </button>
                    <button class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        on:click={() => navigate('/watchlist')}>
                        Watchlist
                    </button>
                </div>
            </div>
            <div class="-mr-2 flex md:hidden">
                <button type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                    aria-expanded={navOpen}
                    on:click={() => navOpen = !navOpen}>
                    <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        {#if !navOpen}
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        {:else}
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        {/if}
                    </svg>
                </button>
            </div>
        </div>
    </div>

    {#if navOpen}
        <div class="md:hidden px-2 pt-2 pb-3 space-y-1">
            <button class="block w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                on:click={() => navigate('/')}>
                Home
            </button>
            <button class="block w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                on:click={() => navigate('/watchlist')}>
                Watchlist
            </button>
        </div>
    {/if}
</nav>