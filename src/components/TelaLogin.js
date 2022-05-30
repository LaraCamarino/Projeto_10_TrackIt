import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import styled from "styled-components";

import UserContext from "../contexts/UserContext";

import { ThreeDots } from 'react-loader-spinner';
import Logo from "../assets/logo.png"

export default function TelaLogin() {
    const navigate = useNavigate();
    const { setUsuario } = useContext(UserContext);

    const [loading, setLoading] = useState(false);
    const [login, setLogin] = useState({
        email: "",
        senha: ""
    });

    function fazerLogin() {
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";

        if (login.email.length > 0 && login.email.length > 0) {
            setLoading(true);
            const promise = axios.post(URL, {
                email: login.email,
                password: login.senha
            });

            promise.then(response => {
                setUsuario(response.data);
                navigate("/hoje");
            })

            promise.catch(err => {
                alert(err.response.data.message);
                console.log(err.response);
                setLogin({
                    email: "",
                    senha: ""
                });
                setLoading(false);
            })
        }
        else { alert("Preencha todos os campos.") }
    }

    function montarFormulario() {
        if (!loading) {
            return (
                <>
                    <Input type="email" placeholder="email" value={login.email} onChange={(e) => setLogin({ ...login, email: e.target.value })} ></Input>
                    <Input type="password" placeholder="senha" value={login.senha} onChange={(e) => setLogin({ ...login, senha: e.target.value })}></Input>
                    <button onClick={fazerLogin}>Entrar</button>
                </>
            )
        }
        else {
            return (
                <>
                    <Input type="email" placeholder="email" value={login.email} onChange={(e) => setLogin({ ...login, email: e.target.value })} disabled={true} ></Input>
                    <Input type="password" placeholder="senha" value={login.senha} onChange={(e) => setLogin({ ...login, senha: e.target.value })} disabled={true} ></Input>
                    <button onClick={fazerLogin} disabled={true} ><ThreeDots width={51} height={13} color="#FFFFFF" /></button>
                </>
            )
        }
    }

    return (
        <Container>
            <img src={Logo} alt=""></img>

            {montarFormulario()}

            <StyledLink to="/cadastro">
                Não tem uma conta? Cadastre-se!
            </StyledLink>
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #FFFFFF;

    img {
        margin-bottom: 35px;
    }

    button {
        width: 303px;
        height: 45px;
        background-color: #52B6FF;
        border-radius: 5px;
        border: 0px;
        font-size: 20px;
        color: #FFFFFF;
        margin-bottom: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`
const Input = styled.input`
    width: 303px;
    height: 45px;
    border-radius: 5px;
    border: 1px solid #D4D4D4;   
    padding: 10px;
    margin-bottom: 5px;
    font-size: 18px;

    ::placeholder {
        color: #DBDBDB;
        font-size: 18px;
    }
`

const StyledLink = styled(Link)`
    color: #52B6FF;
`