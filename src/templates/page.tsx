import * as React from 'react'
import { graphql } from 'gatsby'

import { TempPageQuery } from '../../types/graphql-types'

// Components
import Layout from '../components/layout'
import SEO from '../components/seo'
import RenderAst from '../components/renderAst'
import BackToTopPage from '../components/back-to-top-page'

type Props = {
  data: TempPageQuery
}

const Page = ({ data }: Props) => {
  const page = data.cflPage

  const description = page.description

  return (
    <Layout>
      {SEO(page.title, description, false)}
      <div className="Article">
        <h1>{page.title}</h1>
        <hr />

        <div>
          <RenderAst {...page.body.childMarkdownRemark.htmlAst} />
        </div>
      </div>
      <BackToTopPage />
    </Layout>
  )
}

export default Page

export const pageQuery = graphql`
  query TempPage($slug: String!) {
    cflPage: contentfulPage(slug: { eq: $slug }) {
      title
      body {
        childMarkdownRemark {
          htmlAst
        }
      }
      description
    }
  }
`
