<script lang="ts">

    export let data: any;

    $: console.log(data);
    
    async function fetchMovie(id: string) {
        const res = await fetch(`/api/movie`)
        //const movie = await res.json()
        //console.log(movie)
    }
</script>
<main>
    <h1>{data.body.length} Movies</h1>
    <div class="flex flex-wrap">
        {#each data.body as movie}
            <div class='card m-4 max-w-64 card-hover cursor-pointer flex flex-col justify-between'>
                <a class="card-header" href={`/movies/${movie._id}`}>{movie.title}</a>
                <!-- <div class="">
                    <img class="p-4 h-44 max-w-32" src={movie.poster} alt={movie.title}/>
                    <p class="p-4 text-xs text-ellipsis">{movie.fullplot}</p>
                </div>
                <p class="card-footer">{movie.runtime} minutes</p> -->
                <!-- <p>{movie.awards.nominated}</p> -->
                <!-- <button class="btn variant-secondary"
                on:click={() => fetchMovie(movie._id)}
                >View</button> -->
            </div>
        {/each}
    </div>
</main>