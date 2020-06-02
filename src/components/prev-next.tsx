import * as React from "react"
import { Link } from "gatsby"

interface PrevNextType {
  prev?:{
    fields:{
      slug:string,
    },
    frontmatter:{
      title:string,
    },
  },
  next?:{
    fields:{
      slug:string,
    },
    frontmatter:{
      title:string,
    },
  }
}

const PrevNext = ({ prev, next }:PrevNextType) => {
  return (
    <nav>
      <div className="grid-2-middle_sm-1">
        <div className="col-6_sm-12 grid">
          <div className="col-2">
            {prev && (
              <div className="pagination-pn">
                <span>前</span>
              </div>
            )}
          </div>
          <div className="col-10">
            {prev && (
              <Link to={prev.fields.slug} rel="prev">
                {prev.frontmatter.title}
              </Link>
            )}
          </div>
        </div>
        <div className="col-6_sm-12 grid-right">
          <div className="col-10">
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title}
              </Link>
            )}
          </div>
          <div className="col-2">
            {next && (
              <div className="pagination-pn">
                <span>次</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default PrevNext