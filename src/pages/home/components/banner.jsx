import styled from "styled-components"
import React from "react"

const StyledMain = styled.section`
    background: var(--soft-green);
    width: 100%;
    color: #fff;
    padding: 20px;
    justify-content: space-between;
    margin: 0 auto;
    margin-bottom: 20px;
    `

const MainH1 = styled.h1`
    font-size: 50px;
`

const MainSpan = styled.span`
    color: var(--negro);
    font-size: 65px;
`

const Banner = () => {
    return (
        <>
            <StyledMain>
                    <MainH1>PC <br/><MainSpan>Master</MainSpan> <br/>Race</MainH1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt neque 
                        expedita atque eveniet <br/> quis nesciunt. Quos nulla vero consequuntur, fugit nemo ad delectus 
                    <br/> a quae totam ipsa illum minus laudantium?</p>
            </StyledMain>
        </>
    )
}

export { Banner } 