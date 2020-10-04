import React, { useState } from 'react';
import { mockComponent } from 'react-dom/test-utils';
import MOCK_RESPONSE from '../../services/mock-response.json';

export default function Search() {
    const [text, setText] = useState('');
    console.log(MOCK_RESPONSE);

    function createMarkup(expression: string) {
        return { __html: expression };
    }

    return (
        <div>
            <div>
                <input type="text" value={text} onChange={e => setText(e.target.value)} />
            </div>
            <div>
                <span>{`About ${MOCK_RESPONSE.searchInformation.formattedTotalResults} results (${MOCK_RESPONSE.searchInformation.formattedSearchTime} seconds)`}</span>
                <div>
                    {MOCK_RESPONSE.items.map(item =>
                        <div key={item.cacheId}>
                            <a href={item.link}>
                                <span>{item.displayLink}</span>
                                <h3>{item.title}</h3>
                            </a>
                            <p dangerouslySetInnerHTML={createMarkup(item.htmlSnippet)} /> {/* must use DOMPurify library for care about XSS attack  */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
