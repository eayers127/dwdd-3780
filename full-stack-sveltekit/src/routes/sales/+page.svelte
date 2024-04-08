<script lang="ts">
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton'

    let allSalesData: any = []
    $: uniqueStoreLocations = [...new Set(allSalesData.map((sale: any) => sale.storeLocation))];

    let salesStats = {
        totalItemsSold: 0,
        totalSales: 0,
        averageSales: 0
    }

    let singleLocation: string = '';

    async function getSalesData() {
        const response = await fetch('/api/sales');
        const data = await response.json();
        allSalesData = data;
    };

    async function postSalesData() {
        // const response = await fetch('/api/sales', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify([{
        //         storeLocation: 'Denver',
        //         totalSales: 1000
        //     },
        //     {
        //         storeLocation: 'San Diego',
        //         totalSales: 2000
        //     }])
        // });
        // const data = await response.json();
        // console.log(data)
    };

    function handleLocationSelection(event: any) {
		//console.log(event.target.value);
		singleLocation = event.target.value
		const selectedLocationData = allSalesData.filter(
			(sale: any) => sale.storeLocation === singleLocation
		)
		salesStats.totalItemsSold = selectedLocationData.reduce(
			(acc: number, sale: any) => acc + sale.items.length,
			0
		)
		salesStats.totalSales = selectedLocationData.length
		salesStats.averageSales = salesStats.totalItemsSold / salesStats.totalSales
	};

    async function exportSalesData(event: any) {
        const response = await fetch('/api/sales', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                storeLocation: singleLocation,
                totalItemsSold: salesStats.totalItemsSold,
                totalSales: salesStats.totalSales,
                averageSales: salesStats.averageSales
            })
        });
        const data = await response.json();
        console.log(data)
    }
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
            <ListBox class="w-64">
                {#each uniqueStoreLocations as location}
                    <ListBoxItem class="text-center" bind:group={singleLocation} name="medium" value={location} on:click={handleLocationSelection}>{location}</ListBoxItem>
                {/each}
            </ListBox>
            <div class="p-4 m-2">
                <h2>Sales Stats for {singleLocation}</h2>
                <p>Total Items Sold: {salesStats.totalItemsSold}</p>
                <p>Total Sales: {salesStats.totalSales}</p>
                <p>Average Sales: {salesStats.averageSales}</p>
                <button class="btn variant-filled-primary" disabled={!singleLocation} on:click={exportSalesData}>Export Sales Data</button>
            </div>
        </div>
    </div>

</section>