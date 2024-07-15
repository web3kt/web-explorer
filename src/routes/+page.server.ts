import type {RequestEvent} from "@sveltejs/kit";
import {callApi} from "$lib/server/api";

export async function load(event: RequestEvent): Promise<{
    blocks: ApiResponse<PagedModel<Block>>;
    txs: ApiResponse<PagedModel<Transaction>>
}> {
    const blocks: ApiResponse<PagedModel<Block>> = await callApi(event, 'GET', `/v1/blocks?size=18&sort=id,desc`);
    const txs: ApiResponse<PagedModel<Transaction>> = await callApi(event, 'GET', `/v1/transactions?size=18&sort=block.id,desc`);
    return {blocks, txs}
}