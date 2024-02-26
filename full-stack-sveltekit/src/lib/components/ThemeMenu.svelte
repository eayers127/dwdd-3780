<script lang="ts">
    import { themeStore } from '$lib/stores/themeStore'

</script>

<div class="flex">
    <select class="select" bind:value={$themeStore}>
        <option value="wintry">Wintry</option>
        <option value="skeleton">Skeleton</option>
        <option value="modern">Modern</option>
        <option value="hamlindigo">Hamlindigo</option>
    </select>
</div>