import React, { useState, useEffect } from "react"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { email } from "../../../config"
import { navDelay, loaderDelay } from "../../../utils"
import { usePrefersReducedMotion } from "../../../hooks"
import { StyledHome } from "./style"
// Background image
import { getImage } from "gatsby-plugin-image"
import { BgImage } from "gbimage-bridge"
import { graphql, useStaticQuery } from "gatsby"

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  const { desktopImage } = useStaticQuery(
    graphql`
      query {
        desktopImage: file(relativePath: { eq: "galaxy_back.jpg" }) {
          childImageSharp {
            gatsbyImageData(
              width: 2560
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    `
  )
  const pluginImage = getImage(desktopImage)

  // Watch out for CSS's stacking order, especially when styling the individual
  // positions! The lowermost image comes last!
  const backgroundFluidImageStack = [
    pluginImage,
    `linear-gradient(180deg, #000a26 0%,
      rgba(0, 10, 38, 0.446161) 17.48%,
      rgba(0, 10, 38, 0.482478) 76.02%,
      #000a26 100%
    )`,
  ].reverse()

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay)
    return () => clearTimeout(timeout)
  }, [prefersReducedMotion])

  const one = <h1>Hi, my name is</h1>
  const two = <h2 className="big-heading">German Parlatto,</h2>
  const three = <h3 className="big-heading">Front-End Developer.</h3>
  const four = (
    <a href={`mailto:${email}`} className="email-link">
      Get In Touch
    </a>
  )

  const items = [one, two, three, four]

  return (
    <section>
      <BgImage image={backgroundFluidImageStack}>
        <section className="container">
          <StyledHome className="content">
            {prefersReducedMotion ? (
              <>
                {items.map((item, i) => (
                  <div key={i}>{item}</div>
                ))}
              </>
            ) : (
              <TransitionGroup component={null}>
                {isMounted &&
                  items.map((item, i) => (
                    <CSSTransition
                      key={i}
                      classNames="fadeup"
                      timeout={loaderDelay}
                    >
                      <div style={{ transitionDelay: `${i + 1}00ms` }}>
                        {item}
                      </div>
                    </CSSTransition>
                  ))}
              </TransitionGroup>
            )}
          </StyledHome>
        </section>
      </BgImage>
    </section>
  )
}

export default Hero
