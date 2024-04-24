<script lang="ts">

    export let data: any;

    $: console.log(data);
    
    async function fetchMovie(id: string) {
        const res = await fetch(`/api/movie`)
        //const movie = await res.json()
        //console.log(movie)
    }
</script>
<main class="p-4">
    <h1 class="text-2xl font-bold mb-8">{data.body.length} Movies</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {#each data.body as movie}
            <div class="bg-slate-300 shadow-md rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition duration-300">
                <a href={`/movies/${movie._id}`} class="block">
                    <div class="h-48 flex justify-start pb-4">
                        {#if movie.poster}
                            <img src={movie.poster} alt={movie.title} class="w-full h-full object-center object-cover">
                        {:else}
                            <img src="/defaultMoviePoster.png" alt="Default Movie Poster" class="w-full h-full object-cover">
                        {/if}
                    </div>
                    <div class="p-4">
                        <h2 class="text-lg font-semibold text-gray-800">{movie.title}</h2>
                        <p class="text-sm text-gray-600">{movie.releaseYear}</p>
                    </div>
                </a>
            </div>
        {/each}
    </div>
</main>
