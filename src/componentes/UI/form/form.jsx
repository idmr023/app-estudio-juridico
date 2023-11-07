import styled from "styled-components"

const FormContainer = styled.div`
    max-width: 400px;
    width: 100%;
    margin-top: 20px;
    display: inline-flex;
    align-items: center;
    margin: 0 auto;
    @media (max-width: 1000px){
        display: block;
}
`

const Formulario = styled.form`
    color: #fff;
    width: 100%;
    background: linear-gradient(to top, rgba(0,0,0,0.8)50%,rgba(0,0,0,0.8)50%);
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    `

const FrmInput = styled.input`
    height: 35px;
    background: transparent;
    border-bottom: 1px solid #fff;
    border-top: none;
    border-right: none;
    border-left: none;
    color: #fff;
    font-size: 15px;
    letter-spacing: 1px;
    margin-top: 15px;
    outline: none;
`

export {FormContainer, Formulario , FrmInput} 