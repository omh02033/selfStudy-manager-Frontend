import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import api from "../api/api";
import io from "../api/socket";

const Conatiner = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Form = styled.div`
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
const BtnBox = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;
`;
const SubBtn = styled.input`
    width: 40%;
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

const Manager: React.FC = () => {
    const [number, setNumber] = useState("");
    const [reason, setReason] = useState("");
    
    useEffect(() => {
        api.post('/api/getClassNum')
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

    const etcSubmit = () => {
        if(!number || !reason) {
            alert("필드를 확인해주세요");
            return;
        }
        if(reason.length > 5) {
            alert("사유는 5글자 이내로 해주세요");
            return;
        }
        api.post('/api/etcManage', {
            number: number.padStart(2, '0'),
            reason
        })
        .then((data: any) => {
            io.emit('outing', data.data.socketData);
            setNumber("");
            setReason("");
        })
        .catch(err => {
            console.log(err);
            alert("에러가 발생하였습니다.");
        });
    }
    const backSubmit = () => {
        if(!number) {
            alert("필드를 확인해주세요");
            return;
        }
        api.post('/api/etcComeback', {
            number: number.padStart(2, '0'),
        })
        .then((data: any) => {
            io.emit('comeback', data.data.socketData);
            setNumber("");
            setReason("");
        })
        .catch(err => {
            console.log(err);
            alert("에러가 발생하였습니다.");
        });
    }

    return (
        <Conatiner>
            <Form>
                <Input type="text" placeholder="번호" onChange={e => setNumber(e.target.value)} value={number} />
                <Input type="text" placeholder="사유" onChange={e => setReason(e.target.value)} value={reason} />
                <BtnBox>
                    <SubBtn type="button" onClick={etcSubmit} value="추가" />
                    <SubBtn type="button" onClick={backSubmit} value="복귀" />
                </BtnBox>
            </Form>
        </Conatiner>
    );
}

export default Manager;