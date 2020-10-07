import React from 'react'
import { searchByPage } from '../../../services/services';

interface PaginationType {
    isVisible: boolean;
    queries: any;
    onPrePageClick: (prePageResult: any) => void;
    onNextPageClick: (nextPageResult: any) => void;
}

export default function Pagination({ isVisible, queries, onPrePageClick, onNextPageClick }: PaginationType) {

    function handlePrePageClick() {
        const searchTerms = queries.previousPage[0].searchTerms;
        const startIndex = queries.previousPage[0].startIndex;
        searchByPage(searchTerms, startIndex)
            .then(x => {
                onPrePageClick(x);
                // setResults(x);
            })
    }

    function handleNextPageClick() {
        const searchTerms = queries.nextPage[0].searchTerms;
        const startIndex = queries.nextPage[0].startIndex;
        searchByPage(searchTerms, startIndex)
            .then(x => {
                onNextPageClick(x);
                // setResults(x);
            })
    }

    return (
        <>
            { isVisible && <div>
                <button disabled={!queries.hasOwnProperty('previousPage')} onClick={handlePrePageClick}>{`<`}</button>
                <button disabled={!queries.hasOwnProperty('nextPage')} onClick={handleNextPageClick}>{`>`}</button>
            </div>
            }
        </>
    )
}
