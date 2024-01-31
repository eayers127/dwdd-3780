<script lang='ts'>
    export let data: any;

    $: console.log(data);
</script>

<h1>{data.body.message}</h1>
<p>Test</p>