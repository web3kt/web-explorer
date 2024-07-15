<script lang="ts">
    import Button from "$lib/component/Button.svelte";
    import Icon from "$lib/component/Icon.svelte";

    export let id: number;
    export let sm: boolean = false;
</script>

<Button href="/block/{id}" sm={sm}><Icon name="box"/> {id}</Button>