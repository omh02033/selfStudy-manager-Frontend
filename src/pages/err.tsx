import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    background: #e3e3e3;
    justify-content: center;
    align-items: center;
`;
const Box = styled.div`
    width: 100%;
    text-align: center;
    height: 100px;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
`;
const MainText = styled.span`
    font: 45px/65px Apple SD Gothic Neo EB;

`;
const SubText = styled.button`
    font: 20px/65px Apple SD Gothic Neo M;
    padding: 10px 50px;
    border-radius: 50px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    outline: none;
    border: none;
`;

const ErrPage: React.FC = () => {
    const GoMain = () => {
        window.location.href = '/';
    }
    return (
        <Container>
            <Box>
                <MainText>404 페이지</MainText>
                <SubText onClick={GoMain}>메인으로</SubText>
            </Box>
        </Container>
    );
}

export default ErrPage;