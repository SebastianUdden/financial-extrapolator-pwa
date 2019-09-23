import React from "react"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { SVG } from "../components/svg/svg"
import { rocket } from "../svgs/rocket.js"
import { rocketColored } from "../svgs/rocketColored.js"

const P = styled.p``

const SVGWrapper = styled.div`
  padding: 0;
  margin: 0;
`

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hey buddy!</h1>
    <P>
      This will be the base of many awesome apps, enjoy your{" "}
      <SVG {...rocket} size={18} color="#fff" /> below...
    </P>
    <SVGWrapper>
      <SVG {...rocketColored} size={240} />
    </SVGWrapper>
  </Layout>
)

export default IndexPage
