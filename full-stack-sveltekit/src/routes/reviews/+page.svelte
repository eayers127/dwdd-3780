<script lang="ts">
    import { Ratings } from '@skeletonlabs/skeleton'
    import { page } from '$app/stores'
    import { fly, slide } from 'svelte/transition'
    import Listing from '$lib/components/Listing.svelte'

    $: console.log(data.body);

    export let data: any;
    export let form: any;
    let scrollElement: HTMLElement

    let rating = {
        current: 3,
        max: 5,
    }

    let formVisible = false;
    let listingName = '';

    function iconClick(event: CustomEvent<{index:number}>): void {
        rating.current = event.detail.index;
    }

    function handleReview(event: CustomEvent<{ show: boolean, name: string}>) {
        formVisible = event.detail.show;
        listingName = event.detail.name;
        scrollElement.scrollIntoView({
            behavior: 'smooth',
        })
    }

    function handleCancel() {
        formVisible = false;
    }
</script>

<main class="container" bind:this={scrollElement}>
    <div><h2>WELCOME</h2></div>
    {#if formVisible}
    <div class="flex justify-center" in:fly={{ y: 200 }} out:slide>

        {#if form?.error}
            <div class="bg-red-100 rounded relative text-red-700 m-4">
                <p class="font-bold">Error!</p>
                <span>{form.error}</span>
            </div>
        {/if}
            <form method="POST" action="?/submitReview">
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
                <label for="review">Review
                    <textarea class="textarea" id="review" name="review" placeholder="Your Review" rows="4" required></textarea>
                </label>
            </div>
            <div>
                <button class="btn btn-sm variant-filled-tertiary" on:click={handleCancel}>Cancel</button>
                <button class="btn btn-sm variant-filled-primary" type="submit">Submit</button>
            </div>
        </form>
    </div>
    {/if}

    {#if data}
        <Listing listings={data.body} on:showReviewForm={handleReview}/>
    {/if}
</main>