import styled from "styled-components"
import React from "react"

const StyledMain = styled.section`
    background: var(--soft-green);
    width: 100%;
    color: #fff;
    padding: 20px;
    margin-bottom: 20px;
    h1 { font-size: 50px; }
    span {
        color: var(--negro);
        font-size: 65px;
    }
    `

const Banner = () => {
    return (
        <>
            <StyledMain>
                    <h1>PC <br/><span>Master</span> <br/>Race</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt neque 
                        expedita atque eveniet <br/> quis nesciunt. Quos nulla vero consequuntur, fugit nemo ad delectus 
                    <br/> a quae totam ipsa illum minus laudantium?</p>
            </StyledMain>
        </>
    )
}

export { Banner } 