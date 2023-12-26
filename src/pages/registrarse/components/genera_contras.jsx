import Card from 'react-bootstrap/Card';    
import styled from 'styled-components';
import { BotonSbt, BotonSbt2 } from '../../../componentes/UI/Botones/';
import { FrmInput, Formulario } from '../../../componentes/UI/Form';

function encriptar(){
    let texto = document.getElementById('input__msj').value.toString();
    texto = texto.replace(/e/g, "enter").replace(/i/g, "imes").replace(/a/g, "ai").replace(/o/g, "ober").replace(/u/g, "ufat");
    
    document.getElementById('mostrar_texto').value = texto;
    document.getElementById('input__msj').value = " ";
    }
        
function desencriptar(texto){
    return texto.replace(/enter/g, "e").replace(/imes/g, "i").replace(/ai/g, "a").replace(/ober/g, "o").replace(/ufat/g, "u");
}
        
function procesarDesenscriptar(){
    let texto = document.getElementById('mostrar_texto').value;
    let salida = document.getElementById('input__msj');

    let resultado = desencriptar(texto);
    salida.value = resultado;

    document.getElementById('mostrar_texto').value = " ";
}
        
const copiarAlPortapapeles = (id_elemento) => {
    var aux = document.createElement("input");
    aux.setAttribute("value", document.getElementById(id_elemento).value);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
};

const Contenedor = styled.div`
    position: fixed;
    right: 5%;
    bottom: 13%;
    @media (max-width: 768px) {
        position: absolute;
        right: 0;
        bottom: 0;
    }
`

const Contenido = () => {

    return (
        <>
        <Contenedor>
            <Formulario style={{ width: '18rem'}} >
                <Card.Body>
                    <Card.Text as="section">
                            <FrmInput type="text" placeholder="Texto a encriptar" id="input__msj" name="input__msj" required autoFocus /> <br/>
                            <span style={{ fontSize: '16px'}} >Sólo letras minúsculas y sin acentos</span>
                            <BotonSbt onClick={encriptar}>Encriptar</BotonSbt>
                            <div>
                                <FrmInput type="text" placeholder="Texo encriptado" id="mostrar_texto" name="mostrar_texto"/>
                                <BotonSbt2 onClick={() => copiarAlPortapapeles('mostrar_texto')}>Copiar</BotonSbt2>
                                <BotonSbt onClick={procesarDesenscriptar}>Desencriptar</BotonSbt>
                            </div>

                    </Card.Text>
                </Card.Body>
            </Formulario>
        </Contenedor>
        </>
    )
}
export default Contenido