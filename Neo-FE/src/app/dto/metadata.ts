export interface station {
    [key: string]: string
} 

export interface MetaData {
    readonly stations: station,
    readonly properties: string[]
}
