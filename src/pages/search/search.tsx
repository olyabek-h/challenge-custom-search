import React, { useEffect, useRef, useState } from 'react';
// import MOCK_RESPONSE from '../../services/mock-response.json';
import { search, searchByPage } from '../../services/services';
import SearchItem from './components/searchItem';

export default function Search() {
    const [text, setText] = useState('');
    const [results, setResults] = useState<any>({});
    // console.log(MOCK_RESPONSE);
    const isTimerRunning = useRef(false);
    const timer = useRef<any>(null);

    useEffect(() => {
        function startTimer() {
            timer.current = setTimeout(() => {
                search(text)
                    .then(x => {
                        setResults(x);
                    })
            }, 1000);
            isTimerRunning.current = true;
        }

        function isBlank(str: string) {
            return (!str || /^\s*$/.test(str));
        }

        if (isBlank(text)) {
            clearTimeout(timer.current);
            setResults({});
        }
        if (isTimerRunning.current) {
            clearTimeout(timer.current);
            isTimerRunning.current = false;
        }
        else if (!isBlank(text)) {
            startTimer();
        }

    }, [text])


    function handlePrePageClick() {
        const searchTerms = results.queries.previousPage[0].searchTerms;
        const startIndex = results.queries.previousPage[0].startIndex;
        searchByPage(searchTerms, startIndex)
            .then(x => {
                setResults(x);
            })
    }

    function handleNextPageClick() {
        const searchTerms = results.queries.nextPage[0].searchTerms;
        const startIndex = results.queries.nextPage[0].startIndex;
        searchByPage(searchTerms, startIndex)
            .then(x => {
                setResults(x);
            })
    }

    return (
        <div>
            <div>
                <input type="text" value={text} onChange={e => setText(e.target.value)} />
                {Object.keys(results).length !== 0 && (+results.searchInformation.totalResults > 10) &&
                    <div>
                        <button disabled={!results.queries.hasOwnProperty('previousPage')} onClick={handlePrePageClick}>{`<`}</button>
                        <button disabled={!results.queries.hasOwnProperty('nextPage')} onClick={handleNextPageClick}>{`>`}</button>
                    </div>}
            </div>
            {(Object.keys(results).length !== 0) && <div>
                <span>{`About ${results.searchInformation.formattedTotalResults} results (${results.searchInformation.formattedSearchTime} seconds)`}</span>
                <div>
                    {results.items.map((item: any, index: number) =>
                        <SearchItem
                            key={index}
                            link={item.link}
                            displayLink={item.displayLink}
                            title={item.title}
                            htmlSnippet={item.htmlSnippet}
                        />
                    )}
                </div>
            </div>}
        </div>
    )
}
