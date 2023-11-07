import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CardStyled = styled.div`
    margin: 0 auto;
    text-align: center;
    position: relative;
    .svg-inline--fa{
      position: absolute;
      left: 110%;
      height: 30px;
    }
`

const BannerCard = ({ imagen, descripcion, estiloColor}) => (
    <CardStyled>
      <FontAwesomeIcon icon={imagen} style={estiloColor} />
      <p>{descripcion}</p>
    </CardStyled>
);

export {BannerCard}