import React, { useEffect, useRef, useState } from 'react';
// import MOCK_RESPONSE from '../../services/mock-response.json';
import { search, searchByPage } from '../../services/services';

export default function Search() {
    const [text, setText] = useState('');
    const [results, setResults] = useState<any>({});
    // console.log(MOCK_RESPONSE);
    const isTimerRunning = useRef(false);
    const timer = useRef<any>(null);

    function createMarkup(expression: string) {
        return { __html: expression };
    }

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


        if (isTimerRunning.current) {
            clearTimeout(timer.current);
            isTimerRunning.current = false;
        }
        else if (text !== '') {
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
                        <div key={index}>
                            <a href={item.link}>
                                <span>{item.displayLink}</span>
                                <h3>{item.title}</h3>
                            </a>
                            <p dangerouslySetInnerHTML={createMarkup(item.htmlSnippet)} /> {/* must use DOMPurify library for care about XSS attack  */}
                        </div>
                    )}
                </div>
            </div>}
        </div>
    )
}
