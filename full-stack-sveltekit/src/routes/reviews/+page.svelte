<script lang="ts">
    import { Ratings } from '@skeletonlabs/skeleton'
    // export let data: any;
    import { page } from '$app/stores'
    import { fly, slide } from 'svelte/transition'
    import Listing from '$lib/components/Listing.svelte'

    $: console.log(data.body);

    export let data: any;

    let rating = {
        current: 3,
        max: 5,
    }

    let formVisible = true;
    let listingName = '';

    function iconClick(event: CustomEvent<{index:number}>): void {
        rating.current = event.detail.index;
    }

    function addReview() {
        formVisible = true;
    }

    function handleReview(event: CustomEvent<{ show: boolean, name: string}>) {
        formVisible = event.detail.show;
    }

    function handleCancel() {
        formVisible = false;
    }
</script>

<main class="container">
    <div><h2>WELCOME</h2></div>
    {#if formVisible}
    <div class="flex justify-center" in:fly={{ y: 200 }} out:slide>
            <form method="post" action="?/addReview">
                <input id="username" name="username" type="hidden" value={$page.data.session?.user?.name ?? ''}>
                <input id="listingName" name="listingName" type="hidden" value={listingName}>
                <input id="ratingValue" name="ratingValue" type="hidden" value={rating.current}>
            <div>
                <p class="text-sm">Review of: {listingName}</p>
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
            <div>
                <label for="review">Review</label>
                <textarea class="textarea" name="review" placeholder="Your Review" rows="4" required></textarea>
            </div>
            <div>
                <button class="btn btn-sm variant-filled-tertiary" on:click={handleCancel}>Cancel</button>
                <button class="btn btn-sm variant-filled-primary">Submit</button>
            </div>
        </form>
    </div>
    {/if}
    <div class="flex flex-wrap">
        {#each data.body as movie}
            <div class='card m-4 card-hover cursor-pointer flex flex-col justify-between'>
                <a class="card-header" href={`/movies/${movie._id}`}>{movie.title}</a>
               <button class="btn btn-icon btn-icon-sm variant-filled-secondary" on:click={addReview}>Add Review</button>
            </div>
        {/each}
    </div>

    {#if data}
        <Listing listings={data.body} on:showReviewForm={handleReview}/>
    {/if}
</main>