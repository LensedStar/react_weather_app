import React from "react";
import {useAppSelector} from "../../store/hooks.ts";

interface SearchHistoryProps {
    handleClick:(value: string) => void;
}

const SearchHistory:React.FC<SearchHistoryProps> = ({handleClick}) => {
    const {history} = useAppSelector(state => state.forecast);
    return (
        <ul className="history-list">
            {
                history.length
                    ?
                    history.map((cityName,i)=> <li key={`historyKey${i}`} onClick={()=>handleClick(cityName)}>{cityName}</li>)
                    :
                    <li>No search history...</li>
            }
        </ul>
    );
};
export default SearchHistory;
