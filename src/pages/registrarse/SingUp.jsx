import React, {useState} from "react";
import styled from "styled-components";
import Contenido from "./components/genera_contras";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validation } from "./components/SingUpValidation";
import { BotonSbt, BotonSbt2 } from "../../componentes/UI/form/botones";
import { FormContainer, Formulario, FrmInput } from "../../componentes/UI/form/form";

const StyledContent = styled.div`
    text-align: center;
    color: #fff;
    background-color: var(--soft-grey);
    h1{
        font-size: 50px;
        padding-left: 20px;
        letter-spacing: 2px;
    }
    span{
        color: var(--black);
        font-size: 65px;
    }
`
const TextSyled = styled.p`
    padding-left: 20px;
    padding-bottom: 25px;
    letter-spacing: 1.2px;
    line-height: 30px;
    color: #000;
`
const SingUp = () => {
    const [mostrarHijo, setMostrarHijo] = useState(false);
    
    const navigate = useNavigate()

    const toggleHijo = () => {
        setMostrarHijo(!mostrarHijo);
    };

    const [values, setValues] = useState({
        name: '',
        email: '',
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
        axios.post('http://localhost:3001/api/signup', values)
            .then(res =>     {
                navigate("/login")
            })
            .catch(err => console.log(err.response.data))
        if(errors.name === "" && errors.email === "" && errors.password === ""){
            
        }
    }
    
    return (
        <StyledContent>
            <div>
                <h1>Banco <br/><span>Chanchito</span> <br/>UTP</h1>
                <TextSyled>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt neque 
                expedita atque eveniet <br/> quis nesciunt. Quos nulla vero consequuntur, fugit nemo ad delectus 
                <br/> a quae totam ipsa illum minus laudantium?</TextSyled>
            </div>
            
            <FormContainer>
                    
                <Formulario>
                    <h3>¡Registrese y sea parte de la mejor banca del país!</h3>
                    <Form.Label htmlFor="nombre">Nombres</Form.Label>
                    <FrmInput type="text" id="nombre" name="name" onChange={handleInput}/><br/>
                    {errors.name && <span className="text-danger">{errors.name}</span>}<br/>
                    
                    <Form.Label htmlFor="correo">Correo</Form.Label>
                    <FrmInput type="email" id="correo" name="email" onChange={handleInput}/><br/>
                    {errors.email && <span className="text-danger">{errors.email}</span>}<br/>

                    <Form.Label htmlFor="dni">DNI</Form.Label>
                    <FrmInput type="number" id="dni" name="dni"  maxLength="8" onChange={handleInput}/><br/>
                    {errors.dni && <span className="text-danger">{errors.dni}</span>}<br/>

                    <Form.Label htmlFor="contraseña">Contraseña</Form.Label>
                    <FrmInput type="password" name="password" minLength="8" onChange={handleInput}/><br/>
                    {errors.password && <span className="text-danger">{errors.password}</span>}<br/>
            
                    <BotonSbt type="submit" onClick={handleSubmit}>Registarse</BotonSbt> <br/>
                    
                    <BotonSbt2 type="button" onClick={toggleHijo}>Generar contraseña segura</BotonSbt2>
                </Formulario>
                    {mostrarHijo && <Contenido/>}
                
            </FormContainer>
            <hr/>
        </StyledContent>
        )
}

export {SingUp}