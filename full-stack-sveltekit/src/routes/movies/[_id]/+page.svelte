<script lang="ts">
    export let data: any;


</script>

<main>
    <div class="card max-w-md mx-auto bg-white overflow-hidden md:max-w-2xl m-4">
        <div class="md:flex">
            <h1>{data?.body?.movie?.title}</h1>
        </div>
        <div>
            <div class="md:flex-shrink-0">
                <img class="p-4 h-72 w-full object-cover md:w-48 rounded-xl" src={data?.body?.movie?.poster} 
                alt={data?.body?.movie?.title}/>
            </div>
        </div>
        <div class="p-8">
            {data?.body?.movie?.year}
            <p class="text-ellipsis">{data?.body?.movie?.fullplot}</p>
        </div>
    </div>
</main>