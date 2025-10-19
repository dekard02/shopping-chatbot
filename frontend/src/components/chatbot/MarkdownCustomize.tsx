import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { Message } from '../../models';

interface MarkdownCustomizeProps {
    msg: Message
}
const MarkdownCustomize: React.FC<MarkdownCustomizeProps> = ({ msg }) => {

    return (
        <div className='overflow-x-auto w-full max-w-full'>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    table: (props: any) => (
                        <div className={`rounded-md overflow-hidden my-3 ${msg.role === 'user' ? 'bg-slate-800 text-white shadow-lg' : 'bg-white text-slate-800 shadow-sm'} max-w-full overflow-x-auto`}>
                            <table className="min-w-full table-auto border-collapse max-w-full" style={{ width: '100%' }} {...props} />
                        </div>
                    ),
                    thead: (props: any) => (
                        <thead className={`${msg.role === 'user' ? 'bg-slate-700' : 'bg-slate-100'}`} {...props} />
                    ),
                    tbody: (props: any) => <tbody {...props} />,
                    tr: (props: any) => <tr className={"odd:bg-transparent even:bg-slate-50 hover:bg-slate-100"} {...props} />,
                    th: (props: any) => (
                        <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider border-b border-slate-200" {...props} />
                    ),
                    td: (props: any) => (
                        <td className="px-4 py-2 text-sm border-b border-slate-100" {...props} />
                    ),
                    h1: (props: any) => (
                        <h1 className={`${msg.role === 'user' ? 'text-white' : 'text-slate-800'} text-xl font-bold mt-2 mb-1 pb-1 border-b ${msg.role === 'user' ? 'border-slate-600' : 'border-slate-200'}`} {...props} />
                    ),
                    h2: (props: any) => (
                        <h2 className={`${msg.role === 'user' ? 'text-white' : 'text-slate-800'} text-lg font-semibold mt-2 mb-1 pb-1 border-b ${msg.role === 'user' ? 'border-slate-600' : 'border-slate-200'}`} {...props} />
                    ),
                    h3: (props: any) => (
                        <h3 className={`${msg.role === 'user' ? 'text-white' : 'text-slate-800'} text-base font-semibold mt-2 mb-1 pb-1 border-b ${msg.role === 'user' ? 'border-slate-600' : 'border-slate-200'}`} {...props} />
                    ),
                    h4: (props: any) => (
                        <h4 className={`${msg.role === 'user' ? 'text-white' : 'text-slate-800'} text-base font-medium mt-2 mb-1 pb-1 border-b ${msg.role === 'user' ? 'border-slate-600' : 'border-slate-200'}`} {...props} />
                    ),
                    h5: (props: any) => (
                        <h5 className={`${msg.role === 'user' ? 'text-white' : 'text-slate-800'} text-sm font-medium mt-2 mb-1 pb-1 border-b ${msg.role === 'user' ? 'border-slate-600' : 'border-slate-200'}`} {...props} />
                    ),
                    h6: (props: any) => (
                        <h6 className={`${msg.role === 'user' ? 'text-white' : 'text-slate-800'} text-sm font-medium mt-2 mb-1 pb-1 border-b ${msg.role === 'user' ? 'border-slate-600' : 'border-slate-200'}`} {...props} />
                    ),
                    p: (props: any) => (
                        <p className={`${msg.role === 'user' ? 'text-white' : 'text-slate-800'} mb-3 leading-6`} {...props} />
                    ),
                    ul: (props: any) => <ul className="list-disc list-inside mb-3 ml-4" {...props} />,
                    ol: (props: any) => <ol className="list-decimal list-inside mb-3 ml-4" {...props} />,
                    li: (props: any) => <li className="mb-1" {...props} />,
                    code: (props: any) => (
                        <code className={`rounded px-1 py-0.5 text-sm ${msg.role === 'user' ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-900'}`} {...props} />
                    ),
                    pre: (props: any) => (
                        <pre className={`rounded-md p-3 my-2 overflow-auto ${msg.role === 'user' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-900'}`} {...props} />
                    ),
                    blockquote: (props: any) => (
                        <blockquote className={`border-l-4 pl-3 italic my-3 ${msg.role === 'user' ? 'border-slate-600 text-slate-100' : 'border-slate-300 text-slate-700'}`} {...props} />
                    ),
                    a: (props: any) => (
                        <a className={`underline ${msg.role === 'user' ? 'text-blue-300' : 'text-blue-600'}`} {...props} />
                    ),
                    hr: (props: any) => <hr className="my-3 border-slate-200" {...props} />,
                }}
            >
                {msg.content}
            </ReactMarkdown>
        </div>

    )
}

export default MarkdownCustomize