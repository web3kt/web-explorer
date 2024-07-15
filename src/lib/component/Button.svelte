<script lang="ts">
    export let sm: boolean = false;
    export let href: string;

    let cls = "btn btn-outline-dark";
    if (sm) cls += " btn-sm";
</script>

<a class={cls} href={href}>
    <slot/>
</a>