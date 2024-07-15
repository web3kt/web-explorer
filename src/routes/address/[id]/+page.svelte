<script lang="ts">
    import {Utils} from "$lib/utils";
    import Pagination from "$lib/component/Pagination.svelte";
    import Tx from "$lib/component/Tx.svelte";
    import Block from "$lib/component/Block.svelte";
    import Address from "$lib/component/Address.svelte";
    import {symbol} from "$lib/env";
    import Icon from "$lib/component/Icon.svelte";

    export let data: {
        address: ApiResponse<Address>;
        txs: ApiResponse<PagedModel<Transaction>>;
    };
    $: address = data.address.body;
    $: txs = data.txs.body;
</script>

<div class="row mb-4">
    <div class="card border-0 col-5">
        <div class="card-body border border-dark">
            <h5 class="card-title">{address.id}</h5>
            <h6 class="card-subtitle text-body-secondary">
                {#if address.isContract}Contract{:else }Address{/if}
            </h6>
        </div>
    </div>
    <div class="card border-0 col">
        <div class="card-body border border-dark">
            <h5 class="card-title">{Utils.toEth(address.balance).toLocaleString()} {symbol}</h5>
            <h6 class="card-subtitle text-body-secondary">Balance</h6>
        </div>
    </div>
    <div class="card border-0 col">
        <div class="card-body border border-dark">
            <h5 class="card-title">{txs.page.totalElements.toLocaleString()}</h5>
            <h6 class="card-subtitle text-body-secondary">Transactions</h6>
        </div>
    </div>
</div>

<ul class="nav nav-tabs mb-4">
    <li class="nav-item">
        <a href="/address/{address.id}" class="nav-link active">Transactions</a>
    </li>
    <li class="nav-item">
        <a href="/address/{address.id}/internal-transactions" class="nav-link">Internal Transactions</a>
    </li>
</ul>

<Pagination pageInfo={txs.page}/>
<table class="table align-middle">
    <thead>
    <tr>
        <th>Transaction Hash</th>
        <th>Block</th>
        <th>Age</th>
        <th>From</th>
        <th>To</th>
        <th class="text-end">Value</th>
        <th class="text-end">Txn Fee</th>
    </tr>
    </thead>
    <tbody>
    {#each txs.content as tx}
        <tr>
            <td>
                <Tx value={tx} sm short/>
            </td>
            <td>
                <Block id={tx.block.id} sm/>
            </td>
            <td>{Utils.timeSince(tx.block.timestamp)}</td>
            <td>
                <Address id={tx.from} sm short/>
            </td>
            <td>
                <Address id={tx.to} sm short/>
            </td>
            <td class="text-end">{Utils.toEth(tx.value)} {symbol}</td>
            <td class="text-end">{Utils.toEth(tx.gasUsed * tx.gasPrice)} {symbol}</td>
        </tr>
    {/each}
    </tbody>
</table>
