<script lang="ts">
    import {Utils} from "$lib/utils";
    import Pagination from "$lib/component/Pagination.svelte";
    import Button from "$lib/component/Button.svelte";
    import Address from "$lib/component/Address.svelte";
    import Block from "$lib/component/Block.svelte";

    export let data: ApiResponse<PagedModel<Block>>;
    $: pagedModel = data.body;
</script>
<Pagination pageInfo={pagedModel.page}/>
<table class="table align-middle">
    <thead>
    <tr>
        <th>Block</th>
        <th>Age</th>
        <th>Txn</th>
        <th>Miner</th>
        <th class="text-end">Gas Used</th>
        <th class="text-end">Gas Limit</th>
    </tr>
    </thead>
    <tbody>
    {#each pagedModel.content as block}
        <tr>
            <td>
                <Block id={block.id} sm/>
            </td>
            <td>{Utils.timeSince(block.timestamp)}</td>
            <td>
                <Button href="/tx?blockId={block.id}" sm>{block.transactionCount} txns</Button>
            </td>
            <td>
                <Address id={block.miner} sm/>
            </td>
            <td class="text-end">
                {block.gasUsed.toLocaleString()} ({(block.gasUsed / block.gasLimit * 100).toLocaleString()}%)
            </td>
            <td class="text-end">{block.gasLimit.toLocaleString()}</td>
        </tr>
    {/each}
    </tbody>
</table>
