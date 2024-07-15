import type {RequestEvent} from "@sveltejs/kit";
import {callApi} from "$lib/server/api";

export async function load(event: RequestEvent): Promise<{
    address: ApiResponse<Address>;
    txs: ApiResponse<PagedModel<InternalTransaction>>;
}> {
    const address: ApiResponse<Address> = await callApi(event, 'GET', `/v1/addresses/${event.params["id"]}`);
    const txs: ApiResponse<PagedModel<InternalTransaction>> = await callApi(event, 'GET', `/v1/addresses/${event.params["id"]}/internal-transactions?` + event.url.searchParams.toString())
    return {address, txs};
}