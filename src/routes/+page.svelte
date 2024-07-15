<script lang="ts">
    import {onMount} from "svelte";
    import {invalidateAll} from "$app/navigation";
    import {Utils} from "$lib/utils";
    import {symbol} from "$lib/env";
    import Button from "$lib/component/Button.svelte";
    import Address from "$lib/component/Address.svelte";
    import Tx from "$lib/component/Tx.svelte";
    import Block from "$lib/component/Block.svelte";
    import Icon from "$lib/component/Icon.svelte";

    export let data: {
        blocks: ApiResponse<PagedModel<Block>>;
        txs: ApiResponse<PagedModel<Transaction>>
    };

    $: blocks = data.blocks.body;
    $: txs = data.txs.body;

    onMount(() => {
        const interval = setInterval(invalidateAll, 10000);

        return () => {
            clearInterval(interval);
        };
    });

    let selectedOption: string;
    let placeholder: string = "Select Filter";
    let inputValue: string;

    function handleSelectChange() {
        if (selectedOption === "block") {
            placeholder = blocks.content[0].id.toString()
        } else if (selectedOption === "tx") {
            placeholder = txs.content[0].id
        } else if (selectedOption === "address") {
            placeholder = "0x0000000000000000000000000000000000000000"
        }
    }
</script>
<div class="row mb-4">
    <div class="col-auto">
        <select class="form-select" bind:value={selectedOption} on:change={handleSelectChange}>
            <option selected disabled>Filter</option>
            <option value="block">Block</option>
            <option value="tx">Transaction</option>
            <option value="address">Address</option>
        </select>
    </div>
    <div class="col">
        <input type="text" class="form-control" placeholder={placeholder}>
    </div>
    <div class="col-auto">
        <a href={`/${selectedOption}/${inputValue}`} class="btn btn-outline-dark" type="button"><Icon name="search"/> Search</a>
    </div>
</div>
<div class="row mb-4">
    <div class="card border-0 col">
        <div class="card-body border border-dark">
            <h5 class="card-title"><Icon name="box"/> {blocks.content[0].id.toLocaleString()}</h5>
            <h6 class="card-subtitle text-body-secondary">Last Block</h6>
        </div>
    </div>

    <div class="card border-0 col">
        <div class="card-body border border-dark">
            <h5 class="card-title"><Icon name="file-text"/> {txs.page.totalElements.toLocaleString()}</h5>
            <h6 class="card-subtitle text-body-secondary">Transactions</h6>
        </div>
    </div>

    <div class="card border-0 col">
        <div class="card-body border border-dark">
            <h5 class="card-title"><Icon name="fuel-pump"/> {blocks.content[0].gasLimit.toLocaleString()}</h5>
            <h6 class="card-subtitle text-body-secondary">Last Gas Limit</h6>
        </div>
    </div>
</div>

<div class="row mb-4">
    <div class="col">
        <table class="table align-middle">
            <thead>
            <tr>
                <th colspan="3">Latest Blocks</th>
            </tr>
            </thead>
            <tbody>
            {#each blocks.content as block}
                <tr>
                    <td>
                        <Block id={block.id} sm/>
                    </td>
                    <td>
                        Miner
                        <Address id={block.miner} short sm/>
                    </td>
                    <td>
                        <Button href="/tx?blockId={block.id}" sm>{block.transactionCount} txns</Button>
                        in {Utils.timeSince(block.timestamp)}
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
        <div class="d-grid">
            <Button href="/block">View All Blocks</Button>
        </div>
    </div>
    <div class="col">
        <table class="table align-middle">
            <thead>
            <tr>
                <th colspan="3">Latest Transactions</th>
            </tr>
            </thead>
            <tbody>
            {#each txs.content as tx}
                <tr>
                    <td>
                        <Tx value={tx} short sm/>
                    </td>
                    <td>
                        From
                        <Address id={tx.from} short sm/>
                        To
                        <Address id={tx.to} short sm/>
                    </td>
                    <td class="text-end">{Utils.toEth(tx.value).toLocaleString()} {symbol}</td>
                </tr>
            {/each}
            </tbody>
        </table>
        <div class="d-grid">
            <Button href="/tx">View All Transactions</Button>
        </div>
    </div>
</div>
