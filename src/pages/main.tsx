import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import {getCookie} from '../components/cookie';
import axios from "axios";
import io from "../api/socket";

import Btn from "../components/Btn";

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

const FieldBox = styled.div`
    width: 75%;
`;

const Main: React.FC = () => {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const user = getCookie('token');
        if(user) setIsLogin(true);
        axios.post('/api/getClassNum')
        .then((data:any) => {
            io.emit('class', data.data.classNum);
        }).catch(err => {
            if(err.response.data.msg) {
                alert(err.response.data.msg);
            } else {
                console.log(err);
            }
        });
    }, []);

    const comeback = () => {
        axios.post('/api/comeback')
        .then((data:any) => {
            io.emit("comeback", data.data.socketData);
        })
        .catch(err => {
            if(err.response.data.msg) alert(err.response.data.msg);
            console.log(err);
        });
    }

    return (
        <Conatiner>
            {
                isLogin ? (
                    <Box>
                        <FieldBox onClick={() => {window.location.href="/outing"}}><Btn msg="외출" borderColor="#3BCD94" /></FieldBox>
                        <FieldBox onClick={comeback}><Btn msg="복귀" borderColor="#A5A5A5" id="comeback" /></FieldBox>
                        <FieldBox onClick={() => {window.location.href="/status/16"}}><Btn msg="현황보기" borderColor="#A5A5A5" /></FieldBox>
                    </Box>
                ) : (
                    <Box>
                        <FieldBox onClick={() => {window.location.href="/login"}}><Btn msg="로그인" borderColor="#18C2BA" /></FieldBox>
                        <FieldBox onClick={() => {window.location.href="/status/16"}}><Btn msg="현황보기" borderColor="#A5A5A5" /></FieldBox>
                    </Box>
                )
            }
        </Conatiner>
    );
}

export default Main;