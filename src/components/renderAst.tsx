import * as React from "react"
const rehypeReact = require("rehype-react")

// component再定義
const RenderAst = new rehypeReact({
createElement: React.createElement,
components: {
    table: (props: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableElement> & React.TableHTMLAttributes<HTMLTableElement>) => {
    return (
        <div className="sl-responsive-table">
            <table {...props}></table>
        </div>
    )
    },
    blockquote: (props: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLElement> & React.BlockquoteHTMLAttributes<HTMLElement>) => {
    return <blockquote className="blockquote" {...props}></blockquote>
    },
    img: (props: JSX.IntrinsicAttributes  & React.ImgHTMLAttributes<HTMLElement>) => {
        return <img loading="lazy" {...props} />
    },
},
}).Compiler

export default RenderAst