<script lang="ts">

    async function getSalesData() {
        const response = await fetch('/api/sales');
        const data = await response.json();
        console.log(data)
    }

    async function postSalesData() {
        const response = await fetch('/api/sales', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'John Doe',
                sale: 100
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
    </div>
</section>