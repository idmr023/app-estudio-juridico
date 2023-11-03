import React, {useState} from "react";
import styled from "styled-components";
import Contenido from "./components/genera_contras";
import { Button } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { validation } from "./components/LoginValidation";


const StyledContent = styled.div`
    max-width: 4600px;
    width: 100%;
    height: auto;
    margin: auto;
    color: #fff;
    margin-bottom: 40px;
    background-color: var(--soft-green);
    text-align: center;
    margin: 0 auto;
`
const TextSyled = styled.p`
    padding-left: 20px;
    padding-bottom: 25px;
    letter-spacing: 1.2px;
    line-height: 30px;
    color: #000;
`

const H1Styled = styled.h1`
    font-size: 50px;
    padding-left: 20px;
    letter-spacing: 2px;
`

const SpanStyled = styled.span`
    color: var(--black);
    font-size: 65px;
`

const FormContainer = styled.div`
    margin-top: 20px;
    display: inline-flex;
    align-items: center;
    margin: 0 auto;
    color: #fff;
    @media (max-width: 1000px){
        display: block;
    }
    `

const Form = styled.form`
    max-width: 450px;
    width: 100%;
    background: linear-gradient(to top, rgba(0,0,0,0.8)50%,rgba(0,0,0,0.8)50%);
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    padding: 20px;
    border-radius: 10px;
    margin-right: 20px;
`

const FrmInput = styled.input`
    height: 35px;
    background: transparent;
    border-bottom: 1px solid #ff7200;
    border-top: none;
    border-right: none;
    border-left: none;
    color: #fff;
    font-size: 15px;
    letter-spacing: 1px;
    margin-top: 15px;
`

const Registrase = () => {
    let navigate = useNavigate()

    const [values, setValues] = useState({
        dni: '',
        password: ''
    })

    const [errors, setErrors] = useState({});

    const handleInput = ({target}) => {
        const {name, value} = target
        setValues(prev =>({ ...prev, [name] : [value]}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validation(values));
        axios.post('/api/login', values)
        .then(res => {
            if(res.data === "Exito"){
                navigate('/');
            }else{
                alert("No existe")
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <StyledContent>
            <div>
                <H1Styled>Banco <br/><SpanStyled>Chanchito</SpanStyled> <br/>UTP</H1Styled>
                <TextSyled>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt neque 
                expedita atque eveniet <br/> quis nesciunt. Quos nulla vero consequuntur, fugit nemo ad delectus 
                <br/> a quae totam ipsa illum minus laudantium?</TextSyled>
            </div>
            
            <FormContainer>
                    
                <Form id="formulario__login" action="" onSubmit={handleSubmit}>
                    <h3>Iniciar sesión</h3>
                    <hr/>                 

                    <FrmInput 
                        type="number" 
                        id="dni" 
                        name="dni"  
                        maxLength="8"
                        placeholder="DNI"
                        onChange={handleInput} 
                    /><br/>
                    {errors.dni && <span className="text-danger">{errors.dni}</span>}
                    
                    <FrmInput 
                        type="password" 
                        id="password" 
                        name="password"
                        placeholder="Contraseña"
                        onChange={handleInput}
                    /> <br/><br/>
                    {errors.password && <span className="text-danger">{errors.password}</span>}
                    <br/>
                    <Button type="submit" variant="light">Iniciar sesión</Button>
                    <Button variant="light"><Link to="/registrarse">Registrarse</Link></Button>
                </Form>
                
            </FormContainer>
            <hr/>
        </StyledContent>
        )
}

export default Registrase