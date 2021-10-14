import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import {getCookie} from '../components/cookie';
import axios from "axios";
import io from "../api/socket";

import Btn from "../components/Btn";
import Popup from "../components/popup";

const Conatiner = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
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

const StatusSpan = styled.div`
    position: absolute;
    top: 10%;
    width: 100%;
    font: 24px/65px Apple SD Gothic Neo L;
    color: black;
    text-align: center;
    line-height: 0%;
    word-break: break-all;
`;
const LocSpan = styled.span`
    color: #3BCD94;
    font: 26px/65px Apple SD Gothic Neo M;
`;

const Main: React.FC = () => {
    const [isLogin, setIsLogin] = useState(false);

    const [popupOn, setPopupOn] = useState(false);

    const [name, setName] = useState("");
    const [loc, setLoc] = useState("");


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

        axios.post('/api/mySpot')
        .then((data: any) => {
            setName(data.data['name']);
            setLoc(data.data['loc']);
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
            setLoc("교실");
        })
        .catch(err => {
            if(err.response.data.msg) alert(err.response.data.msg);
            console.log(err);
        });
    }


    const setNowLocation = (field: any, reason: any) => {
        switch(field) {
            case 'wb':
                setLoc("물,화장실");
                break;
            case 'club':
                setLoc(`동아리 ${reason}`);
                break;
            case 'as':
                setLoc(`방과후 ${reason}`);
                break;
            case 'etc':
                setLoc(reason);
                break;
        }
    }


    const openModal = () => {
        setPopupOn(true);
    }
    const closeModal = () => {
        setPopupOn(false);
    }

    return (
        <Conatiner>
            <StatusSpan>
                {name}님은 현재<br/><LocSpan>{loc}</LocSpan>에 있습니다
            </StatusSpan>
            {
                isLogin ? (
                    <Box>
                        <FieldBox onClick={openModal}><Btn msg="외출" borderColor="#3BCD94" /></FieldBox>
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
            <Popup
                popupOn={popupOn}
                onClose={closeModal}
                setNowLocation={setNowLocation}
            />
        </Conatiner>
    );
}

export default Main;