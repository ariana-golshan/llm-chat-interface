import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

const isPersian = (text) => /[\u0600-\u06FF]/.test(text);

function MarkdownRenderer({ content }) {
  return (
    <ReactMarkdown
      components={{
        // Paragraphs
        p: ({ children }) => {
          const text = children.join ? children.join("") : children;
          return (
            <p
              className={`${
                isPersian(text) ? "font-vazir" : "font-sans"
              } text-gray-800 leading-relaxed mb-2`}
            >
              {children}
            </p>
          );
        },

        // Inline + block code
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <div className="bg-[#fafafa] text-gray-900 rounded-xl overflow-x-auto p-4 pb-0.5 my-4">
              <SyntaxHighlighter
                style={oneLight}
                language={match[1]}
                PreTag="div"
                customStyle={{ background: "transparent", margin: 0 }}
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code
              className="bg-gray-200 rounded-[4px] px-1.5 py-[3px] font-mono text-sm"
              {...props}
            >
              {children}
            </code>
          );
        },

        // Headings
        h1: ({ children }) => (
          <h1 className="text-2xl font-bold text-gray-900 mt-8 mb-3">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-lg font-medium text-gray-700 mt-8 mb-3">
            {children}
          </h3>
        ),

        // Lists
        ul: ({ children }) => (
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside space-y-1 text-gray-700">
            {children}
          </ol>
        ),

        // Links
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 hover:underline"
          >
            {children}
          </a>
        ),

        // Table
        table: ({ ...props }) => (
          <table className="chat-table" dir="auto" {...props} />
        ),
        thead: ({ ...props }) => <thead {...props} />,
        th: ({ ...props }) => <th {...props} />,
        td: ({ ...props }) => <td {...props} />,
        tbody: ({ ...props }) => <tbody {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

export default MarkdownRenderer;
