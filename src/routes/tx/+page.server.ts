import type {RequestEvent} from "@sveltejs/kit";
import {callApi} from "$lib/server/api";

export async function load(event: RequestEvent): Promise<ApiResponse<PagedModel<Transaction>>> {
    return await callApi(event, 'GET', `/v1/transactions?sort=timestamp,desc&` + event.url.searchParams.toString())
}