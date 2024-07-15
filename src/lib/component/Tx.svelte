<script lang="ts">
    import Button from "$lib/component/Button.svelte";
    import {Utils} from "$lib/utils";
    import Icon from "$lib/component/Icon.svelte";

    export let value: Transaction;
    export let sm: boolean = false;
    export let short: boolean = false;
</script>

<Button href="/tx/{value.id}" sm={sm}>
    {#if value.status === "0x1"}
        <Icon name="file-text"/>
    {:else}
        <Icon name="x-circle"/>
    {/if}
    {short ? Utils.shortText(value.id) : value.id}
</Button>