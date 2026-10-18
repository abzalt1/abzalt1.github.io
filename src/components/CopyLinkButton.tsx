'use client';

import { useState } from 'react';

export default function CopyLinkButton({ path }: { path: string }) {
    const [copied, setCopied] = useState(false);

    const handleClick = async () => {
        const url = `${window.location.origin}${path}`;
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard can be blocked (e.g. in-app browsers); fall back to the native share sheet.
            navigator.share?.({ url }).catch(() => {});
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className="inline-flex items-center gap-2 text-sm font-bold uppercase px-4 py-3 border border-black/15 hover:bg-black/5 transition-colors rounded-full whitespace-nowrap"
        >
            {copied ? <>Скопировано <i className="ri-check-line"></i></> : <>Ссылка <i className="ri-link"></i></>}
        </button>
    );
}
