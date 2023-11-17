import React, {useState} from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { validation } from "./components/LoginValidation";
import { FormContainer, Formulario, FrmInput } from "../../componentes/UI/Form/form";
import { BotonSbt, BotonSbt2} from "../../componentes/UI/Botones/";

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

export function Login() {
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
        axios.post('http://localhost:3001/api/login', values)
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
                <h1>Bilioteca <br/><span>Lectura</span></h1>
                <TextSyled>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt neque 
                expedita atque eveniet <br/> quis nesciunt. Quos nulla vero consequuntur, fugit nemo ad delectus 
                <br/> a quae totam ipsa illum minus laudantium?</TextSyled>
            </div>
            
            <FormContainer>
                    
                <Formulario id="formulario__login" action="">
                    <h3>Iniciar sesión</h3>
                    <hr/>     

                    <FrmInput type="number" name="dni" onChange={handleInput}/><br/>
                    {errors.dni && <span className="text-danger">{errors.dni}</span>}
                    
                    <FrmInput type="password" name="password" onChange={handleInput}/>
                    {errors.password && <span className="text-danger">{errors.password}</span>}
                    <br/>
                    <BotonSbt type="submit" onClick={handleSubmit}>Iniciar sesión</BotonSbt>
                    <Link to="/registrarse"><BotonSbt2>Registrarse</BotonSbt2></Link>
                </Formulario>
                
            </FormContainer>
            <hr/>
        </StyledContent>
        )
}