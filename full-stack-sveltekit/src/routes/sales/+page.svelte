<script lang="ts">
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton'

    let allSalesData: any = [];
    $: uniqueStoreLocations = [...new Set(allSalesData.map((sale: any) => sale.storeLocation))];
    let valueSingle: string = 'books';

    // $: locationsWithItems = allSalesData.map((sale: any) => {
    //     return {
    //         location: sale.storeLocation,
    //         items: allSalesData.filter(())
    //     }
    // });

    async function getSalesData() {
        const response = await fetch('/api/sales');
        const data = await response.json();
        allSalesData = data;
    };

    async function postSalesData() {
        const response = await fetch('/api/sales', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([{
                storeLocation: 'Denver',
                totalSales: 1000
            },
            {
                storeLocation: 'San Diego',
                totalSales: 2000
            }])
        });
        const data = await response.json();
        console.log(data)
    };

    function handleLocationSelection(event: any) {
        console.log(event.target.value)
    };
</script>

<section>
    <div class="flex flex-col justify-center items-center w-full h-screen">
        <div class="flex flex-col justify-center items-center w-1/2 h-1/2 bg-slate-300 text-black">
            <h2>Sales Data</h2>
            <p>Show data here</p>
            <button class="btn variant-outline-secondary m-2" on:click={getSalesData}>Get Sales Data</button>
            <button class="btn variant-outline-secondary" on:click={postSalesData}>Post Sales Data</button>
        </div>
        <div class="flex bg-slate-600">
            <ListBox>
                {#each uniqueStoreLocations as location}
                    <ListBoxItem bind:group={valueSingle} name="medium" value={location} on:click={handleLocationSelection}>{location}</ListBoxItem>
                {/each}
            </ListBox>
        </div>
    </div>

</section>