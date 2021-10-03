import React from "react";
import styled from "@emotion/styled";

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
    border: none;
    font: 18px/65px Apple SD Gothic Neo M;
    color: white;
    text-align: center;
    padding: 8px;
    border-radius: 50px;
`;
const RegisterBtn = styled(Button)`
    background: linear-gradient(255deg, #2196f3, #ff4efd);
`;
const OutingBtn = styled(Button)`
    background: linear-gradient(255deg, #0390fc, #03fc98);
`;
const ComebackBtn = styled(Button)`
    background: linear-gradient(255deg, #03fc35, #ad03fc);
`;
const StatusBtn = styled(Button)`
    background: linear-gradient(255deg, #c2fc03, #fc8003);
`;


const Main: React.FC = () => {
    return (
        <Conatiner>
            <RegisterBtn>회원가입</RegisterBtn>
            <OutingBtn>외출</OutingBtn>
            <ComebackBtn>복귀</ComebackBtn>
            <StatusBtn>현황보기</StatusBtn>
        </Conatiner>
    );
}

export default Main;