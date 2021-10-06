import React, { useEffect, useState, useRef } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import {getCookie, setCookie} from '../components/cookie';

import LoadingGif from '../stylesheets/images/loading.gif';

import dimiback from "../stylesheets/images/dimiback.svg";

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.span`
    color: black;
    padding: 0 13px;
    position: absolute;
    top: 50px;
    left: 20px;
`;
const DimiTitle = styled.span`
    font: 35px/65px Apple SD Gothic Neo B;
    border-bottom: 4px solid magenta;
    font-weight: bold;
    line-height: 100%;
    display: block;
`;
const SubTitle = styled.span`
    font: 25px/65px Apple SD Gothic Neo B;
    transform: translateY(10%);
    display: block;
    line-height: 180%;
`;

const DimiBackground = styled.img`
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: -1;
`;

const Form = styled.form`
    width: 90%;
    height: 37%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 48%;
    border-radius: 10px;
    padding: 25px 0;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;
const Input = styled.input`
    width: 80%;
    padding: 10px;
    outline: none;
    border: none;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    border-radius: 5px;
    font-family: Apple SD Gothic Neo L;
    caret-color: magenta;
`;
const SubBtn = styled.input`
    width: 80%;
    padding: 10px;
    outline: none;
    border: none;
    font-family: Apple SD Gothic Neo EB;
    font-weight: bold;
    border-radius: 10px;
    color: #F99BCA;
    background: white;
    letter-spacing: 2px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

const LoadingBox = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.8);
    transition: all 0.3s ease;
`;
const Loading = styled.img`
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    width: 50px;
`;
const NotLoading = {
    "opacity": 0,
    "zIndex": -1
}
const NowLoading = {
    "opacity": 1,
    "zIndex": 10
}

const Login: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);

    const uidRef = useRef<HTMLInputElement>(null);
    const upwRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const uid = getCookie('userid');
        if(uid) { uidRef.current!.value = uid; }
    }, []);

    const loginSubmit = (e: any) => {
        setIsLoading(true);
        e.preventDefault();
        setCookie('userid', uidRef.current!.value);
        axios.post('/api/login', {
            'uid': uidRef.current!.value,
            'pwd': upwRef.current!.value
        })
        .then((data:any) => {
            setIsLoading(false);
            setCookie('token', data.data.token);
            window.location.href = '/';
        })
        .catch(e => {
            setIsLoading(false);
            if(e.response.data.msg) {
                alert(e.response.data.msg);
            }
        });
    }

    return (
        <Container>
            <Title><DimiTitle>디미고인</DimiTitle> <SubTitle>로그인</SubTitle></Title>
            <Form action="/api/login" onSubmit={loginSubmit}>
                <Input type="text" placeholder="아이디" ref={uidRef} />
                <Input type="password" placeholder="비밀번호" ref={upwRef} />
                <SubBtn type="submit" value="로그인" />
            </Form>
            <LoadingBox style={isLoading ? NowLoading : NotLoading}>
                <Loading src={LoadingGif} />
            </LoadingBox>
            <DimiBackground src={dimiback} />
        </Container>
    );
}

export default Login;