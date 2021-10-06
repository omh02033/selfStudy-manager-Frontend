import React, { useState, useEffect } from "react";
import Select from 'react-select';
import styled from "@emotion/styled";
import Btn from "../components/Btn";
import EtcBtn from "../components/EtcBtn";
import axios from "axios";
import io from '../api/socket';

const Container = styled.div`
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const BtnContainer = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
`;

const FieldBox = styled.div`
    width: 75%;
`;

const EtcSelect = styled(Select)`
    width: 75%;
`;

const Outing: React.FC = () => {
    const [etc, setEtc] = useState(false);
    const [isSelect, setIsSelect] = useState(false);
    

    useEffect(() => {
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

    const options = [
        { value: '', label: '3D 애니메이션 창작실' },
        { value: '', label: '교무실' },
        { value: '', label: 'IT프로젝트실' },
        { value: '', label: '결석' },
        { value: '', label: '과학실' },
        { value: '', label: '금요귀가' },
        { value: '', label: '다목적 학습실' },
        { value: '', label: '체육관' },
        { value: '', label: '동아리실' },
        { value: '', label: '방과후실' },
        { value: '', label: '디컨실' },
        { value: '', label: '멀티미디어실' },
        { value: '', label: '운동장' },
        { value: '', label: '외출' },
        { value: '', label: '안정실' },
        { value: '', label: '보건실' },
        { value: '', label: '방송실' },
        { value: '', label: '비즈쿨실' },
        { value: '', label: '세미나실' },
        { value: '', label: '열람실' },
        { value: '', label: '위클래스 상담실' },
        { value: '', label: '이비지니스 실습실' },
        { value: '', label: '큐브' },
        { value: '', label: '기숙사' },
        { value: '', label: '학생회 회의실' },
        { value: '', label: '학습멘토실' },
        { value: '', label: '휴머노이드 연구소' },
        { value: 'etc', label: '직접 입력' },
    ];

    const WbOut = (e: any) => {
        e.target.disabled = true;
        axios.post('/api/outing', {
            field: 'wb',
            reason: 'none'
        })
        .then((data:any) => {
            io.emit("outing", data.data.socketData);
        })
        .catch(err => {
            if(err.response.data.msg) alert(err.response.data.msg);
            console.log(err);
        });
    }
    const etcStatus = (e: any) => {
        e.target.disabled = true;
        setEtc(true);
    }
    const etcChange = (e: any) => {
        if(e.value === 'etc') {
            const reason = prompt("사유를 입력하세요.", "직접입력");
            axios.post('/api/outing', {
                field: 'etc',
                reason
            })
            .then((data:any) => {
                io.emit("outing", data.data.socketData);
            })
            .catch(err => {
                if(err.response.data.msg) alert(err.response.data.msg);
                console.log(err);
            });
        } else {
            axios.post('/api/outing', {
                field: 'etc',
                reason: e.label
            })
            .then((data:any) => {
                io.emit("outing", data.data.socketData);
            })
            .catch(err => {
                if(err.response.data.msg) alert(err.response.data.msg);
                console.log(err);
            });
        }
        setIsSelect(true);
        setEtc(false);
        setTimeout(() => {setIsSelect(false);}, 1000);
    }
    const comeback = (e: any) => {
        e.target.disabled = true;
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
        <Container>
            <BtnContainer>
                <FieldBox onClick={WbOut}><Btn borderColor="#3BCD94" id="wb" msg="물,화장실" /></FieldBox>
                <FieldBox onClick={etcStatus}><EtcBtn borderColor="#3BCD94" id="etc" isSelect={isSelect} msg="기타" /></FieldBox>
                <FieldBox onClick={comeback}><Btn borderColor="#A5A5A5" id="comeback" msg="복귀" /></FieldBox>
                {etc ? (
                    <EtcSelect options={options} onChange={etcChange} />
                ) : ('')}
            </BtnContainer>
        </Container>
    );
}

export default Outing;