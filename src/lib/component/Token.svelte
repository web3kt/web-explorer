<script lang="ts">
    import Button from "$lib/component/Button.svelte";
    import {Utils} from "$lib/utils";
    import Icon from "$lib/component/Icon.svelte";

    export let token: Token;
    export let sm: boolean = false;
</script>

<Button href="/token/{token.id}" sm={sm}><Icon name="coin"/> {token.name}</Button>