import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const BannerCard = ({ imagen, descripcion, estiloColor}) => (
    <div className="relative text-center mx-auto">
      <FontAwesomeIcon className="absolute left-full h-30" icon={imagen} style={estiloColor} />
      <p>{descripcion}</p>
    </div>
);

export {BannerCard}