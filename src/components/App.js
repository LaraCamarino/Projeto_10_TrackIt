import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserContext from "../contexts/UserContext";

import TelaLogin from './TelaLogin';
import TelaCadastro from './TelaCadastro';
import TelaHoje from './TelaHoje';
import TelaHabitos from './TelaHabitos';
import TelaHistorico from './TelaHistorico';

export default function App() {

    const [usuario, setUsuario] = useState({});
    const [progresso, setProgresso] = useState([]);
    const [porcentagem, setPorcentagem] = useState(0);
    
    return (
        <UserContext.Provider value={{ usuario, setUsuario, progresso, setProgresso, porcentagem, setPorcentagem }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<TelaLogin />} ></Route>
                    <Route path="/cadastro" element={<TelaCadastro />} ></Route>
                    <Route path="/hoje" element={<TelaHoje />} ></Route>
                    <Route path="/habitos" element={<TelaHabitos  />} ></Route>
                    <Route path="/historico" element={<TelaHistorico />} ></Route>
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}