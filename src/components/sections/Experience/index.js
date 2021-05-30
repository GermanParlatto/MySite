import React, { useState, useEffect, useRef } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { CSSTransition } from "react-transition-group"

import { srConfig } from "../../../config"
import { KEY_CODES, sr } from "../../../utils"
import { usePrefersReducedMotion } from "../../../hooks"
import {
  StyledHighlight,
  StyledJobsSection,
  StyledTabButton,
  StyledTabList,
  StyledTabPanels,
  StyledTabPanel,
} from "./style"

const Jobs = () => {
  const data = useStaticQuery(graphql`
    query {
      jobs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/jobs/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              company
              location
              range
              url
            }
            html
          }
        }
      }
    }
  `)

  const jobsData = data.jobs.edges

  const [activeTabId, setActiveTabId] = useState(0)
  const [tabFocus, setTabFocus] = useState(null)
  const tabs = useRef([])
  const revealContainer = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }

    sr.reveal(revealContainer.current, srConfig())
  }, [prefersReducedMotion])

  // Only re-run the effect if tabFocus changes
  useEffect(() => {
    if (tabs.current[tabFocus]) {
      tabs.current[tabFocus].focus()
      return
    }
    // If we're at the end, go to the start
    if (tabFocus >= tabs.current.length) {
      setTabFocus(0)
    }
    // If we're at the start, move to the end
    if (tabFocus < 0) {
      setTabFocus(tabs.current.length - 1)
    }
  }, [tabFocus])

  // Focus on tabs when using up & down arrow keys
  const onKeyDown = e => {
    switch (e.key) {
      case KEY_CODES.ARROW_UP: {
        e.preventDefault()
        setTabFocus(tabFocus - 1)
        break
      }

      case KEY_CODES.ARROW_DOWN: {
        e.preventDefault()
        setTabFocus(tabFocus + 1)
        break
      }

      default: {
        break
      }
    }
  }

  return (
    <section id="experience" ref={revealContainer} className="container">
      <StyledJobsSection className="content">
        <h2 className="numbered-heading">Where I’ve Worked</h2>

        <div className="inner">
          <StyledTabList
            role="tablist"
            aria-label="Job tabs"
            onKeyDown={e => onKeyDown(e)}
          >
            {jobsData &&
              jobsData.map(({ node }, i) => {
                const { company } = node.frontmatter
                return (
                  <StyledTabButton
                    key={i}
                    isActive={activeTabId === i}
                    onClick={() => setActiveTabId(i)}
                    ref={el => (tabs.current[i] = el)}
                    id={`tab-${i}`}
                    role="tab"
                    tabIndex={activeTabId === i ? "0" : "-1"}
                    aria-selected={activeTabId === i ? true : false}
                    aria-controls={`panel-${i}`}
                  >
                    <span>{company}</span>
                  </StyledTabButton>
                )
              })}
            <StyledHighlight activeTabId={activeTabId} />
          </StyledTabList>

          <StyledTabPanels>
            {jobsData &&
              jobsData.map(({ node }, i) => {
                const { frontmatter, html } = node
                const { title, url, company, range } = frontmatter

                return (
                  <CSSTransition
                    key={i}
                    in={activeTabId === i}
                    timeout={250}
                    classNames="fade"
                  >
                    <StyledTabPanel
                      id={`panel-${i}`}
                      role="tabpanel"
                      tabIndex={activeTabId === i ? "0" : "-1"}
                      aria-labelledby={`tab-${i}`}
                      aria-hidden={activeTabId !== i}
                      hidden={activeTabId !== i}
                    >
                      <h3>
                        <span>{title}</span>
                        <span className="company">
                          &nbsp;@&nbsp;
                          <a href={url} className="inline-link">
                            {company}
                          </a>
                        </span>
                      </h3>

                      <p className="range">{range}</p>

                      <div dangerouslySetInnerHTML={{ __html: html }} />
                    </StyledTabPanel>
                  </CSSTransition>
                )
              })}
          </StyledTabPanels>
        </div>
      </StyledJobsSection>
    </section>
  )
}

export default Jobs
