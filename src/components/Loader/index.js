import React, { useState, useEffect, useCallback } from "react"
import { Helmet } from "react-helmet"
import PropTypes from "prop-types"
import anime from "animejs"
import styled from "styled-components"

const StyledLoader = styled.div`
  ${({ theme }) => theme.mixins.flexCenter};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: var(--dark-navy);
  z-index: 99;

  .logo-wrapper {
    width: max-content;
    max-width: 100px;
    transition: var(--transition);
    opacity: ${props => (props.isMounted ? 1 : 0)};
    svg {
      display: block;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      fill: none;
      user-select: none;
      #B {
        opacity: 0;
      }
    }
  }
`

const IconLoader = () => (
  <svg
    id="logo"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 110 150.73"
  >
    <path
      stroke="currentColor"
      d="M103.29,46a53.62,53.62,0,0,1,38.12,15.88,4,4,0,0,1-5.66,5.66A46,46,0,1,0,98.18,145.7h.11a1,1,0,0,0,.67-.25,1,1,0,0,0,.33-.75V100a4,4,0,0,1,4-4h25a29,29,0,0,1,0,58h-20a1,1,0,0,0-1,1v35.72a4,4,0,0,1-8,0v-36a1,1,0,0,0-.91-1A54,54,0,0,1,103.29,46m5,100h20.35a21,21,0,0,0-.35-42h-20a1,1,0,0,0-1,1v40a1,1,0,0,0,1,1m-5-101a55,55,0,0,0-5,109.77v36a5,5,0,0,0,10,0V155h20a30,30,0,0,0,0-60h-25a5,5,0,0,0-5,5v44.71A45,45,0,1,1,135,68.24a5,5,0,0,0,7.08-7.07A54.58,54.58,0,0,0,103.29,45Zm5,100V124.75a1.21,1.21,0,0,0,0-.19V105h20a20,20,0,0,1,.34,40H108.29Z"
      transform="translate(-48.29 -44.99)"
    />
  </svg>
)

const Loader = ({ finishLoading }) => {
  const [isMounted, setIsMounted] = useState(false)

  const finishLoadingCallback = useCallback(finishLoading, [finishLoading])

  const animate = () => {
    const loader = anime.timeline({
      complete: () => finishLoadingCallback(),
    })

    loader
      .add({
        targets: "#logo path",
        delay: 300,
        duration: 1500,
        easing: "easeInOutSine",
        strokeDashoffset: [anime.setDashoffset, 0],
      })
      // .add({
      //   targets: "#logo #B",
      //   duration: 700,
      //   easing: "easeInOutQuart",
      //   opacity: 1,
      // })
      // .add({
      //   targets: "#logo",
      //   delay: 500,
      //   duration: 300,
      //   easing: "easeInOutQuart",
      //   opacity: 0,
      //   scale: 0.1,
      // })
      .add({
        targets: ".loader",
        duration: 200,
        easing: "easeInOutQuart",
        opacity: 0,
        zIndex: -1,
      })
  }
  const animateUseCallback = useCallback(animate, [finishLoadingCallback])

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10)
    animateUseCallback()
    return () => clearTimeout(timeout)
  }, [animateUseCallback])

  return (
    <StyledLoader className="loader" isMounted={isMounted}>
      <Helmet bodyAttributes={{ class: `hidden` }} />

      <div className="logo-wrapper">
        <IconLoader />
      </div>
    </StyledLoader>
  )
}

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
}

export default Loader
