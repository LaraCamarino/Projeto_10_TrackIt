import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

import { ThreeDots } from 'react-loader-spinner';
import Logo from "../assets/logo.png"

export default function TelaCadastro() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [cadastro, setCadastro] = useState({
        email: "",
        senha: "",
        nome: "",
        foto: "",
    });

    function fazerCadastro() {
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up";
        
        if (cadastro.email.length > 0 && cadastro.senha.length > 0 && cadastro.nome.length > 0 && cadastro.foto.length > 0) {
            setLoading(true);
            const promise = axios.post(URL, {
                email: cadastro.email,
                name: cadastro.nome,
                image: cadastro.foto,
                password: cadastro.senha
            });
            promise.then(response => {
                navigate("/");
            })
            promise.catch(err => {
                alert(err.response.data.message);
                console.log(err.response);
                setCadastro({
                    email: "",
                    senha: "",
                    nome: "",
                    foto: "",
                });
                setLoading(false);
            })

        } else { alert("Preencha todos os campos.") }
    }

    function montarFormulario() {
        if (!loading) {
            return (
                <>
                    <input type="email" placeholder="email" value={cadastro.email} onChange={(e) => setCadastro({ ...cadastro, email: e.target.value })} ></input>
                    <input type="password" placeholder="senha" value={cadastro.senha} onChange={(e) => setCadastro({ ...cadastro, senha: e.target.value })} ></input>
                    <input type="text" placeholder="nome" value={cadastro.nome} onChange={(e) => setCadastro({ ...cadastro, nome: e.target.value })} ></input>
                    <input type="text" placeholder="foto" value={cadastro.foto} onChange={(e) => setCadastro({ ...cadastro, foto: e.target.value })} ></input>
                    <button onClick={fazerCadastro}>Cadastrar</button>
                </>
            )
        }
        else {
            return (
                <>
                    <input type="email" placeholder="email" value={cadastro.email} onChange={(e) => setCadastro({ ...cadastro, email: e.target.value })} disabled={true}></input>
                    <input type="password" placeholder="senha" value={cadastro.senha} onChange={(e) => setCadastro({ ...cadastro, senha: e.target.value })} disabled={true}></input>
                    <input type="text" placeholder="nome" value={cadastro.nome} onChange={(e) => setCadastro({ ...cadastro, nome: e.target.value })} disabled={true}></input>
                    <input type="text" placeholder="foto" value={cadastro.foto} onChange={(e) => setCadastro({ ...cadastro, foto: e.target.value })} disabled={true}></input>
                    <button onClick={fazerCadastro} disabled={true}><ThreeDots width={51} height={13} color="#FFFFFF" /></button>
                </>
            )
        }
    }


    return (
        <Container>
            <img src={Logo} alt=""></img>

            {montarFormulario()}

            <StyledLink to="/">
                Já tem uma conta? Faça login!
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

    input {
        width: 303px;
        height: 45px;
        border-radius: 5px;
        border: 1px solid #D4D4D4;   
        margin-bottom: 5px;
    }

    &::placeholder {
        color: #DBDBDB;
        font-size: 20px;
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

const StyledLink = styled(Link)`
    color: #52B6FF;
`