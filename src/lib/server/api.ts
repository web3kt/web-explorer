import {type RequestEvent} from "@sveltejs/kit";
import {env} from "$env/dynamic/public";

export async function callApi(event: RequestEvent, method: string, path: string, body?: any): Promise<ApiResponse<any>> {
    try {
        const url: string = env.PUBLIC_API_ENDPOINT ?? 'http://localhost:8080';
        const response: Response = await event.fetch(`${url}${path}`, {
            method: method,
            body: JSON.stringify(body)
        })

        body = await response.json();

        if (!response.ok) {
            return {
                ok: response.ok,
                status: response.status,
                body: body,
                message: body.message,
            }
        }

        return {
            ok: response.ok,
            status: response.status,
            body: body,
        }
    } catch (error) {
        let message: string = error instanceof Error ? error.message : "unknown"
        return {
            ok: false,
            status: 500,
            body: null,
            message: message,
        }
    }
}

