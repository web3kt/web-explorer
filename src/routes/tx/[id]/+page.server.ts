import type {RequestEvent} from "@sveltejs/kit";
import {callApi} from "$lib/server/api";

export async function load(event: RequestEvent): Promise<ApiResponse<Transaction>> {
    return await callApi(event, 'GET', `/v1/transactions/${event.params["id"]}`)
}