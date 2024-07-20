interface ApiResponse<T> {
    ok: boolean
    status: number
    body: T
    message?: string
}

interface PagedModel<T> {
    page: PageInfo
    content: T[]
}

interface PageInfo {
    size: number
    number: number
    totalElements: number
    totalPages: number
}

interface Block {
    id: number,
    hash: string,
    transactionCount: number,
    miner: string,
    totalDifficulty: number,
    baseFeePerGas: number,
    size: number,
    gasLimit: number,
    gasUsed: number,
    timestamp: number,
    parentHash: string,
    stateRoot: string,
    extraData: string,
}

interface Transaction {
    id: string,
    blockId: number,
    timestamp: number,
    contractAddress: string,
    from: string,
    to: string,
    status: string,
    revertReason: string,
    value: number,
    gasUsed: number,
    gasLimit: number,
    gasPrice: number,
    maxPriorityFeePerGas: number,
    maxFeePerGas: number,
    input: string,
    logs: Log[],
    internalTransactions: InternalTransaction[]
}

interface Log {
    transaction: Transaction,
    timestamp: number,
    logIndex: number,
    removed: boolean,
    address: string,
    data: string,
    topics: Topic[],
}

interface Address {
    id: string,
    balance: number
    isContract: boolean
}

interface InternalTransaction {
    transaction: Transaction,
    timestamp: number,
    from: string,
    to: string,
    value: number,
}

interface TokenTransaction {
    transaction: Transaction,
    timestamp: number,
    token: Token,
    from: string,
    to: string,
    value: number,
}

interface Topic {
    value: string,
    name: string
}

interface Token {
    id: string
    name: string,
    symbol: string,
    decimals: number
    totalSupply: number
}