import styled from "styled-components";

import Topo from "./Topo";
import Menu from "./Menu";

export default function TelaHistorico() {
    return (
        <>
            <Topo />
            <Historico>
                <h1>Histórico</h1>
                <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
            </Historico>
            <Menu />
        </>
    )
}

const Historico = styled.div`
    margin: 75px 0px;
    padding: 28px 18px;

    h1 {
        color: #126BA5;
        font-size: 23px;
        margin-bottom: 28px;
    }

    p {
        font-size: 18px;
        color: #666666;
    }
`