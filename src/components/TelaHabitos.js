import styled from "styled-components";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";

import Topo from "./Topo";
import Menu from "./Menu";
import CriarHabito from "./CriarHabito";
import Trash from "../assets/trash.png";


export default function TelaHabitos() {
    const { usuario } = useContext(UserContext);
    const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
    const config = {
        headers: {
            "Authorization": `Bearer ${usuario.token}`
        }
    };

    const [abrir, setAbrir] = useState(false);
    const [meusHabitos, setMeusHabitos] = useState([]);
    const [novoHabito, setNovoHabito] = useState("");

    function pegarHabitos() {
        const promise = axios.get(URL, config);

        promise.then((response) => {
            setMeusHabitos(response.data);
        });
        promise.catch((err) => console.log(err.response));
    }

    function abrirCaixa() {
        setAbrir(true);
    }

    useEffect(() => pegarHabitos(), []);


    function ListarHabitos() {

        function Habito({ nome, id, dias }) {
            const semana = [
                { dia: "D", selecionado: "" },
                { dia: "S", selecionado: "" },
                { dia: "T", selecionado: "" },
                { dia: "Q", selecionado: "" },
                { dia: "Q", selecionado: "" },
                { dia: "S", selecionado: "" },
                { dia: "S", selecionado: "" },
            ]

            function deletarHabito(id) {
                if (window.confirm("Você deseja realmente excluir este hábito?")) {
                    const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, config);
                    promise.then(() => pegarHabitos());
                    promise.catch((err) => console.log(err.response));
                }
            }

            function corBotoesDias() {
                for (let i = 0; i < 7; i++) {
                    if (dias.includes(i)) {
                        semana[i].selecionado = true;
                    } else {
                        semana[i].selecionado = false;
                    }
                }
                return semana;
            }

            return (
                <MeuHabito>
                    <h1>{nome}</h1>
                    <Dias>
                        {
                            corBotoesDias().map((item, index) => <Dia key={index} selecionado={item.selecionado} >{item.dia}</Dia>)
                        }
                    </Dias>
                    <Deletar>
                        <img src={Trash} alt="" onClick={() => deletarHabito(id)}></img>
                    </Deletar>
                </MeuHabito>
            )
        }

        if (meusHabitos.length === 0) {
            return (
                <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
            )
        }

        return (
            <>
                {
                    meusHabitos.map((item, index) => <Habito key={index} nome={item.name} id={item.id} dias={item.days} />)
                }
            </>
        )

    }

    return (
        <>
            <Topo />
            <Container>
                <CaixaTopo>
                    <h1>Meus hábitos</h1>
                    <button onClick={abrirCaixa}>+</button>
                </CaixaTopo>

                {
                    abrir ? <CriarHabito setAbrir={setAbrir} pegarHabitos={() => pegarHabitos()} novoHabito={novoHabito} setNovoHabito={setNovoHabito}/>
                        :
                        <></>
                }

                <CaixaHabitos>

                    <ListarHabitos />

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
        word-break: break-word;
        width: 90%;
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