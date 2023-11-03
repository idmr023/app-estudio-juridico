import React, {useState} from "react";
import styled from "styled-components";
import Contenido from "./components/genera_contras";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validation } from "./components/SingUpValidation";

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

const SingUp = () => {
    const [mostrarHijo, setMostrarHijo] = useState(false);
    
    const navigate = useNavigate()

    const toggleHijo = () => {
        setMostrarHijo(!mostrarHijo);
    };

    const [values, setValues] = useState({
        name: '',
        dni: '',
        email: '',
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
        axios.post('http://localhost:3001/api/signup', values)
            .then(res => {
                navigate("/login")
            })
            .catch(err => console.log(err))
        if(errors.name === "" && errors.email === "" && errors.password === ""){
            
        }
    }

    // const onSubmit = () => {
    //     axios.post('http://localhost:3001/api/login', body)
    //     .then(({ data }) => {
    //         localStorage.setItem('auth', 'yes'); // Cambia "'yes'" a 'yes'
    //         setIsAuthenticated(true); // Establece isAuthenticated en true
    //         navigate('/');
    //     })
    //     .catch(({ response }) => {
    //         console.log(response.data);
    //     });
    // }

    return (
        <StyledContent>
            <div>
                <H1Styled>Banco <br/><SpanStyled>Chanchito</SpanStyled> <br/>UTP</H1Styled>
                <TextSyled>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt neque 
                expedita atque eveniet <br/> quis nesciunt. Quos nulla vero consequuntur, fugit nemo ad delectus 
                <br/> a quae totam ipsa illum minus laudantium?</TextSyled>
            </div>
            
            <FormContainer>
                    
                <Form action="" onSubmit={handleSubmit}>
                    <h3>¡Registrese y sea parte de la mejor banca del país!</h3>
            
                    <label for="nombre">Nombres:</label>
                    <FrmInput type="text" id="nombre" name="name" onChange={handleInput}/><br/>
                    {errors.name && <span className="text-danger">{errors.name}</span>}<br/>
                    
                    <label for="email">Correo:</label>
                    <FrmInput type="email" id="correo" name="email" onChange={handleInput}/><br/>
                    {errors.email && <span className="text-danger">{errors.email}</span>}<br/>

                    <label for="correo">DNI:</label>
                    <FrmInput type="number" id="correo" name="dni"  maxlength="8" onChange={handleInput}/><br/>
                    {errors.dni && <span className="text-danger">{errors.dni}</span>}<br/>

                    <label for="contraseña">Contraseña:</label>
                    <FrmInput type="password" id="contraseña" name="password" minlength="8" onChange={handleInput}/><br/>
                    {errors.password && <span className="text-danger">{errors.password}</span>}<br/>

                    <FrmInput type="checkbox" name="tyc"/> Acepto los términos y condiciones<br/>
            
                    <Button type="submit" variant="light">Registarse</Button> <br/>
                    
                    <Button variant="light" onClick={toggleHijo}>Generar contraseña segura</Button>
                    {mostrarHijo && <Contenido/>}
                </Form>
                
            </FormContainer>
            <hr/>
        </StyledContent>
        )
}

export {SingUp}