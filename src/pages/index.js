import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import Layout from "../components/Layout"
import Home from "../components/sections/Home"
import About from "../components/sections/About"
import Experience from "../components/sections/Experience"
import Contact from "../components/sections/Contact"

const StyledMainContainer = styled.main`
  counter-reset: section;
`

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer>
      <Home />
      <About />
      <Experience />
      <Contact />
    </StyledMainContainer>
  </Layout>
)

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
}

export default IndexPage
