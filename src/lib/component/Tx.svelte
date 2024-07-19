<script lang="ts">
    import Button from "$lib/component/Button.svelte";
    import {Utils} from "$lib/utils";
    import Icon from "$lib/component/Icon.svelte";

    export let value: Transaction;
    export let sm: boolean = false;
    export let short: boolean = false;
</script>

<Button href="/tx/{value.id}" sm={sm}>
    {#if value.status === "0x0"}
        <Icon name="x-circle"/>
    {:else}
        <Icon name="file-text"/>
    {/if}
    {short ? Utils.shortText(value.id) : value.id}
</Button>