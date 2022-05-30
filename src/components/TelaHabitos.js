import axios from "axios";
//import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";


import Topo from "./Topo";
import Menu from "./Menu";

export default function TelaHabitos() {

    return (
        <>
            <Topo />
            <Container>
                <CaixaTopo>
                    <h1>Meus hábitos</h1>
                    <button>+</button>
                </CaixaTopo>
                
                <CaixaHabitos>

                </CaixaHabitos>
            </Container>
            <Menu />
        </>
    )
}

const Container = styled.div`
    margin: 75px 0px;
    padding: 28px 18px;
`

const CaixaTopo = styled.div`
    margin-bottom: 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    h1 {
        color: #126BA5;
        font-size: 23px;
    }

    button {
        width: 40px;
        height: 35px;
        border-radius: 4.64px;
        border: 0px;
        background-color: #52B6FF;
        font-size: 27px;
        color: #FFFFFF;
    }
`

const CaixaHabitos = styled.div`
    font-size: 18px;
    color: #666666;
`

const MeuHabito = styled.div`
    border-radius: 5px;
    background-color: #FFFFFF;
    margin-bottom: 10px;
    padding: 15px;
    position: relative;

    h1 {
        font-size: 20px;
        margin-bottom: 8px;
    }
`
const Dias = styled.div`
    display: flex;
    flex-direction: row;
`

const Dia = styled.button`
    width: 30px;
    height: 30px;
    border-radius: 5px;
    margin-right: 5px;
    font-size: 20px;
    background-color: ${props => !props.selecionado ? "#FFFFFF" : "#CFCFCF"};
    border: 1px solid ${props => !props.selecionado ? "#D4D4D4" : "#CFCFCF"};;
    color: ${props => !props.selecionado ? "#DBDBDB" : "#FFFFFF"};
`

const Deletar = styled.div`
    width: 13px;
    height: 15px;
    position: absolute;
    right: 0;
    top: 0;
    margin: 11px;
`