import React from 'react'

interface SearchItemType {
    link: string;
    displayLink: string;
    title: string;
    htmlSnippet: string;
}

export default function SearchItem({ link, displayLink, title, htmlSnippet }: SearchItemType) {
    function createMarkup(expression: string) {
        return { __html: expression };
    }

    return (
        <div>
            <a href={link}>
                <span>{displayLink}</span>
                <h3>{title}</h3>
            </a>
            <p dangerouslySetInnerHTML={createMarkup(htmlSnippet)} /> {/* must use DOMPurify library for care about XSS attack  */}
        </div>
    )
}
