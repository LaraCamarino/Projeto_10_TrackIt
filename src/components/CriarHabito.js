import styled from "styled-components";
import axios from "axios";
import { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import { ThreeDots } from 'react-loader-spinner';


export default function CriarHabito({ setAbrir, pegarHabitos }) {
    const { usuario } = useContext(UserContext);
    const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
    const config = {
        headers: {
            "Authorization": `Bearer ${usuario.token}`
        }
    };

    const [diasSelecionados, setDiasSelecionados] = useState([]);
    const [novoHabito, setNovoHabito] = useState("");
    const [loading, setLoading] = useState(false);

    function botaoSalvar() {
        if (diasSelecionados.length > 0 && novoHabito.length > 0) {
            const body = {
                name: novoHabito,
                days: diasSelecionados.sort()
            };

            setLoading(true);
            const promise = axios.post(URL, body, config);

            promise.then((response) => {
                console.log(response.data);
                setLoading(false);
                setAbrir(false);
                pegarHabitos();
            });

            promise.catch((err) => {
                console.log(err.response);
                setLoading(false);
                alert("Houve um erro. Por favor, tente novamente.");
            });
        }

        if (diasSelecionados.length === 0) {
            alert("Por favor, selecione pelo menos um dia.");
        }
    }

    function botaoCancelar() {
        setAbrir(false);
    }

    return (
        <CaixaCriar>
            {
                !loading ?
                    <>
                        <Input type="text" placeholder="nome do hábito" value={novoHabito} onChange={(e) => setNovoHabito(e.target.value)}></Input>
                        <OpcoesDias>
                            <BotoesDias diasSelecionados={diasSelecionados} setDiasSelecionados={setDiasSelecionados} />
                        </OpcoesDias>
                        <Botoes>
                            <Cancelar onClick={botaoCancelar}  >Cancelar</Cancelar>
                            <Salvar onClick={botaoSalvar}>Salvar</Salvar>
                        </Botoes>
                    </>
                    :
                    <>
                        <Input disabled={true} type="text" placeholder="nome do hábito" value={novoHabito} onChange={(e) => setNovoHabito(e.target.value)}></Input>
                        <OpcoesDias>
                            <BotoesDias disabled={true} diasSelecionados={diasSelecionados} setDiasSelecionados={setDiasSelecionados} />
                        </OpcoesDias>
                        <Botoes>
                            <Cancelar disabled={true} onClick={botaoCancelar}>Cancelar</Cancelar>
                            <Salvar disabled={true} onClick={botaoSalvar}><ThreeDots width={51} height={13} color="#FFFFFF" /></Salvar>
                        </Botoes></>
            }
        </CaixaCriar>
    )
}

function Dia({ dia, numero, diasSelecionados, setDiasSelecionados, disabled }) {
    const [selecionado, setSelecionado] = useState(false);

    function selecionarDia(numero) {
        if (!selecionado) {
            setSelecionado(true);
            setDiasSelecionados([...diasSelecionados, numero]);

        }
        else {
            setSelecionado(false);
            setDiasSelecionados(diasSelecionados.filter((item) => item !== numero));
        }
    }

    return (
        <BotaoDia type="button" disabled={disabled} selecionado={selecionado} onClick={() => selecionarDia(numero)}>{dia}</BotaoDia>
    )
}

function BotoesDias({ disabled, diasSelecionados, setDiasSelecionados }) {
    const diasSemana = ["D", "S", "T", "Q", "Q", "S", "S"];

    return (
        <>
            {
                diasSemana.map((item, index) => <Dia key={index} dia={item} numero={index} diasSelecionados={diasSelecionados} setDiasSelecionados={setDiasSelecionados} disabled={disabled}/>)
            }
        </>
    )
}


const CaixaCriar = styled.div`
    height: 180px;
    border-radius: 5px;
    background-color: #FFFFFF;
    margin-bottom: 28px;
    padding: 18px;
`

const Input = styled.input`
    width: 100%;
    height: 45px;
    border-radius: 5px;
    border: 1px solid #D4D4D4;
    padding: 10px;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 18px;

    ::placeholder {
        color: #DBDBDB;
        font-size: 18px;
    }
`

const OpcoesDias = styled.div`
    margin-top: 10px;
    margin-bottom: 35px;
`

const BotaoDia = styled.button`
    width: 30px;
    height: 30px;
    border-radius: 5px;
    margin-right: 5px;
    font-size: 20px;
    background-color: ${props => !props.selecionado ? "#FFFFFF" : "#CFCFCF"};
    border: 1px solid ${props => !props.selecionado ? "#D4D4D4" : "#CFCFCF"};;
    color: ${props => !props.selecionado ? "#DBDBDB" : "#FFFFFF"};
`

const Botoes = styled.div`
    display: flex;
    justify-content: right;
`

const Cancelar = styled.button`
    padding: 7px 17px;
    font-size: 16px;
    color: #52B6FF;
    border: 0px;
    background-color: #FFFFFF;
    font-family: 'Lexend Deca', sans-serif;
`

const Salvar = styled.button`
    padding: 7px 17px;
    font-size: 16px;
    background-color: #52B6FF;
    color: #FFFFFF;
    border-radius: 5px;
    border: 0px;
    font-family: 'Lexend Deca', sans-serif;
`