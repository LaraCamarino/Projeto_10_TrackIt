import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import UserContext from "../contexts/UserContext";

export default function Menu() {
    const { porcentagem } = useContext(UserContext);

    return (
        <Container>
            <StyledLink to="/habitos">
                <span>Hábitos</span>
            </StyledLink>
            <StyledLink to="/hoje">
                <Circulo>
                    <CircularProgressbar
                        value={porcentagem}
                        text={"Hoje"}
                        background={true}
                        backgroundPadding={6}
                        styles={buildStyles({
                            textSize: "18px",
                            textColor: "#FFFFFF",
                            pathColor: "#FFFFFF",
                            pathTransitionDuration: 0.5,
                            trailColor: "#52B6FF",
                            backgroundColor: "#52B6FF",
                        })}
                    />
                </Circulo>
            </StyledLink>
            <StyledLink to="/historico">
                <span>Histórico</span>
            </StyledLink>
        </Container>
    )
}

const Container = styled.div`
    width: 100vw;
    height: 70px;
    padding: 22px 30px;
    background-color: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    z-index: 1;

    span {
        color: #52B6FF;
        font-size: 18px;
    }
`

const Circulo = styled.div`
    width: 91px;
    height: 91px;
    margin-bottom: 50px;
`

const StyledLink = styled(Link)`
    color: #52B6FF;
    text-decoration: none;
`