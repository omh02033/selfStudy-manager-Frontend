import { useState, useEffect } from "react";
import Select from 'react-select';
import styled from "@emotion/styled";
import Btn from "../components/Btn";
import EtcBtn from "../components/EtcBtn";
import api from "../api/api";
import io from '../api/socket';

import closePng from '../stylesheets/images/close.png'


const Blinder = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    background: (0,0,0,0);
    z-index: -1;
    transition: all 0.5s ease;
    left: 0;
    top: 0;
`;
const Container = styled.div`
    background: white;
    border-radius: 10px;
    overflow: auto;
    width: 0%;
    height: 0%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: all 0.3s ease;
`;

const BtnContainer = styled.div`
    width: 100%;
    height: 75%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    position: relative;
`;

const FieldBox = styled.div`
    width: 75%;
`;

const EtcSelect = styled(Select)`
    width: 75%;
`;

const CloseBox = styled.button`
    position: absolute;
    transform: translate(-50%, -50%);
    right: 0px;
    top: 20px;
    width: 20px;
    height: 20px;
    outline: none;
    background: none;
    border: none;
`;
const CloseImg = styled.img`
    width: 100%;
    height: 100%;
`;

const PopupOn = {
    background: "rgba(0,0,0,0.5)",
    zIndex: 10,
    opacity: 1
}
const PopupClose = {
    background: "rgba(0,0,0,0)",
    zIndex: -1,
    opacity: 0
}

const ContainerOn = {
    width: "95%",
    height: "80%"
}
const ContainerClose = {
    width: "0%",
    height: "0%"
}

const Popup = ({popupOn, onClose, setNowLocation}: any) => {
    const [etc, setEtc] = useState(false);
    const [club, setClub] = useState(false);
    const [aftershool, setAs] = useState(false);
    
    const [isEtcSelect, setIsEtcSelect] = useState(false);
    const [isClubSelect, setIsClubSelect] = useState(false);
    const [isAsSelect, setIsAsSelect] = useState(false);
    

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
    const clubOptions = [
        { value: '', label: '1실' },
        { value: '', label: '2실' },
        { value: '', label: '3실' },
        { value: '', label: '4실' },
        { value: '', label: '5실' },
        { value: '', label: '6실' },
        { value: 'etc', label: '직접 입력' }
    ];
    const asOptions = [
        { value: '', label: '1실' },
        { value: '', label: '2실' },
        { value: '', label: '3실' },
        { value: 'etc', label: '직접 입력' }
    ];

    const WbOut = (e: any) => {
        e.target.disabled = true;
        api.post('/api/outing', {
            field: 'wb',
            reason: 'none'
        })
        .then((data:any) => {
            io.emit("outing", data.data.socketData);
            setNowLocation('wb', 'none');
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
    const clubStatus = (e: any) => {
        e.target.disabled = true;
        setClub(true);
    }
    const afterSchoolStatus = (e: any) => {
        e.target.disabled = true;
        setAs(true);
    }

    const setReason = (e: any, field: string) => {
        if(e.value === 'etc') {
            const reason = prompt("사유를 입력하세요. (5글자 이내)", "직접입력");
            if(reason) {
                if(reason.length < 6) {
                    api.post('/api/outing', {
                        field,
                        reason
                    })
                    .then((data:any) => {
                        io.emit("outing", data.data.socketData);
                        setNowLocation(field, reason);
                    })
                    .catch(err => {
                        if(err.response.data.msg) alert(err.response.data.msg);
                        console.log(err);
                    });
                } else alert("사유는 5글자 이하로 적어주세요");
            }
        } else {
            api.post('/api/outing', {
                field,
                reason: e.label
            })
            .then((data:any) => {
                io.emit("outing", data.data.socketData);
                setNowLocation(field, e.label);
            })
            .catch(err => {
                if(err.response.data.msg) alert(err.response.data.msg);
                console.log(err);
            });
        }
    }

    const etcChange = (e: any) => {
        setReason(e, 'etc');
        setIsEtcSelect(true);
        setEtc(false);
        setTimeout(() => {setIsEtcSelect(false);}, 1000);
    }
    const clubChange = (e: any) => {
        setReason(e, 'club');
        setIsClubSelect(true);
        setClub(false);
        setTimeout(() => {setIsClubSelect(false);}, 1000);
    }
    const asChange = (e: any) => {
        setReason(e, 'as');
        setIsAsSelect(true);
        setAs(false);
        setTimeout(() => {setIsAsSelect(false);}, 1000);
    }

    const close = () => {
        if(onClose) onClose();
    }

    return (
        <Blinder style={popupOn ? PopupOn : PopupClose}>
            <Container style={popupOn ? ContainerOn : ContainerClose}>
                <BtnContainer>
                    <FieldBox onClick={WbOut}><Btn borderColor="#3BCD94" id="wb" msg="물,화장실" /></FieldBox>
                    <FieldBox onClick={clubStatus}><EtcBtn borderColor="#3BCD94" id="club" msg="동아리" isSelect={isClubSelect} /></FieldBox>
                    {club ? (
                        <EtcSelect options={clubOptions} onChange={clubChange} isSearchable={false} />
                    ) : ('')}
                    <FieldBox onClick={afterSchoolStatus}><EtcBtn borderColor="#3BCD94" id="as" msg="방과후" isSelect={isAsSelect} /></FieldBox>
                    {aftershool ? (
                        <EtcSelect options={asOptions} onChange={asChange} isSearchable={false} />
                    ) : ('')}
                    <FieldBox onClick={etcStatus}><EtcBtn borderColor="#3BCD94" id="etc" isSelect={isEtcSelect} msg="기타" /></FieldBox>
                    {etc ? (
                        <EtcSelect options={options} onChange={etcChange} isSearchable={false} />
                    ) : ('')}
                </BtnContainer>
                <CloseBox onClick={close}>
                    <CloseImg src={closePng} />
                </CloseBox>
            </Container>
        </Blinder>
    );
}

export default Popup;