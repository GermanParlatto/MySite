const gatsby_plugin_google_gtag = {
  resolve: `gatsby-plugin-google-gtag`,
  options: {
    // You can add multiple tracking ids and a pageview event will be fired for all of them.
    trackingIds: [
      "G-QM69N8SPHE", // Google Analytics / GA
    ],
    // This object is used for configuration specific to this plugin
    pluginConfig: {
      // Puts tracking script in the head instead of the body
      head: false,
    },
  },
}
const siteUrl = `https://www.germanparlatto.com`

const gatsby_plugin_sitemap = {
  resolve: "gatsby-plugin-sitemap",
  options: {
    query: `
        {
          allSitePage {
            nodes {
              path
            }
          }
          site {
            buildTime
            siteMetadata {
              siteUrl
            }
          }
        }
      `,
    resolveSiteUrl: ({ site }) => site.siteMetadata.siteUrl,
    resolvePages: ({ allSitePage: { nodes: allPages }, site }) => {
      // return allPages.map(page => {
      //   return { ...page }
      // })

      const home = {
        path: "/",
        lastmod: site.buildTime,
        changefreq: "daily",
        priority: 0.3,
      }

      return [home]
    },
    serialize: ({ path, changefreq, priority, lastmod }) => {
      return {
        url: path,
        lastmod,
        changefreq,
        priority,
      }
    },
  },
}

module.exports = {
  siteMetadata: {
    title: `German Parlatto`,
    description: `German Parlatto is a Front-End Developer with over 7 years experience.`,
    siteUrl: "https://www.germanparlatto.com",
    image: "/home.png",
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: "src/images/logo_v1.png", // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: "my-site-gatsby",
        protocol: "https",
        hostname: "www.germanparlatto.com",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
    },
    gatsby_plugin_google_gtag,
    `gatsby-plugin-robots-txt`,
    gatsby_plugin_sitemap,
  ],
}
