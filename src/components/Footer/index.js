import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Icon } from "../Icons"
import { socialMedia } from "../../config"
import { CSSTransition, TransitionGroup } from "react-transition-group"

const StyledFooter = styled.footer`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  height: auto;
  min-height: 70px;
  padding: 15px;
  text-align: center;
`
const StyledCredit = styled.div`
  color: var(--light-slate);
  font-family: var(--font-mono);
  font-size: var(--fz-xxs);
  line-height: 1;

  a {
    padding: 10px;
    &:hover,
    &:focus {
      transform: translateY(-3px);
    }
  }

  & > span {
    display: inline-flex;
    align-items: center;
  }
  svg {
    display: inline-block;
    margin-right: 5px;
    width: 24px;
    height: 24px;
  }
`

const Footer = () => {
  return (
    <StyledFooter>
      <StyledCredit tabindex="-1">
        {socialMedia &&
          socialMedia.map(({ name, url }, i) => (
            <TransitionGroup component={null}>
              <CSSTransition classNames="fade" timeout={0}>
                <span key={i}>
                  <a
                    href={url}
                    aria-label={name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name={name} />
                  </a>
                </span>
              </CSSTransition>
            </TransitionGroup>
          ))}
      </StyledCredit>
    </StyledFooter>
  )
}

Footer.propTypes = {
  githubInfo: PropTypes.object,
}

export default Footer
