import { createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body{
        margin: 0 auto;
        text-align: center;
        background-color: #17181A;
    }
    h1,h2,h3,h4,h5,h6{
        font-family: 'Montserrat', sans-serif;
    }
    a, tr,td, span, strong, input, select, textarea, ul, li, label{
        font-family: 'Onest', sans-serif;
    }
    :root{
        --azul: #0B006C;
        --rosado: #ff4081;
        --amarillo: #ffd500;
        --verde-claro: #00e676;
        --morado: #6200ea;
        --blanco: #fff;
        --negro: #000;
    }
`

export { GlobalStyle };