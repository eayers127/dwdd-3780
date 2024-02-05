<script lang="ts">

    export let data: any;

    $: console.log(data);
    
</script>
<main>
    <div>
        <h3>{data.body.title}</h3>
    </div>
</main>