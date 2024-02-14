<script lang="ts">
    import { Ratings } from '@skeletonlabs/skeleton'
    export let data: any;

    $: console.log(data.body);

    let rating = {
        current: 3,
        max: 5,
    }

    function iconClick(event: CustomEvent<{index:number}>): void {
        rating.current = event.detail.index;
    }

    function addReview() {

    }
</script>

<main class="container">
    <div>
        <div><h2>WELCOME</h2></div>
        <form method="post">
            <div>
                <Ratings bind:value={rating.current} max={rating.max} interactive on:icon={iconClick}>
                    <svelte:fragment slot="empty">
                        <span class="text-3xl">☆</span>
                    </svelte:fragment>
                    <svelte:fragment slot="half">
                        <span class="text-3xl">★</span>
                    </svelte:fragment>
                    <svelte:fragment slot="full">
                        <span class="text-3xl">★</span>
                    </svelte:fragment>
                </Ratings>
            </div>
        </form>
    </div>
    <div class="flex flex-wrap">
        {#each data.body as movie}
            <div class='card m-4 max-w-64 card-hover cursor-pointer flex flex-col justify-between'>
                <a class="card-header" href={`/movies/${movie._id}`}>{movie.title}</a>
               <button on:click={addReview}>Add Review</button>
            </div>
        {/each}
    </div>
</main>