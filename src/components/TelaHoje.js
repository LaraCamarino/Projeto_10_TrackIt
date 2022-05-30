import axios from "axios";
//import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import styled from "styled-components";

import UserContext from "../contexts/UserContext";

import Topo from "./Topo";
import Menu from "./Menu";

export default function TelaHoje() {
    
    return (
        <>
            <Topo />
            <Container>

                <CaixaDia>
                    <h1>Dia da Semana</h1>
                    <p>Nenhum hábito concluído ainda</p>
                </CaixaDia>

                </Container>
            <Menu />
        </>
    )
}

const Container = styled.div`
    height: 100vh;
    background-color: #E5E5E5;
    margin: 75px 0px;
    padding: 28px 18px;
`

const CaixaDia = styled.div`
    margin-bottom: 28px;
    h1 {
        color: #126BA5;
        font-size: 23px;
        margin-bottom: 5px;
    }
    p {
        color: #BABABA;
        font-size: 18px;
        /* quando selecionado tiver mais que 0 habitos, deve ficar #8FC549 */
    }
`

const CaixaHabito = styled.div`
    height: 94px;
    background-color: #FFFFFF;
    border-radius: 5px;
    padding: 13px 15px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2 {
        color: #666666;
        font-size: 20px;
        margin-bottom: 7px;
    }
    p {
        color: #666666;
        font-size: 12px;
    }
`

const CheckMark = styled.div`
    width: 69px;
    height: 69px;
    border-radius: 5px;
    background-color: #EBEBEB;
    /* quando selecionado bkc #8FC549 */
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: 35px;
        height: 28px;
    }
`