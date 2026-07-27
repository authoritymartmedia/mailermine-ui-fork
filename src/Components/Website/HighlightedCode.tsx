const JS_KEYWORDS = /\b(import|from|const|let|var|await|async|function|if|return|new|export|default|class|package|func|main|use|require|def|var|using|await)\b/g;
const STRING = /('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`)/g;
const COMMENT = /(\/\/.*$|#.*$|\/\*[\s\S]*?\*\/)/gm;

function tokenizeLine(line: string): { type: string; text: string }[] {
    const tokens: { type: string; text: string }[] = [];
    let remaining = line;

    while (remaining.length > 0) {
        remaining = remaining.replace(/^\s+/, (m) => {
            tokens.push({ type: 'plain', text: m });
            return '';
        });
        if (!remaining) break;

        const comment = remaining.match(/^(\/\/.*|#.*)/);
        if (comment) {
            tokens.push({ type: 'comment', text: comment[1] });
            break;
        }

        const str = remaining.match(STRING);
        if (str && remaining.indexOf(str[0]) === 0) {
            tokens.push({ type: 'string', text: str[0] });
            remaining = remaining.slice(str[0].length);
            continue;
        }

        const kw = remaining.match(JS_KEYWORDS);
        if (kw && remaining.indexOf(kw[0]) === 0) {
            tokens.push({ type: 'keyword', text: kw[0] });
            remaining = remaining.slice(kw[0].length);
            continue;
        }

        const plain = remaining.match(/^[^\s'"]+/);
        if (plain) {
            tokens.push({ type: 'plain', text: plain[0] });
            remaining = remaining.slice(plain[0].length);
        } else {
            tokens.push({ type: 'plain', text: remaining[0] });
            remaining = remaining.slice(1);
        }
    }

    return tokens;
}

const tokenClass: Record<string, string> = {
    keyword: 'text-white',
    string: 'text-amber-400',
    comment: 'text-zinc-600',
    plain: 'text-zinc-400',
};

export function HighlightedCode({ code }: { code: string }) {
    const lines = code.split('\n');

    return (
        <div className="font-mono text-[13px] leading-6">
            {lines.map((line, i) => (
                <div key={i} className="flex">
                    <span className="integration-ln w-10 shrink-0 select-none pr-4 text-right text-zinc-700">
                        {i + 1}
                    </span>
                    <span className="min-w-0 flex-1 whitespace-pre">
                        {tokenizeLine(line).map((token, j) => (
                            <span key={j} className={tokenClass[token.type]}>
                                {token.text}
                            </span>
                        ))}
                        {line.length === 0 && '\u00A0'}
                    </span>
                </div>
            ))}
        </div>
    );
}
