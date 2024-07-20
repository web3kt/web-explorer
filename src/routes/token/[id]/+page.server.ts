import type {RequestEvent} from "@sveltejs/kit";
import {callApi} from "$lib/server/api";

export async function load(event: RequestEvent): Promise<{
    token: ApiResponse<Token>;
    txs: ApiResponse<PagedModel<TokenTransaction>>;
}> {
    const token: ApiResponse<Token> = await callApi(event, 'GET', `/v1/tokens/${event.params["id"]}`);
    const txs: ApiResponse<PagedModel<TokenTransaction>> = await callApi(event, 'GET', `/v1/tokens/${event.params["id"]}/token-transactions?sort=id,desc&` + event.url.searchParams.toString())
    return {token, txs};
}