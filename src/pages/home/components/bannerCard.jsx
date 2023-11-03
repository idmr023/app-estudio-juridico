import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CardStyled = styled.div`
    margin: 0 auto;
    margin-top: 5px;
    text-align: center;
`

const BannerCard = ({ imagen, descripcion, estiloColor}) => (
    <CardStyled>
      <FontAwesomeIcon icon={imagen} style={estiloColor} />
      <p>{descripcion}</p>
    </CardStyled>
);



export {BannerCard}