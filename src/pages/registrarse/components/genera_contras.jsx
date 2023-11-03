import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';    
import styled from 'styled-components';

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
        
function copiarAlPortapapeles(id_elemento) {
    var aux = document.createElement("input");
    aux.setAttribute("value", document.getElementById("mostrar_texto").value);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
}

const Contenedor = styled.div`
    position: absolute;
    right: 250px;
    bottom: 180px;
`

const Contenido = () => {

    return (
        <>
        <Contenedor>
            <Card style={{ width: '18rem'}} >
                <Card.Body>
                    <Card.Text>
                        <form action="">
                            <input type="text" placeholder="Texto a encriptar" id="input__msj" name="input__msj" required autoFocus />
                            <p>Sólo letras minúsculas y sin acentos</p>
                            <Button variant="primary" onClick={encriptar}>Encriptar</Button>
                            <hr/>
                            <div>
                                <input type="text" placeholder="Texo encriptado" id="mostrar_texto" name="mostrar_texto"/>
                                <Button variant="light" onClick={copiarAlPortapapeles}>Copiar</Button>
                                <Button variant="secondary" onClick={procesarDesenscriptar}>Desencriptar</Button>
                            </div>
                        </form>

                    </Card.Text>
                </Card.Body>
            </Card>
        </Contenedor>
        </>
    )
}
export default Contenido