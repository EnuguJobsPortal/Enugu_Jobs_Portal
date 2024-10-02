import { IPagination } from "@/interfaces/general";
import { useCallback, useState } from "react";

const usePagination = (initialState: IPagination) => {
    const [ pagination, setPagination ] = useState<IPagination>(initialState);
  
    const onPageChange = useCallback((pageIndex: number, pageSize: number) => {
        setPagination({ ...pagination, pageIndex, pageSize });
    }, [pagination]);
  
    return {
        pagination,
        onPageChange,
    };
};

export default usePagination;