<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let listings: [] = []

	//$: console.log(listings)

	interface Listing {
		listing_url: string
		name: string
		summary: string
		description: string
		space: string
		room_type: string
		price: number
		bedrooms: number
		bathrooms: number
		security_deposit: number
	}

	$: convertedListings = listings.map((item: any) => convertToListing(item))

	function convertToListing(data: any): Listing {
		return {
			listing_url: data.listing_url || '',
			name: data.name || '',
			summary: data.summary || '',
			description: data.description || '',
			space: data.space || '',
			room_type: data.room_type || '',
			price: data.price || 0,
			bedrooms: data.bedrooms || 0,
			bathrooms: data.bathrooms || 0,
			security_deposit: data.security_deposit || 0
		}
	}

    function showReviewForm(listing: listing): void {
        dispatch('showReviewForm', 
        {show: true,
         name: listing.name
        });
    }
</script>

<div class="flex flex-wrap justify-center w-full">
	{#each convertedListings as listing}
		<div class="card m-2 p-2 w-96">
			<div class="flex justify-between">
				<h2 class="text-xl font-bold mb-1">{listing.name}</h2>
                <button class="btn max-h-6 variant-filled-tertiary" on:click={() => showReviewForm(listing)}>Review</button>
			</div>
			<p class="text-sm mb-1">{listing.summary}</p>
		</div>
	{/each}
</div>