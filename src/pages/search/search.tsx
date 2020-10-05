import React, { useEffect, useRef, useState } from 'react';
// import MOCK_RESPONSE from '../../services/mock-response.json';
import { search } from '../../services/services';

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
            }, 2000);
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

    return (
        <div>
            <div>
                <input type="text" value={text} onChange={e => setText(e.target.value)} />
            </div>
            {(Object.keys(results).length !== 0) && <div>
                <span>{`About ${results.searchInformation.formattedTotalResults} results (${results.searchInformation.formattedSearchTime} seconds)`}</span>
                <div>
                    {results.items.map((item: any) =>
                        <div key={item.cacheId}>
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
