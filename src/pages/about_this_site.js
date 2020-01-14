import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"

import Head from "../components/head"

const pageTitle = "このサイトについて"

export default ({ data }) => (
  <Layout>
    <Head
        title={pageTitle}
        description="sake logについての説明です。"
    />
    <h1 className="uk-article-title">{pageTitle}</h1>
    <h2>{data.site.siteMetadata.title}</h2>
    <p>
      当サイト「{data.site.siteMetadata.title}
      」は管理人sakeの技術メモ置き場です。
    </p>
    <p>
      特定の技術に特化しているわけではありませんが、最近の関心事はWordPressと静的HTMLジェネレータです。
    </p>
    <p>このサイトは下記のような技術で作られています。</p>
    <ul>
      <li>静的HTMLジェネレータ：GatsbyJS</li>
      <li>CSSフレームワーク：Bootstrap</li>
    </ul>

    <h2>管理人{data.site.siteMetadata.author}について</h2>
    <p>システムエンジニア歴5年。</p>
    <p>基本情報をCOBOL選択で合格したぐらいにはホスト系。</p>
    <p>
      中学生の頃からWEB制作にハマっており、中学時代の趣味は
      <a
        href="http://www.htmllint.net/html-lint/htmllint.html"
        target="blank"
      >
        Another HTML Lint
      </a>
      で100点を出すこと。
    </p>
    <h3>保有資格</h3>
    <ul>
      <li>基本情報技術者</li>
      <li>応用情報技術者</li>
      <li>Oracle認定Java Bronze SE 7/8</li>
      <li>OracleマスターBronze 12c</li>
    </ul>
  </Layout>
)

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        author
      }
    }
  }
`
