<script lang="ts">
    import Icon from "$lib/component/Icon.svelte";

    export let success: boolean;
</script>

{#if success}
    <span class="badge text-success border border-success"><Icon name="check-circle"/> Success</span>
{:else }
    <span class="badge text-danger border border-danger"><Icon name="x-circle"/> Fail</span>
{/if}