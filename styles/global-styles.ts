import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
    ${reset}
    :focus {
        outline: none;
        border: none;
    }

    html{
        font-size: 11px;
        -webkit-text-size-adjust: none;
        font-family: -apple-system,BlinkMacSystemFont,helvetica,Apple SD Gothic Neo,sans-serif;       
        font-display: fallback;

    }
 
    body {
        font-family: ${(props) => props.theme.fonts.family.base};
        font-weight: ${(props) => props.theme.fonts.weight.normal};
        font-size: ${(props) => props.theme.fonts.size.base};
        background: ${(props) => props.theme.colors.primary};  
        transition: 0.4s background;
    }
     

   
`;
