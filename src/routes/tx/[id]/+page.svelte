<script lang="ts">
    import {Utils} from "$lib/utils";
    import Block from "$lib/component/Block.svelte";
    import Address from "$lib/component/Address.svelte";
    import Icon from "$lib/component/Icon.svelte";
    import {symbol} from "$lib/env";
    import Badge from "$lib/component/Badge.svelte";

    export let data: ApiResponse<Transaction>;
    $: tx = data.body
</script>
<table class="table align-middle">
    <tbody>
    <tr>
        <th>Transaction Hash</th>
        <td>{tx.id}</td>
    </tr>
    <tr>
        <th>Block</th>
        <td>
            <Block id={tx.block.id} sm/>
        </td>
    </tr>
    <tr>
        <th>Timestamp</th>
        <td>{Utils.timeSince(tx.block.timestamp)} ({new Date(tx.block.timestamp).toLocaleString()})</td>
    </tr>
    <tr>
        <th>Status</th>
        <td>
            <Badge success={tx.status === "0x1"}/>
        </td>
    </tr>
    {#if tx.revertReason}
        <tr>
            <th>Revert Reason</th>
            <td>
                <textarea class="form-control" disabled>{tx.revertReason}</textarea>
            </td>
        </tr>
    {/if}
    <tr>
        <th>From</th>
        <td>
            <Address id={tx.from} sm/>
        </td>
    </tr>
    <tr>
        <th>To</th>
        <td>
            <Address id={tx.to} sm/>
            <br/>
            {#if tx.internalTransactions.length !== 0}
                {#each tx.internalTransactions as itx}
                    <div class="mt-1">
                        <Icon name="arrow-return-right"/>
                        Transfer
                        {Utils.toEth(itx.value).toLocaleString()} {symbol}
                        from
                        <Address id={itx.from} sm/>
                        to
                        <Address id={itx.to} sm/>
                    </div>
                {/each}
            {/if}
        </td>
    </tr>
    {#if tx.contractAddress}
        <tr>
            <th>Contract Address</th>
            <td>
                <Address id={tx.contractAddress} sm/>
            </td>
        </tr>
    {/if}
    {#if tx.logs.length !== 0}
        <tr>
            <th>Logs</th>
            <td>
                {#each tx.logs as log}
                    <table class="table align-middle">
                        <thead>
                        <tr>
                            <th>Log Index</th>
                            <th>{log.logIndex}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th>Address</th>
                            <td>
                                <Address id={log.address} sm/>
                            </td>
                        </tr>
                        <tr>
                            <th>Topic</th>
                            <td>
                                <ul>
                                    {#each log.topics as topic}
                                        <li>{topic.value}{topic.name ? ` (${topic.name})` : ''}</li>
                                    {/each}
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <th>Data</th>
                            <td><textarea class="form-control" disabled>{log.data}</textarea></td>
                        </tr>
                        </tbody>
                    </table>
                {/each}
            </td>
        </tr>
    {/if}
    <tr>
        <th>Value</th>
        <td>{Utils.toEth(tx.value).toLocaleString()} {symbol}</td>
    </tr>
    <tr>
        <th>Gas Used</th>
        <td>
            {tx.gasUsed.toLocaleString()} ({(tx.gasUsed / tx.gasLimit * 100).toLocaleString()}%)
            <div class="progress">
                <div class="progress-bar bg-dark " style="width: {(tx.gasUsed / tx.gasLimit * 100)}%"/>
            </div>
        </td>
    </tr>
    <tr>
        <th>Gas Limit</th>
        <td>{tx.gasLimit.toLocaleString()}</td>
    </tr>
    <tr>
        <th>Gas Price</th>
        <td>{Utils.toGwei(tx.gasPrice).toLocaleString()} Gwei</td>
    </tr>
    <tr>
        <th>Transaction Fee</th>
        <td>{Utils.toEth(tx.gasUsed * tx.gasPrice)} {symbol}</td>
    </tr>
    <tr>
        <th>Input Data</th>
        <td><textarea class="form-control" disabled rows="6">{tx.input}</textarea></td>
    </tr>
    </tbody>
</table>
