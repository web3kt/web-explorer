import {env} from "$env/dynamic/public";

export const symbol: string = env.PUBLIC_SYMBOL ?? "ETH";
