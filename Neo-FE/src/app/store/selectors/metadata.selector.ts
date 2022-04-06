import { createSelector } from '@ngrx/store';
import { getNeoState } from '.';

export const getMetadataState = createSelector(getNeoState, ({ metadata }) => metadata);

export const getMetadataLoading = createSelector(
    getMetadataState,
    ({ loading }) => loading
);

export const getStationById = createSelector(
    getMetadataState,
    ({ data }) => data?.stations
);

export const getStations = createSelector(
    getMetadataState,
    ({ data }) => {
        let stations = Object.keys(data?.stations || {})
            .map(key => ({ key, value: data?.stations[key] }))
            .sort((a, b) => {
                let nameA = a.value?.toUpperCase() || '';
                let nameB = b.value?.toUpperCase() || '';
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                return 0;

            });
        return stations
    }
);

export const getProperties = createSelector(
    getMetadataState,
    ({ data }) =>
        data?.properties
);

export const getNasaProperties = createSelector(
    getMetadataState,
    ({ data }) => {
        let properties = Object.keys(data?.feature || {})
            .map(key => ({ key, value: data?.feature[key] }))
            .sort((a, b) => {
                let nameA = a.value?.toUpperCase() || '';
                let nameB = b.value?.toUpperCase() || '';
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                return 0;

            });
        return properties
    }
);

export const getNasaPropertiesById = createSelector(
    getMetadataState,
    ({ data }) => data?.feature
);

export const getMetadataError = createSelector(
    getMetadataState,
    ({ error }) =>
        error
);
