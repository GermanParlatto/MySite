import React from "react"
import { Helmet } from "react-helmet"
import { useLocation } from "@reach/router"
import { useStaticQuery, graphql } from "gatsby"

const Head = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            description
            image
            siteUrl
            title
          }
        }
      }
    `
  )

  const { pathname } = useLocation()
  const { title, description, siteUrl, image } = site.siteMetadata

  const seo = {
    title: title,
    description: description,
    url: `${siteUrl}${pathname}`,
    image: `${siteUrl}${image}`,
  }

  return (
    <Helmet title={seo.title}>
      <html lang="en" />

      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />

      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={seo.image} />

      <meta
        name="google-site-verification"
        content="sm_4nGBU7oMJqjS1JazWLJzbhJqG8v2Co0MB8LL5ykU"
      />
    </Helmet>
  )
}

export default Head
