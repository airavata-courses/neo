import { createAction, props } from "@ngrx/store";
import { MetaData } from "src/app/dto";

interface MetadataFailPayload {
    readonly error: boolean;
}

export const getMetadataFail = createAction(
    '[Metadata] Get Metadata Failed',
    props<{ readonly payload: MetadataFailPayload }>()
);

export const getMetadata = createAction(
    '[Metadata] Get Metadata'
)

export const getMetadataSuccess = createAction(
    '[Metadata] Get Metadata Success',
    props<{ readonly payload: MetaData }>()
)

export const getMapdata = createAction(
    '[Metadata] Get Map Data'
)

export const getMapdataSuccess = createAction(
    '[Metadata] Get Map Data Success',
    props<{ readonly payload: Object }>()
)

export type MetadataAction =
    | typeof getMetadataFail
    | typeof getMetadata
    | typeof getMetadataSuccess
    | typeof getMapdataSuccess
    | typeof getMapdata;
