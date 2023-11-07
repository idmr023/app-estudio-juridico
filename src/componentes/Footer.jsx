import styled from "@emotion/styled"

const StyledFooter = styled.footer`
    display: block;
    justify-content: space-between;
    background: var(--soft-green);
    padding: 60px 0 30px 0;
    width: 100%;
}
    .container__footer{
        border-bottom: 1px solid #ccc;
        justify-content: space-between;
        display: flex;
        flex-wrap: wrap;
        text-align: center;
    }
    .container__footer .content-foo .nosotros a{
        color: #000;
    }
    .container__footer div{
        margin: 0 20px 0 20px ;
    }

    .content-foo h4{
        border-bottom: 3px solid var(--soft-red);
        padding-bottom: 5px;
        margin-bottom: 10px;
    }

    .titulo-final{
        text-align: center;
        font-size: 24px;
        margin: 20px 0 0 0;
    }
`

export default function Footer() {
    return (
        <StyledFooter>
                <div className="container__footer">
                    <div className="content-foo">
                        <h4>Nosotros</h4>
                        <ul className="nosotros">
                            <li><a className = "sub" href="ayuda.php">Ayuda</a></li>
                            <li><a className = "sub" href="nosotros.php">Nosotros</a></li>
                        </ul>
                    </div>

                    <div className="content-foo">
                        <h4>Email</h4>
                        <p>Bancoutp@utp.edu.pe</p>
                    </div>
                    
                    <div className="content-foo">
                        <h4>Ubicanos</h4>
                        <p>Av. Arequipa</p>
                    </div>
                
                    <div className="content-foo">
                        <h4>Numero de Contacto</h4>
                        <p>+54 945 875 635</p>
                    </div>
                </div>

                <h2 className="titulo-final">&copy; | Banco Chanchito UTP </h2>
        
        </StyledFooter>
    )
}