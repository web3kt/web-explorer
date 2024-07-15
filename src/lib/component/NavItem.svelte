<script lang="ts">
    import {page} from "$app/stores";

    export let href: string;
</script>

<li class="nav-item">
    <a class="nav-link{$page.url.pathname.includes(href) ? ' active' : ''}" href={href}>
        <slot/>
    </a>
</li>