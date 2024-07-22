import type {RequestEvent} from "@sveltejs/kit";
import {callApi} from "$lib/server/api";

export async function load(event: RequestEvent): Promise<{
    address: ApiResponse<Address>;
    logs: ApiResponse<PagedModel<Log>>;
}> {
    const address: ApiResponse<Address> = await callApi(event, 'GET', `/v1/addresses/${event.params["id"]}`);
    const logs: ApiResponse<PagedModel<Log>> = await callApi(event, 'GET', `/v1/addresses/${event.params["id"]}/logs?sort=timestamp,desc&` + event.url.searchParams.toString())
    return {address, logs};
}