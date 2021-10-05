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
            <FieldBox onClick={() => {window.location.href="/register"}}><Btn msg="회원가입" borderColor="#18C2BA" /></FieldBox>
            <FieldBox onClick={() => {window.location.href="/outing"}}><Btn msg="외출" borderColor="#3BCD94" /></FieldBox>
            <FieldBox onClick={comeback}><Btn msg="복귀" borderColor="#A5A5A5" id="comeback" /></FieldBox>
            <FieldBox onClick={() => {window.location.href="/status/16"}}><Btn msg="현황보기" borderColor="#A5A5A5" /></FieldBox>
            <Frame ref={FrameRef}></Frame>
        </Conatiner>
    );
}

export default Main;