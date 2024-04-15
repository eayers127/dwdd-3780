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

    let itemName: string = ''
    let coupon: boolean = false
    let age: number = 0

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
        const response = await fetch(`/api/sales?itemName=${itemName}&coupon=${coupon}&age=${age}`);
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
                averageSales: salesStats.averageSales.toFixed(2)
            })
        });
        const data = await response.json();
        console.log(data)
    }

    let stats = [];

    async function getSalesStats() {
        const response = await fetch(`/api/sales/stats`);
        const data = await response.json();
        stats = data;
    };
</script>

<section>
    <div class="flex flex-col justify-center items-center w-full mt-4">
        <div class="flex flex-col justify-center items-center w-1/2 h-3/4 bg-slate-300 text-black rounded-md">
            <h2 class="font-bold text-2xl">Sales Data</h2>
            <div class="flex">
                <form class="p-4">
                    <label class="p-2">
                        <p>Show sales numbers for specific item:</p>
                        <input class="rounded-md" type="text" placeholder="Enter Item Name:" bind:value={itemName}/>
                    </label>
                    <label class="flex items-center space-x-2 p-2">
                        <input type="checkbox" class="checkbox" bind:checked={coupon}/>
                        <p>Coupon Used</p>
                    </label>
                    <input type="range" max="100" bind:value={age} class="m-2"/>

                </form>
            <div class=" w-1/2 text-center p-6 m-4 bg-slate-600 text-white rounded-md">
                <h4>Example Items to Search:</h4>
                <ul>
                    <li>pens</li>
                    <li>binder</li>
                    <li>laptop</li>
                    <li>notepad</li>
                </ul>
            </div>
        </div>  
            <button class="btn variant-outline-secondary m-2" on:click={getSalesData}>Get Sales Data</button>
            <button class="btn variant-outline-secondary m-2" disabled={allSalesData.length === 0} on:click={graphSalesData}>Graph Sales Data</button>
        </div>

        <div class="flex bg-slate-600 mt-4 rounded-md">
            <div class="w-1/2">
                    <canvas class="bg-slate-100 rounded-md m-2" bind:this={canvasElement}></canvas>
            </div>
            {#if allSalesData.length > 0}
            <ListBox class="w-64">
                {#each uniqueStoreLocations as location}
                    <ListBoxItem class="text-center" bind:group={singleLocation} name="medium" value={location} on:click={handleLocationSelection}>{location}</ListBoxItem>
                {/each}
            </ListBox>
            {/if}
            <div class="p-4 m-2">
                {#if allSalesData.length === 0}
                    <div class="w-64 text-center p-6 m-4 bg-slate-300 text-black rounded-md">
                        <h3>No Data to Display</h3>
                        <p>Press 'Get Sales Data'</p>
                    </div>
                 {:else}
                <h2><span class="font-semibold text-xl">Sales Stats for:</span> {singleLocation}</h2>
                <p><span class="font-semibold">Total Items Sold:</span> {salesStats.totalItemsSold}</p>
                <p><span class="font-semibold">Total Sales:</span> {salesStats.totalSales}</p>
                <p><span class="font-semibold">Average Sales:</span> {salesStats.averageSales.toFixed(2)}</p>
                <button class="btn variant-filled-secondary" disabled={!singleLocation} on:click={exportSalesData}>Export Sales Data</button>
                {/if}
            </div>
        </div>
        <div class="flex flex-col justify-center items-center w-1/2 h-3/4 bg-slate-300 text-black rounded-md m-4">
            <h2 class="font-bold text-2xl">Show Exported Stats</h2>
            <button class="btn variant-outline-secondary m-2" on:click={getSalesStats}>Show Stats</button>
            <div>
                {#each stats as stat}
                    <li>{stat.storeLocation} - Total Sales: {stat.totalSales}</li>
                {/each}
            </div>
        </div>

    </div>

</section>