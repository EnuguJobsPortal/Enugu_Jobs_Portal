import { ParseQueryParams } from "@/interfaces/general";

export const parseQueryParams = (queryParams: ParseQueryParams) => {
    const params = new URLSearchParams();
    Object.keys(queryParams).forEach((key) => {
        
        const queryParamsKeyValue = queryParams[key];
        
        if (queryParamsKeyValue instanceof Array) {
            queryParamsKeyValue.forEach((item) => {
                params.append(`${key}`, item);
            });
        } else {
            if (typeof queryParamsKeyValue === "boolean") {
                params.set(key, `${queryParamsKeyValue}`);
            } else if (queryParamsKeyValue) {
                params.set(key, queryParamsKeyValue);
            }
        }
    });

    return params;
};