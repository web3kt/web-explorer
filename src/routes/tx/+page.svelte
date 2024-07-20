<script lang="ts">
    import {Utils} from "$lib/utils";
    import Address from "$lib/component/Address.svelte";
    import Tx from "$lib/component/Tx.svelte";
    import Block from "$lib/component/Block.svelte";
    import Pagination from "$lib/component/Pagination.svelte";
    import {symbol} from "$lib/env";
    import Icon from "$lib/component/Icon.svelte";

    export let data: ApiResponse<PagedModel<Transaction>>;
    $: txs = data.body
</script>
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
                <Block id={tx.blockId} sm/>
            </td>
            <td>{Utils.timeSince(tx.timestamp)}</td>
            <td>
                <Address id={tx.from} short sm/>
            </td>
            <td>
                <Address id={tx.to} short sm/>
            </td>
            <td class="text-end">{Utils.toEth(tx.value)} {symbol}</td>
            <td class="text-end">{Utils.toEth(tx.gasUsed * tx.gasPrice)} {symbol}</td>
        </tr>
    {/each}
    </tbody>
</table>
