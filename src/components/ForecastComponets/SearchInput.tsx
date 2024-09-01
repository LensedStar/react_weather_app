import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../store/hooks.ts";

type InputProps = {
    handleSearch: (value: string) => void;
};

const SearchInput: React.FC<InputProps> = ({ handleSearch }) => {
    const currentSearch = useAppSelector(state => state.forecast.loadedForecast);
    const [inputValue, setInputValue] = useState<string>(currentSearch?.name || '');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (currentSearch && inputValue !== currentSearch.name) {
            setInputValue(currentSearch.name);
        }
    }, [currentSearch]);

    const handleSearchClick = () => {
        if (inputValue) {
            handleSearch(inputValue);
        }
    };

    return (
        <div className="search-input-container">
            <input
                className='search-input input-border'
                ref={inputRef}
                type="text"
                placeholder="City name..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="input-button input-border" onClick={handleSearchClick}>Search</button>
        </div>
    );
};

export default SearchInput;

