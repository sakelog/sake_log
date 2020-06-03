import * as React from "react"

import { Link, graphql, useStaticQuery } from "gatsby"

//Components
import HeaderCatList from "./header-cat-list"

const Header = () => {
  const data = useStaticQuery(
    graphql`
      query Compheader{
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  const SiteTitle = data.site.siteMetadata.title
  return(
    <nav
      className="sl-nav-bar"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="grid">
        <div className="col-2_md-12 sl-nav-title-wrapper">
          <Link to="/" className="sl-nav-title">
            <span>{SiteTitle}</span>
          </Link>
        </div>
        <div className="col-10_md-12 sl-nav-menu">
          <HeaderCatList />
          <div className="grid-4-spaceBetween">
            <div className="col_sm-12">
              <Link to="/tags/" className="nav-link">
                #タグ一覧
              </Link>
            </div>
            <div className="col_sm-12">
              <Link to="/about_this_site/" className="nav-link">
                このサイトについて
              </Link>
            </div>
            <div className="col_sm-12">
              <Link to="/privacy/" className="nav-link">
                プライバシーポリシー
              </Link>
            </div>
            <div className="col_sm-12">
              <Link to="/contact/" className="nav-link">
                お問い合わせ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header