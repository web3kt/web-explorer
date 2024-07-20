<script lang="ts">
    import {Utils} from "$lib/utils";
    import Pagination from "$lib/component/Pagination.svelte";
    import Tx from "$lib/component/Tx.svelte";
    import Block from "$lib/component/Block.svelte";
    import Address from "$lib/component/Address.svelte";
    import {symbol} from "$lib/env";
    import Icon from "$lib/component/Icon.svelte";

    export let data: {
        token: ApiResponse<Token>;
        txs: ApiResponse<PagedModel<TokenTransaction>>;
    };
    $: token = data.token.body;
    $: txs = data.txs.body;
</script>

<div class="row mb-4">
    <div class="card border-0 col-5">
        <div class="card-body border border-dark">
            <h5 class="card-title">{token.name}</h5>
            <h6 class="card-subtitle text-body-secondary">
                {token.id}
            </h6>
        </div>
    </div>
    <div class="card border-0 col">
        <div class="card-body border border-dark">
            <h5 class="card-title">{Utils.toEth(token.totalSupply, token.decimals).toLocaleString()} {token.symbol}</h5>
            <h6 class="card-subtitle text-body-secondary">Total Supply</h6>
        </div>
    </div>
    <div class="card border-0 col">
        <div class="card-body border border-dark">
            <h5 class="card-title">{txs.page.totalElements.toLocaleString()}</h5>
            <h6 class="card-subtitle text-body-secondary">Transactions</h6>
        </div>
    </div>
</div>

<Pagination pageInfo={txs.page}/>
<table class="table align-middle">
    <thead>
    <tr>
        <th>Transaction Hash</th>
        <th>Age</th>
        <th>From</th>
        <th>To</th>
        <th class="text-end">Value</th>
    </tr>
    </thead>
    <tbody>
    {#each txs.content as tx}
        <tr>
            <td>
                <Tx value={tx.transaction} sm short/>
            </td>
            <td>{Utils.timeSince(tx.timestamp)}</td>
            <td>
                <Address id={tx.from} sm short/>
            </td>
            <td>
                <Address id={tx.to} sm short/>
            </td>
            <td class="text-end">{Utils.toEth(tx.value, token.decimals)} {token.symbol}</td>
        </tr>
    {/each}
    </tbody>
</table>
