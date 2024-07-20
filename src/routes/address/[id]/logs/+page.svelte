<script lang="ts">
    import {Utils} from "$lib/utils";
    import Pagination from "$lib/component/Pagination.svelte";
    import Tx from "$lib/component/Tx.svelte";
    import Block from "$lib/component/Block.svelte";
    import Address from "$lib/component/Address.svelte";
    import {symbol} from "$lib/env"
    import Token from "$lib/component/Token.svelte";

    export let data: {
        address: ApiResponse<Address>;
        logs: ApiResponse<PagedModel<Log>>;
    };
    $: address = data.address.body;
    $: logs = data.logs.body;
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
            <h5 class="card-title">{logs.page.totalElements.toLocaleString()}</h5>
            <h6 class="card-subtitle text-body-secondary">Logs</h6>
        </div>
    </div>
</div>

<ul class="nav nav-tabs mb-4">
    <li class="nav-item">
        <a href="/address/{address.id}" class="nav-link">Transactions</a>
    </li>
    <li class="nav-item">
        <a href="/address/{address.id}/internal-transactions" class="nav-link">Internal Transactions</a>
    </li>
    <li class="nav-item">
        <a href="/address/{address.id}/token-transactions" class="nav-link">Token Transactions</a>
    </li>
    <li class="nav-item">
        <a href="/address/{address.id}/logs" class="nav-link active">Log</a>
    </li>
</ul>
<Pagination pageInfo={logs.page}/>
<table class="table align-middle">
    <thead>
    <tr>
        <th>Transaction</th>
        <th>Block</th>
        <th>Age</th>
        <th>Topic</th>
        <th>Data</th>
    </tr>
    </thead>
    <tbody>
    {#each logs.content as log}
        <tr>
            <td>
                <Tx value={log.transaction} sm short/>
            </td>
            <td>
                <Block id={log.transaction.blockId} sm/>
            </td>
            <td>{Utils.timeSince(log.timestamp)}</td>
            <td>
                <ul>
                    {#each log.topics as topic}
                        <li>{topic.value}{topic.name ? ` (${topic.name})` : ''}</li>
                    {/each}
                </ul>
            </td>
            <td>
                <textarea class="form-control" disabled>{log.data}</textarea>
            </td>
        </tr>
    {/each}
    </tbody>
</table>
