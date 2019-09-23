import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import FinanceExtrapolator from "../components/finance-extrapolator/finance-extrapolator"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <FinanceExtrapolator />
  </Layout>
)

export default IndexPage
