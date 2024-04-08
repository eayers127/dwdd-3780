<script lang="ts">
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
    import Chart from 'chart.js/auto'
    import { onMount } from 'svelte';

    let allSalesData: any = []
    $: uniqueStoreLocations = [...new Set(allSalesData.map((sale: any) => sale.storeLocation))];

    let salesStats = {
        totalItemsSold: 0,
        totalSales: 0,
        averageSales: 0
    }

    let singleLocation: string = '';

    let canvasElement: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null;
    // ctx is common syntax to represent 'context'

    let isChartVisible = false;

    onMount(() => {
        ctx = canvasElement.getContext('2d');
    })

    function graphSalesData() {
        if(ctx && allSalesData.length > 0) {
            new Chart(ctx, {
                type: 'bar',
                data: {
                labels: uniqueStoreLocations,
                datasets: [{
                    label: '# of Sales',
                    data: uniqueStoreLocations.map((location: any) => totalSalesByLocation(location)),
                    borderWidth: 1,
                    backgroundColor: 'rgba(0, 0, 255, 0.4)'
                }]
                },
                options: {
                scales: {
                    y: {
                    beginAtZero: true
                    }
                }
                }
            });
        }
    };

    function totalSalesByLocation(location: string) {
        return allSalesData.filter((sale: any) => sale.storeLocation === location).length
    }

    async function getSalesData() {
        const response = await fetch('/api/sales');
        const data = await response.json();
        allSalesData = data;
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
        <div class="flex flex-col justify-center items-center w-1/2 h-1/2 bg-slate-300 text-black rounded-md">
            <h2 class="font-bold text-2xl">Sales Data</h2>
            <button class="btn variant-outline-secondary m-2" on:click={getSalesData}>Get Sales Data</button>
            <button class="btn variant-outline-secondary" disabled={allSalesData.length === 0} on:click={graphSalesData}>Graph Sales Data</button>
        </div>
        <div class="flex bg-slate-600 mt-4 rounded-md">
            <div class="w-1/2">
                    <canvas class="bg-slate-100 rounded-md m-2" bind:this={canvasElement}></canvas>
            </div>
            <ListBox class="w-64">
                {#each uniqueStoreLocations as location}
                    <ListBoxItem class="text-center" bind:group={singleLocation} name="medium" value={location} on:click={handleLocationSelection}>{location}</ListBoxItem>
                {/each}
            </ListBox>
            <div class="p-4 m-2">
                <h2><span class="font-semibold text-xl">Sales Stats for:</span> {singleLocation}</h2>
                <p><span class="font-semibold">Total Items Sold:</span> {salesStats.totalItemsSold}</p>
                <p><span class="font-semibold">Total Sales:</span> {salesStats.totalSales}</p>
                <p><span class="font-semibold">Average Sales:</span> {salesStats.averageSales}</p>
                <button class="btn variant-filled-primary" disabled={!singleLocation} on:click={exportSalesData}>Export Sales Data</button>
            </div>
        </div>
    </div>

</section>