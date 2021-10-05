import React, {useRef, useEffect} from "react";
import styled from "@emotion/styled";

import Btn from "../components/Btn";

import * as CONF from "../api/env";

const Conatiner = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
`;
const Button = styled.button`
    width: 80%;
    outline: none;
    font: 20px/65px Apple SD Gothic Neo M;
    color: white;
    text-align: center;
    padding: 8px;
    border-radius: 5px;
    transition: all 0.3s ease;
    position: relative;
`;
const RegisterBtn = styled(Button)`
    background: linear-gradient(255deg, #2196f3, #ff4efd);
`;
const OutingBtn = styled(Button)`
    background: linear-gradient(255deg, #03fc35, #ad03fc);
`;
const StatusBtn = styled(Button)`
    background: linear-gradient(255deg, #c2fc03, #fc8003);
`;

const Frame = styled.iframe`
    position: absolute;
    visibility: hidden;
    left: 0;
    transform: translateX(-100%);
    opacity: 0;
`;

const FieldBox = styled.div`
    width: 75%;
`;

const Main: React.FC = () => {
    const FrameRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        window.addEventListener("message", (e) => {
            console.log(e);
        })
    }, []);

    const comeback = () => {
        FrameRef.current!.src = `${CONF.API_SERVER}/get_uid?status=c&class=16`;
    }

    return (
        <Conatiner>
            <RegisterBtn>회원가입</RegisterBtn>
            <OutingBtn onClick={() => {window.location.href="/outing"}}>외출</OutingBtn>
            <FieldBox onClick={comeback}><Btn msg="복귀" borderColor="#A5A5A5" id="comeback" /></FieldBox>
            <StatusBtn>현황보기</StatusBtn>
            <Frame ref={FrameRef}></Frame>
        </Conatiner>
    );
}

export default Main;