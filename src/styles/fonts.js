import { css } from "styled-components"

import MulishRegularWoff from "../fonts/Mulish/Mulish-regular.woff"
import MulishRegularWoff2 from "../fonts/Mulish/Mulish-regular.woff2"
import MulishMediumWoff from "../fonts/Mulish/Mulish-500.woff"
import MulishMediumWoff2 from "../fonts/Mulish/Mulish-500.woff2"
import MulishSemiboldWoff from "../fonts/Mulish/Mulish-600.woff"
import MulishSemiboldWoff2 from "../fonts/Mulish/Mulish-600.woff2"

import RobotoMon0RegularWoff from "../fonts/RobotoMono/RobotoMono-regular.woff"
import RobotoMon0RegularWoff2 from "../fonts/RobotoMono/RobotoMono-regular.woff2"
import RobotoMon0SemiboldWoff from "../fonts/RobotoMono/RobotoMono-600.woff"
import RobotoMon0SemiboldWoff2 from "../fonts/RobotoMono/RobotoMono-600.woff2"

const mulishNormalWeights = {
  400: [MulishRegularWoff, MulishRegularWoff2],
  500: [MulishMediumWoff, MulishMediumWoff2],
  600: [MulishSemiboldWoff, MulishSemiboldWoff2],
}

const robotoMonoNormalWeights = {
  400: [RobotoMon0RegularWoff, RobotoMon0RegularWoff2],
  600: [RobotoMon0SemiboldWoff, RobotoMon0SemiboldWoff2],
}

const mulish = {
  name: "Mulish",
  normal: mulishNormalWeights,
}

const robotoMono = {
  name: "Roboto Mono",
  normal: robotoMonoNormalWeights,
}

const createFontFaces = (family, style = "normal") => {
  let styles = ""

  for (const [weight, formats] of Object.entries(family[style])) {
    const woff = formats[0]
    const woff2 = formats[1]

    styles += `
      @font-face {
        font-family: '${family.name}';
        src: url(${woff2}) format('woff2'),
            url(${woff}) format('woff');
        font-weight: ${weight};
        font-style: ${style};
        font-display: auto;
      }
    `
  }

  return styles
}

const mulishNormal = createFontFaces(mulish)

const robotoMonoNormal = createFontFaces(robotoMono)

const Fonts = css`
  ${mulishNormal + robotoMonoNormal}
`

export default Fonts
