import React, { useEffect, useRef } from "react"
import { srConfig, email } from "../../../config"
import { sr } from "../../../utils"
import { usePrefersReducedMotion } from "../../../hooks"
import { StyledContactSection } from "./style"

const Contact = () => {
  const revealContainer = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }

    sr.reveal(revealContainer.current, srConfig())
  }, [prefersReducedMotion])

  return (
    <section id="contact" ref={revealContainer} className="container">
      <StyledContactSection className="content">
        <h2 className="numbered-heading overline">What’s Next?</h2>

        <h2 className="title">Get In Touch</h2>

        <p>
          My inbox is always open. Whether you have a question or just want to
          say hi, I'll do my best to get back to you!
        </p>

        <a className="email-link" href={`mailto:${email}`}>
          Say Hello
        </a>
      </StyledContactSection>
    </section>
  )
}

export default Contact
