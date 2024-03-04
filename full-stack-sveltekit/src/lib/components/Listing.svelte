<script>
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

<div>
    {#each convertedListings as listing}
        <div>
            <div>
                <div>
                    <h2>
                        {listing.name}
                    </h2>
                    <button on:click={() => showReviewForm(listing)}></button>
                </div>
                <p>{listing.summary}</p>
            </div>
        </div>
    {/each}
</div>