<script lang="ts">
    export let data: any;


</script>

<main class="p-4">
    <div class="max-w-md mx-auto overflow-hidden md:max-w-2xl m-4 bg-slate-200 rounded-md">
        <div class="md:flex">
            <div class="p-8 w-72">
                <h1 class="text-gray-700 text-2xl font-bold mb-4">{data?.body?.movie?.title}</h1>
                <p class="text-gray-600">{data?.body?.movie?.year}</p>
                <p class="text-gray-600 mb-4">{data?.body?.movie?.rated} | {data?.body?.movie?.runtime} minutes</p>
            </div>
            <div class="md:flex-shrink-0">
                <img class="p-4 h-72 w-full object-cover md:w-48 rounded-xl" src={data?.body?.movie?.poster} alt={data?.body?.movie?.title}/>
            </div>
        </div>
        <div class="p-8">
            <p class="text-gray-700">{data?.body?.movie?.fullplot}</p>
            <p class="text-gray-700 pt-4">Genres: {data?.body?.movie?.genres.join(', ')}</p>
            <a href="/movies" class="text-blue-500 mt-4 block btn">Back to Movies</a>
        </div>
    </div>
</main>
