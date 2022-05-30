import { useState, useContext } from "react";
import styled from "styled-components";

import UserContext from "../contexts/UserContext";


export default function Topo() {
    const { usuario } = useContext(UserContext);

    return (
        <Container>
            <h1> TrackIt</h1>
            <img src={usuario.image} alt=""></img>
        </Container>
    )
}

const Container = styled.div`
    width: 100vw;
    height: 70px;
    padding: 10px 18px;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
        
    h1 {
        font-size: 38px;
        color: #FFFFFF;
        font-family: 'Playball', cursive;
    }

    img {
        width: 51px;
        height: 51px;
        border-radius: 50%;
        background-color: white;
    }
    
`


