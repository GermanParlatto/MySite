import React, { useEffect, useRef } from "react"
import { StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"
import { srConfig } from "../../../config"
import sr from "../../../utils/sr"
import { usePrefersReducedMotion } from "../../../hooks"

const StyledAbout = styled.div`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: "▹";
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      background: transparent;
      outline: 0;

      &:after {
        top: 15px;
        left: 15px;
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }
  }
`

const About = () => {
  const revealContainer = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }

    sr.reveal(revealContainer.current, srConfig())
  }, [prefersReducedMotion])

  const skills = [
    "JavaScript (ES6+)",
    "Node.js",
    "React",
    "GraphQL",
    "Typescript",
    "Angular",
  ]

  return (
    <section id="about" ref={revealContainer} className="container">
      <StyledAbout className="content">
        <h2 className="numbered-heading">About Me</h2>

        <div className="inner">
          <StyledText>
            <div>
              <p>
                Hello! My name is German and I'm a young and pragmatic Italian
                man, eager to improve my technical and soft skills. I look
                forward to new challenges with enthusiasm, performing my best
                when working in highly dynamic environments. My interest in web
                development started back in 2015 when I decided to try to build
                my first web app!
              </p>

              <p>
                I'm a professional with an excellent work ethics and a loyal
                worker focusing on the best outcomes. I've got a strong team
                spirit and a great sense of humor. I have experience in working
                with several frameworks and libraries, including React, Next.js,
                Angular and Node.js.
              </p>

              <p>
                Here are a few technologies I've been working with recently:
              </p>
            </div>

            <ul className="skills-list">
              {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
            </ul>
          </StyledText>

          <StyledPic>
            <div className="wrapper">
              <StaticImage
                className="img"
                src="../../../images/me_v1.jpg"
                width={500}
                quality={95}
                formats={["AUTO", "WEBP", "AVIF"]}
                alt="Headshot"
              />
            </div>
          </StyledPic>
        </div>
      </StyledAbout>
    </section>
  )
}

export default About
