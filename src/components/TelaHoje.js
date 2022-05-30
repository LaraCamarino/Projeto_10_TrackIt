import styled from "styled-components";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

import Topo from "./Topo";
import Menu from "./Menu";
import Check from "../assets/vector.png"


export default function TelaHoje() {
    const { usuario, progresso, setProgresso, setPorcentagem } = useContext(UserContext);
    const config = {
        headers: {
            "Authorization": `Bearer ${usuario.token}`
        }
    };

    const [habitosHoje, setHabitosHoje] = useState([]);

    useEffect(() => {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);

        promise.then((response) => {
            let progressoAtual = [];
            if (response.data.length > 0) {
                setHabitosHoje(response.data);
            }
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].done) {
                    progressoAtual.push(response.data[i].id);
                    setProgresso([...progressoAtual]);
                }
            }
        });
        promise.catch((err) => console.log(err.response));

    }, []);

    function HabitoHoje({ id, name, done, currentSequence, highestSequence }) {
        const [atualIgualRecorde, setAtualIgualRecorde] = useState(false);


        function marcarHabito(id) {
            if (!done) {
                const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, null, config)

                promise.then(() => {
                    recarregarHabitosHoje();
                    setProgresso([...progresso, id]);
                });
                promise.catch((err) => console.log(err.response));
            }
            else {
                const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, null, config);

                promise.then(() => {
                    recarregarHabitosHoje();
                    setProgresso(progresso.filter((item) => item !== id));
                });
                promise.catch((err) => console.log(err.response));
            }
        }
        function recarregarHabitosHoje() {
            const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);

            promise.then((response) => {
                setHabitosHoje(response.data);
            });
            promise.catch((err) => console.log(err.response));
        }
        function conferirIgualdade() {
            if (currentSequence === highestSequence && highestSequence !== 0 && done) {
                setAtualIgualRecorde(true);
            }
        }

        useEffect(() => conferirIgualdade(), []);

        return (
            <CaixaHabito>
                <span>
                    <h2>{name}</h2>
                    <SequenciaAtual done={done}>Sequência atual:<p>{currentSequence} dias</p> </SequenciaAtual>
                    <SeuRecorde recorde={atualIgualRecorde} >Seu recorde:<p>{highestSequence} dias</p> </SeuRecorde>
                </span>
                <CheckMark done={done} onClick={() => marcarHabito(id)}>
                    <img src={Check} alt=""></img>
                </CheckMark>
            </CaixaHabito>
        )
    }


    function ListarHabitosHoje() {
        return (
            <>
                {
                    habitosHoje.map((item, index) => <HabitoHoje key={index} id={item.id} name={item.name} done={item.done} currentSequence={item.currentSequence} highestSequence={item.highestSequence} />)

                }
            </>
        )
    }

    function PorcentagemProgresso() {
        let porcento = Math.round((progresso.length / habitosHoje.length) * 100);
        setPorcentagem(porcento);
       
        if (progresso.length === 0 || isNaN(porcento)) {
            return (
                <Porcento feito={false}>Nenhum hábito concluído ainda</Porcento>
            )
        }
        return (
            <Porcento feito={true}>{porcento}% dos hábitos concluídos</Porcento>
        )
    }

    const hoje = dayjs().locale("pt-br");
    const diaDaSemana = hoje.format("dddd").charAt(0).toUpperCase() + hoje.format("dddd").slice(1);
    const diaDoMes = hoje.format("DD/MM");

    return (
        <>
            <Topo />
            <Container>

                <CaixaDia>
                    <h1>{diaDaSemana}, {diaDoMes}</h1>
                    <PorcentagemProgresso />
                </CaixaDia>

                <ListarHabitosHoje />

            </Container>
            <Menu />
        </>
    )
}

const Container = styled.div`
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
`
const Porcento = styled.p`
    color: ${props => props.feito ? "#8FC549" : "#BABABA"};
    font-size: 18px;
`

const CaixaHabito = styled.div`
    background-color: #FFFFFF;
    border-radius: 5px;
    padding: 13px 15px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
        width: 75%;
    }

    h2 {
        color: #666666;
        font-size: 20px;
        margin-bottom: 7px;
        word-break: break-word;        
    }
`

const SequenciaAtual = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 12px;
    color: #666666;

    p {
        color: ${props => props.done ? "#8FC549" : "#666666"};;
    }
`

const SeuRecorde = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 12px;
    color: #666666;

    p {
        color: ${props => props.recorde ? "#8FC549" : "#666666"};;
    }
`

const CheckMark = styled.div`
    width: 69px;
    height: 69px;
    border-radius: 5px;
    background-color: ${props => props.done ? "#8FC549" : "#EBEBEB"};
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 35px;
        height: 28px;
    }
`