<script lang="ts">
    import { Ratings } from '@skeletonlabs/skeleton'
    import { icons } from '$lib/icons/icons'
    
    interface Review {
            _id: string
            data: Date
            listing_id: string
            reviewer_name: string
            comments: string
            rating: number
        }
    
    export let reviews: Review[] = []
    
    let elemCarousel: HTMLDivElement;
    
    
    function carouselLeft(): void {
        const x =
            elemCarousel.scrollLeft === 0
                ? elemCarousel.clientWidth * elemCarousel.childElementCount
                : elemCarousel.scrollLeft - elemCarousel.clientWidth;
        elemCarousel.scroll(x, 0);
    }
    
    function carouselRight(): void {
        const x =
            elemCarousel.scrollLeft === elemCarousel.scrollWidth - elemCarousel.clientWidth
                ? 0
                : elemCarousel.scrollLeft + elemCarousel.clientWidth;
        elemCarousel.scroll(x, 0);
    }

    function closeCarousel(): void {

    }
                        
    
    </script>
    
    <div class="card p-4 grid grid-cols-[auto_1fr_auto] gap-4 items-center">
        <button class="btn-icon variant-outline-primary" on:click={carouselLeft}>
            <i class="fa-solid fa-arrow-left"></i>
            <p class="text-2xl pb-2 pr-2">&#8592;</p>
        </button>
        <div bind:this={elemCarousel} class="snap-x snap-mandatory scroll-smooth flex overflow-x-auto">
            {#each reviews as review}
            <div class="card min-w-48 h-64 p-2 m-1 snap-start">
                <h6 class="p-2">{review.reviewer_name}</h6>
                {#if review.rating}
                    <h3 class="px-2">Rating: {review.rating} stars</h3>
                {/if}
                <article>
                    <p class="text-xs line-clamp-[12] p-2">{review.comments}</p>
                </article>
            </div>
            {/each}
        </div>
        <button class="btn-icon variant-outline-primary" on:click={carouselRight}>
            <i class="fa-solid fa-arrow-right"></i>
            <p class="text-2xl pb-2 pr-2">&#8594;</p>
        </button>
    </div>