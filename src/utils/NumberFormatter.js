import {useCallback} from "react";

const useNumberFormatter = () => {
    const formatNumber = useCallback((value) => {
        if (value === null || value === undefined || isNaN(value)) return "0";

        return Number(value)
            .toFixed(0)
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }, []);

    return {formatNumber};
};

export default useNumberFormatter;