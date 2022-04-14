import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      purple: string;
      blue: string;
      gray: string;
      green: string;
      lightGreen: string;
      darkGray: string;
      primary: string;
      secondary: string;
      tertiary: string;
      divider: string;
      themeIcon: string;
      fontColor: string;
    };

    margins: {
      sm: string;
      base: string;
      lg: string;
      xl: string;
    };

    paddings: {
      sm: string;
      base: string;
      lg: string;
      xl: string;
    };

    fonts: {
      family: {
        base: string;
        title: string;
      };
      size: {
        sm: string;
        base: string;
        lg: string;
        xl: string;
        title: string;
      };
      weight: {
        light: number;
        normal: number;
        bold: number;
      };
    };

    size: {
      mobile: string;
      tablet: string;
      desktop: string;
    };

    // 미디어 쿼리의 중복 코드를 줄이기위해 정의된 변수입니다
    device: {
      mobile: string;
      tablet: string;
      desktopL: string;
    };

    transitionTime: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
  }
}
