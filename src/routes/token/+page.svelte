<script lang="ts">
    import Address from "$lib/component/Address.svelte";
    import Pagination from "$lib/component/Pagination.svelte";
    import Token from "$lib/component/Token.svelte";

    export let data: ApiResponse<PagedModel<Token>>;
    $: tokens = data.body
</script>
<Pagination pageInfo={tokens.page}/>
<table class="table align-middle">
    <thead>
    <tr>
        <th>Address</th>
        <th>Name</th>
        <th>Symbol</th>
        <th>Decimals</th>
    </tr>
    </thead>
    <tbody>
    {#each tokens.content as token}
        <tr>
            <td>
                <Address id={token.id} sm/>
            </td>
            <td>
                <Token token={token} sm/>
            </td>
            <td>
                {token.symbol}
            </td>
            <td>
                {token.decimals}
            </td>
        </tr>
    {/each}
    </tbody>
</table>
