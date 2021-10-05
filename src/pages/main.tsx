import React, {useRef, useEffect} from "react";
import styled from "@emotion/styled";

import Btn from "../components/Btn";

import * as CONF from "../api/env";

const Conatiner = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Box = styled.div`
    width: 100%;
    height: 70%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
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
            <Box>
                <FieldBox onClick={() => {window.location.href="/register"}}><Btn msg="회원가입" borderColor="#18C2BA" /></FieldBox>
                <FieldBox onClick={() => {window.location.href="/outing"}}><Btn msg="외출" borderColor="#3BCD94" /></FieldBox>
                <FieldBox onClick={comeback}><Btn msg="복귀" borderColor="#A5A5A5" id="comeback" /></FieldBox>
                <FieldBox onClick={() => {window.location.href="/status/16"}}><Btn msg="현황보기" borderColor="#A5A5A5" /></FieldBox>
            </Box>
            <Frame ref={FrameRef}></Frame>
        </Conatiner>
    );
}

export default Main;