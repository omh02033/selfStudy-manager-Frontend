import React, { useEffect, useState, useCallback } from "react";
import io from '../api/socket';
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "@emotion/styled";

import dimiback from "../stylesheets/images/dimiback.svg";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: #262626;
    color: white;
`;
const DimiBackground = styled.img`
    width: 100%;
    position: absolute;
    bottom: 0;
    opacity: 0.15;
`;

const Box = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px;
    position; relative;
    display: flex;
`;

const MemberNumContainer = styled.div`
    height: 100%;
    width: 20%;
`;
const MemberNumBox = styled.div`
    height: 100%;
    width: 100%;
    background: rgba(91, 91, 91, 0.5);
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
`;
    
const MemberTitleNumBox = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
`;
const MemberTitle = styled.span`
    font: 45px/65px Apple SD Gothic Neo B;
`;
const MemberNum = styled.span`
    font: 35px/65px Apple SD Gothic Neo M;
`;
    
const StatusContainer = styled.div`
    width: 80%;
    height: 100%;
    padding-left: 20px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`;
const WbContainer = styled.div`
    width: 100%;
    height: 49%;
    background: rgba(91, 91, 91, 0.5);
`;
const EtcContainer = styled.div`
    width: 100%;
    height: 49%;
    background: rgba(91, 91, 91, 0.5);
`;

const OutTitle = styled.div`
    width: 100%;
    padding: 5px;
    font: 40px/65px Apple SD Gothic Neo B;
    text-align: center;
    margin-bottom: 10px;
`;

const MemberBox = styled.div`
    width: 100%;
    font: 35px/65px Apple SD Gothic Neo M;
    padding: 10px 20px;
    word-break: break-all;
`;
const Member = styled.span`
    padding: 15px;
`;

    
type param = {
    roomid: string
};

interface out {
    classNum: string
    serial: string
    number: string
    fields: string
    reason: string
    status?: string
    id?: number
}
interface comeback {
    classNum: string
    serial: string
}


const Mbox = ({title, pers}:any) => {
    return (
        <MemberTitleNumBox>
            <MemberTitle>{title}</MemberTitle>
            <MemberNum>{pers}</MemberNum>
        </MemberTitleNumBox>
    )
}

const Status: React.FC = () => {
    const [totalOutMember, setTotalOutMember] = useState<out[] | []>([]);

    const [outMember, setOutMember] = useState<out[] | []>([]);
    const [etcMember, setEtcMember] = useState<out[] | []>([]);

    const [totalNum, setTotalNum] = useState(0);
    const [currentNum, setCurrentNum] = useState(0);
    const [absentNum, setAbsentNum] = useState(0);

    const { roomid } = useParams<param>();

    const addOutUser = useCallback((data:out) => {
        if(data.fields === 'etc') {
            setAbsentNum((prevNum) => {return prevNum+1;});
            setCurrentNum((prevNum) => {return prevNum-1;});
        };
        setTotalOutMember((prevList) => {
            const idx = prevList.findIndex((item) => {return item.serial === data.serial});
            if(idx > -1) prevList.splice(idx, 1);
            return [
                ...prevList,
                {
                    id: prevList.length+1,
                    ...data
                }
            ];
        });
    }, []);
    const removeOutUser = useCallback((data:comeback) => {
        setTotalOutMember((prevList) => {
            const pa = prevList;
            const idx = pa.findIndex((item) => {return item.serial === data.serial});
            if(prevList[idx].fields === 'etc') {
                setAbsentNum((prevNum) => {return prevNum-1;});
                setCurrentNum((prevNum) => {return prevNum+1;});
            };
            pa.splice(idx, 1);
            return [...pa];
        });
    }, []);

    useEffect(() => {
        axios.post('/api/prevOuting', {classNum: roomid})
        .then((data:any) => {
            for(let i=0; i<data.data['users'].length; i++) {
                data.data['users'][i]['id'] = i;
            }
            setTotalNum(data.data['totalNum']);
            setCurrentNum(data.data['totalNum'] - data.data['etcNum']);
            setAbsentNum(data.data['etcNum']);
            setTotalOutMember(data.data['users']);
        });
        io.emit('class', roomid);   // 소켓 연결
        io.on('userOut', addOutUser);
        io.on('userComeback', removeOutUser);
    }, []);

    useEffect(() => {
        setOutMember([]);
        setEtcMember([]);
        for(let i of totalOutMember) {
            if(i.fields === 'wb') {
                setOutMember((prevList) => {
                    return [
                        ...prevList,
                        i
                    ];
                });
            } else {
                setEtcMember((prevList) => {
                    return [
                        ...prevList,
                        i
                    ];
                });
            }
        }
    }, [totalOutMember, totalNum]);

    return (
        <Container>
            <Box>
                <MemberNumContainer>
                    <MemberNumBox>
                        <Mbox title="총원" pers={totalNum} />
                        <Mbox title="현원" pers={currentNum} />
                        <Mbox title="결원" pers={absentNum} />
                    </MemberNumBox>
                </MemberNumContainer>
                <StatusContainer>
                    <WbContainer>
                        <OutTitle>물, 화장실</OutTitle>
                        <MemberBox>
                            {outMember.map((data) => {
                                return <Member key={data.id}>{data.number}</Member>
                            })}
                        </MemberBox>
                    </WbContainer>
                    <EtcContainer>
                        <OutTitle>기타</OutTitle>
                        <MemberBox>
                            {etcMember.map((data) => {
                                return data.number ? <Member key={data.id}>{data.number} ({data.reason})</Member> : '';
                            })}
                        </MemberBox>
                    </EtcContainer>
                </StatusContainer>
            </Box>
            <DimiBackground src={dimiback} />
        </Container>
    );
}

export default Status;