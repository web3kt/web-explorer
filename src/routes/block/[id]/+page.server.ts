import type {RequestEvent} from "@sveltejs/kit";
import {callApi} from "$lib/server/api";

export async function load(event: RequestEvent): Promise<ApiResponse<Block>> {
    return await callApi(event, 'GET', `/v1/blocks/${event.params["id"]}`)
}