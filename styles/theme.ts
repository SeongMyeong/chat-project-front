import { DefaultTheme } from 'styled-components';

const margins = {
  sm: '.5rem',
  base: '1rem',
  lg: '2rem',
  xl: '3rem'
};

const paddings = {
  sm: '.5rem',
  base: '1rem',
  lg: '2rem',
  xl: '3rem'
};

const fonts = {
  family: {
    base: ` 나눔스퀘어, 'NanumSquare','Noto Sans KR', sans-serif`,
    title: `'Merriweather', serif`
  },
  size: {
    sm: '1.4rem',
    base: '1.6rem',
    lg: '2rem',
    xl: '2.5rem',
    title: '6rem'
  },
  weight: {
    light: 100,
    normal: 400,
    bold: 700
  }
};

const colors = {
  purple: '#8661de',
  blue: '#00bac7',
  gray: '#f6f6f6',
  green: '#07b495',
  lightGreen: '#99ecdd',
  darkGray: '#54595d',
  themeIcon: '#1fab89'
};

const size = {
  mobile: '425px',
  tablet: '768px',
  desktop: '1440px'
};

// 미디어 쿼리의 중복 코드를 줄이기위해 정의된 변수입니다
const device = {
  mobile: `@media only screen and (max-width: ${size.mobile})`,
  tablet: `@media only screen and (max-width: ${size.tablet})`,
  desktopL: `@media only screen and (max-width: ${size.desktop})`
};

const transitionTime = {
  primary: '0.5',
  secondary: '1.0',
  tertiary: '1.5'
};
//테마에 따라 다른 값을 갖는 색상 값입니다
const lightThemeColors = {
  ...colors,
  primary: '#fff',
  secondary: '#f8f9fa',
  tertiary: '#808080',
  divider: 'rgba(106, 115, 125, 0.3)',
  themeIcon: '#1fab89',
  fontColor: 'black'
};

const darkThemeColors = {
  ...colors,
  primary: 'black',
  secondary: '#212529',
  tertiary: '#d4d0c4',
  divider: 'rgba(255, 255, 255, 0.6)',
  themeIcon: '#FBE302',
  fontColor: 'white'
};

// 테마와 관련없이 공통으로 사용되는 변수들입니다
const defalutTheme = {
  margins,
  paddings,
  size,
  fonts,
  device,
  transitionTime
};

// 각 테마는 공통 변수와 함께, 각기 다른 색상 값들을 갖습니다.
export const darkTheme: DefaultTheme = {
  ...defalutTheme,
  colors: darkThemeColors
};

export const lightTheme: DefaultTheme = {
  ...defalutTheme,
  colors: lightThemeColors
};
