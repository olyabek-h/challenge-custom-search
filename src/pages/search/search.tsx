import React, { useEffect, useRef, useState } from 'react';
// import MOCK_RESPONSE from '../../services/mock-response.json';
import { search } from '../../services/services';
import Pagination from './components/pagination';
import SearchItem from './components/searchItem';

export default function Search() {
    const [text, setText] = useState('');
    const [result, setResult] = useState<any>({});
    // console.log(MOCK_RESPONSE);
    const isTimerRunning = useRef(false);
    const timer = useRef<any>(null);

    useEffect(() => {
        function startTimer() {
            timer.current = setTimeout(() => {
                search(text)
                    .then(x => {
                        setResult(x);
                    })
            }, 1000);
            isTimerRunning.current = true;
        }

        function isBlank(str: string) {
            return (!str || /^\s*$/.test(str));
        }

        if (isBlank(text)) {
            clearTimeout(timer.current);
            setResult({});
        }
        if (isTimerRunning.current) {
            clearTimeout(timer.current);
            isTimerRunning.current = false;
        }
        else if (!isBlank(text)) {
            startTimer();
        }

    }, [text])


    function handlePrePageClick(prePageResult: any) {
        setResult(prePageResult);
    }

    function handleNextPageClick(nextPageResult: any) {
        setResult(nextPageResult);
    }

    return (
        <div>
            <div>
                <input type="text" value={text} onChange={e => setText(e.target.value)} />
                <Pagination
                    isVisible={Object.keys(result).length !== 0 && (+result.searchInformation.totalResults > 10)}
                    queries={result.queries}
                    onPrePageClick={handlePrePageClick}
                    onNextPageClick={handleNextPageClick}
                />
            </div>
            {(Object.keys(result).length !== 0) && <div>
                <span>{`About ${result.searchInformation.formattedTotalResults} results (${result.searchInformation.formattedSearchTime} seconds)`}</span>
                <div>
                    {result.items.map((item: any, index: number) =>
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
