<script lang="ts">
    import {Utils} from "$lib/utils";
    import Button from "$lib/component/Button.svelte";
    import Address from "$lib/component/Address.svelte";
    import Icon from "$lib/component/Icon.svelte";

    export let data: ApiResponse<Block>;
    $: block = data.body;
</script>
<table class="table align-middle">
    <tbody>
    <tr>
        <th>Block Height</th>
        <td>
            {block.id}
            <a href="/block/{block.id - 1}" class="btn btn-outline-dark btn-sm">
                <Icon name="chevron-left"/>
            </a>
            <a href="/block/{block.id + 1}" class="btn btn-outline-dark btn-sm">
                <Icon name="chevron-right"/>
            </a>
        </td>
    </tr>
    <tr>
        <th>Block Hash</th>
        <td>{block.hash}</td>
    </tr>
    <tr>
        <th>Timestamp</th>
        <td>{Utils.timeSince(block.timestamp)} ({new Date(block.timestamp).toLocaleString()})</td>
    </tr>
    <tr>
        <th>Transactions</th>
        <td>
            <Button href="/tx?blockId={block.id}" sm>{block.transactionCount} transactions</Button>
            in this block
        </td>
    </tr>
    <tr>
        <th>Miner</th>
        <td>
            <Address id={block.miner} sm/>
        </td>
    </tr>
    <tr>
        <th>Total Difficulty</th>
        <td>{block.totalDifficulty.toLocaleString()}</td>
    </tr>
    <tr>
        <th>Size</th>
        <td>{block.size.toLocaleString()} bytes</td>
    </tr>
    <tr>
        <th>Gas Used</th>
        <td>
            {block.gasUsed.toLocaleString()} ({(block.gasUsed / block.gasLimit * 100).toLocaleString()}%)
            <br/>
            <div class="progress">
                <div class="progress-bar bg-dark " style="width: {(block.gasUsed / block.gasLimit * 100)}%"/>
            </div>
        </td>
    </tr>
    <tr>
        <th>Gas Limit</th>
        <td>{block.gasLimit.toLocaleString()}</td>
    </tr>
    <tr>
        <th>Parent Hash</th>
        <td>{block.parentHash}</td>
    </tr>
    <tr>
        <th>State Root</th>
        <td>{block.stateRoot}</td>
    </tr>
    <tr>
        <th>Extra Data</th>
        <td><textarea class="form-control" disabled rows="10">{block.extraData}</textarea></td>
    </tr>
    </tbody>
</table>
