import type {RequestEvent} from "@sveltejs/kit";
import {callApi} from "$lib/server/api";

export async function load(event: RequestEvent): Promise<ApiResponse<PagedModel<Block>>> {
    return await callApi(event, 'GET', `/v1/blocks?sort=id,desc&` + event.url.searchParams.toString())
}