<script lang="ts">
    import Button from "$lib/component/Button.svelte";
    import {Utils} from "$lib/utils";
    import Icon from "$lib/component/Icon.svelte";

    export let id: string;
    export let sm: boolean = false;
    export let short: boolean = false;
</script>

<Button href="/address/{id}" sm={sm}><Icon name="wallet"/> {short ? Utils.shortText(id) : id}</Button>