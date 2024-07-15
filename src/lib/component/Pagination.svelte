<script lang="ts">
    import {page} from "$app/stores";
    import {goto} from "$app/navigation";
    import Icon from "$lib/component/Icon.svelte";

    export let pageInfo: PageInfo;

    function onClickFirst() {
        let query = new URLSearchParams($page.url.searchParams.toString());
        query.set("page", String(0));
        goto(`?${query.toString()}`);
    }

    function onClickPrev() {
        let query = new URLSearchParams($page.url.searchParams.toString());
        query.set("page", String(pageInfo.number - 1));
        goto(`?${query.toString()}`);
    }

    function onClickNext() {
        let query = new URLSearchParams($page.url.searchParams.toString());
        query.set("page", String(pageInfo.number + 1));
        goto(`?${query.toString()}`);
    }

    function onClickLast() {
        let query = new URLSearchParams($page.url.searchParams.toString());
        query.set("page", String(pageInfo.totalPages - 1));
        goto(`?${query.toString()}`);
    }
</script>
<nav>
    <ul class="pagination justify-content-center">
        <li class="page-item {pageInfo.number === 0 ? 'disabled' : ''}">
            <button class="page-link" on:click={onClickFirst}>
                <Icon name="chevron-double-left"/>
            </button>
        </li>
        <li class="page-item {pageInfo.number === 0 ? 'disabled' : ''}">
            <button class="page-link" on:click={onClickPrev}>
                <Icon name="chevron-left"/>
            </button>
        </li>
        <li class="page-item">
            <button class="page-link">{pageInfo.number + 1} of {pageInfo.totalPages}</button>
        </li>
        <li class="page-item {pageInfo.totalPages - 1 === pageInfo.number ? 'disabled' : ''}">
            <button class="page-link" on:click={onClickNext}>
                <Icon name="chevron-right"/>
            </button>
        </li>
        <li class="page-item {pageInfo.totalPages - 1 === pageInfo.number ? 'disabled' : ''}">
            <button class="page-link" on:click={onClickLast}>
                <Icon name="chevron-double-right"/>
            </button>
        </li>
    </ul>
</nav>
