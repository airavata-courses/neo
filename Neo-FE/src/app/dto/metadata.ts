export interface station {
    [key: string]: string
}

export interface feature {
    [key: string]: string
}

export interface MetaData {
    readonly stations: station,
    readonly properties: string[],
    readonly feature: feature
}
