import type {RequestEvent} from "@sveltejs/kit";
import {callApi} from "$lib/server/api";

export async function load(event: RequestEvent): Promise<ApiResponse<PagedModel<Token>>> {
    return await callApi(event, 'GET', `/v1/tokens?` + event.url.searchParams.toString())
}