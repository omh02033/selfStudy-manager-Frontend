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
    padding: 65px;
    position; relative;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`;

const TopBox = styled.div`
    width: 100%;
    height: 16%;
    border-radius: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: rgba(91, 91, 91, 0.5);
`;

const BTitle = styled.span`
    font: 33px/65px Apple SD Gothic Neo M;
    line-height: 120%;
`;
const SubTitle = styled.span`
    font: 16px/65px Apple SD Gothic Neo M;
    line-height: 120%;
    color: #bababa;
`;

const BSBOX = styled.div`
    display: flex;
    flex-direction: column;
    height: 50%;
    align-items: center;
    justify-content: center;
`;

const TimeBox = styled(BTitle)`
    display: block;
    width: 8%;
`;

const StatusContainer = styled.div`
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const StatusBox = styled.div`
    height: 50%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
`;


const Board = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: space-between;
`;

const StatusBoard = styled.div`
    width: 23%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const StatusTitle = styled(BTitle)`
    display: block;
    height: 10%;
    width: 100%;
    line-height: 200%;
`;
const StatusMemberBoard = styled.div`
    border-radius: 20px;
    background: rgba(91, 91, 91, 0.5);
    width: 100%;
    height: 96%;
    padding: 15px;
`;

const MemberColumn = styled.div`
    width: 100%;
    justify-content: space-around;
    padding: 0 10px;
    display: flex;
`;
const MemberBox = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 10px;
`;
const MemberName = styled.span`
    font: 21px/65px Apple SD Gothic Neo M;
    line-height: 120%;
`;
const MemberSerial = styled.span`
    font: 19px/65px Apple SD Gothic Neo L;
    line-height: 120%;
    color: #bababa;
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
    name: string
    status?: string
    id?: number
}
interface comeback {
    classNum: string
    serial: string
}


const SBox = ({title, num}:any) => {
    return (
        <StatusBox>
            <BTitle>{num}</BTitle>
            <SubTitle>{title}</SubTitle>
        </StatusBox>
    )
}

const SelfStudyTimeTable: any = {
    "방과후 1타임" : "17:10 ~ 17:55",
    "방과후 2타임" : "17:55 ~ 18:35",
    "저녁시간" : "18:35 ~ 19:50",
    "야자 1타임" : "19:50 ~ 21:30",
    "야자 2타임" : "21:30 ~ 22:50",
    "야자 종료" : "야자종료",
    "자습시간 아님": "작동시간 : 17:10 ~",
    "로딩중": "Loading.."
}

const Status: React.FC = () => {
    const [totalOutMember, setTotalOutMember] = useState<out[] | []>([]);

    const [outMember, setOutMember] = useState<out[] | []>([]);    // wb member
    const [clubMember, setClubMember] = useState<out[] | []>([]);  // club member
    const [asMember, setAsMember] = useState<out[] | []>([]);      // after school member
    const [etcMember, setEtcMember] = useState<out[] | []>([]);    // etc member

    const [outMemberList, setOutMemberList] = useState<any[][] | []>([]);
    const [clubMemberList, setClubMemberList] = useState<any[][] | []>([]);
    const [asMemberList, setAsMemberList] = useState<any[][] | []>([]);
    const [etcMemberList, setEtcMemberList] = useState<any[][] | []>([]);


    const [totalNum, setTotalNum] = useState(0);
    const [currentNum, setCurrentNum] = useState(0);
    const [absentNum, setAbsentNum] = useState(0);

    const [Timer, setTimer] = useState("00:00:00");
    const [TimeTable, setTimeTable] = useState("로딩중");

    const [teacherName, setTeacherName] = useState("로딩중");
    const [classNum, setClassNum] = useState("0학년 0반");

    const { roomid } = useParams<param>();


    const nowTime = () => {
        const today = new Date();

        const hours = today.getHours();
        const minutes = today.getMinutes();
        const seconds = today.getSeconds();

        const now = Number(`${String(hours).padStart(2, '0')}${String(minutes).padStart(2, '0')}`);

        if(now < 1710) setTimeTable("자습시간 아님");
        else if(now >= 1710 && now <= 1755) setTimeTable("방과후 1타임");
        else if(now > 1755 && now <=1835) setTimeTable("방과후 2타임");
        else if(now > 1835 && now <=1950) setTimeTable("저녁시간");
        else if(now > 1950 && now <= 2130) setTimeTable("야자 1타임");
        else if(now > 2130 && now <= 2250) setTimeTable("야자 2타임");
        else if(now > 2250) setTimeTable("야자 종료");
        else setTimeTable("로딩중");

        setTimer(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
    }


    const addOutUser = useCallback((data:out) => {
        setTotalOutMember((prevList) => {
            const idx = prevList.findIndex((item) => {return item.serial === data.serial});
            if(prevList[idx]) {
                if(prevList[idx].fields !== 'wb') {
                    setAbsentNum((prevNum) => {return prevNum-1;});
                    setCurrentNum((prevNum) => {return prevNum+1;});
                }
            }
            if(idx > -1) prevList.splice(idx, 1);

            if(data.fields !== 'wb') {
                setAbsentNum((prevNum) => {return prevNum+1;});
                setCurrentNum((prevNum) => {return prevNum-1;});
            }
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
            if(prevList[idx].fields !== 'wb') {
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
            setCurrentNum(data.data['totalNum'] - data.data['etcNum'] - data.data['asClubNum']);
            setAbsentNum(data.data['etcNum'] + data.data['asClubNum']);
            let total = [];
            for(let i of data.data['users']) total.push(i);
            for(let i of data.data['etcManage']) total.push(i)
            setTotalOutMember(total);
            setTeacherName(`${data.data['teacher']} 선생님`);
            setClassNum(`${data.data['gradeNum']}학년 ${data.data['classNum']}반`);
        });
        io.emit('class', roomid);   // 소켓 연결
        io.on('userOut', addOutUser);
        io.on('userComeback', removeOutUser);

        const timer = setTimeout(nowTime, 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const timer = setTimeout(nowTime, 1000);
        return () => clearTimeout(timer);
    }, [Timer]);
    
    useEffect(() => {
        setOutMember([]);
        setClubMember([]);
        setAsMember([]);
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
                switch(i.fields) {
                    case 'club':
                        setClubMember((prevList) => {
                            return [
                                ...prevList,
                                i
                            ];
                        });
                        break;
                    case 'as':
                        setAsMember((prevList) => {
                            return [
                                ...prevList,
                                i
                            ];
                        });
                        break;
                    default:
                        setEtcMember((prevList) => {
                            return [
                                ...prevList,
                                i
                            ];
                        });
                        break;
                }
            }
        }
    }, [totalOutMember, totalNum]);

    const setMemberColumn = (field:string) => {
        let temp_list: any[] = [];
        const member_list: any[] = [];
        switch(field) {
            case 'wb':
                for(let i=0; i<=outMember.length; i++) {
                    if(outMember.length === i) {
                        member_list.push(temp_list);
                    } else if((i+1)%2 === 0) {
                        temp_list.push(
                            <MemberBox>
                                <MemberName>{outMember[i].name}</MemberName>
                                <MemberSerial>{outMember[i].serial}</MemberSerial>
                            </MemberBox>
                        );
                        member_list.push(temp_list);
                        temp_list = [];
                    } else {
                        temp_list.push(
                            <MemberBox>
                                <MemberName>{outMember[i].name}</MemberName>
                                <MemberSerial>{outMember[i].serial}</MemberSerial>
                            </MemberBox>
                        );
                    }
                }
                for(let i=0; i<member_list.length; i++) {
                    member_list[i]=(
                        <MemberColumn>
                            {member_list[i]}
                        </MemberColumn>
                    );
                }
                setOutMemberList(member_list);
                break;
            case 'club':
                for(let i=0; i<=clubMember.length; i++) {
                    if(clubMember.length === i) {
                        member_list.push(temp_list);
                    } else if((i+1)%2 === 0) {
                        temp_list.push(
                            <MemberBox>
                                <MemberName>{clubMember[i].name}</MemberName>
                                <MemberSerial>{clubMember[i].serial} - {clubMember[i].reason}</MemberSerial>
                            </MemberBox>
                        );
                        member_list.push(temp_list);
                        temp_list = [];
                    } else {
                        temp_list.push(
                            <MemberBox>
                                <MemberName>{clubMember[i].name}</MemberName>
                                <MemberSerial>{clubMember[i].serial} - {clubMember[i].reason}</MemberSerial>
                            </MemberBox>
                        );
                    }
                }
                for(let i=0; i<member_list.length; i++) {
                    member_list[i]=(
                        <MemberColumn>
                            {member_list[i]}
                        </MemberColumn>
                    );
                }
                setClubMemberList(member_list);
                break;
            case 'as':
                for(let i=0; i<=asMember.length; i++) {
                    if(asMember.length === i) {
                        member_list.push(temp_list);
                    } else if((i+1)%2 === 0) {
                        temp_list.push(
                            <MemberBox>
                                <MemberName>{asMember[i].name}</MemberName>
                                <MemberSerial>{asMember[i].serial} - {asMember[i].reason}</MemberSerial>
                            </MemberBox>
                        );
                        member_list.push(temp_list);
                        temp_list = [];
                    } else {
                        temp_list.push(
                            <MemberBox>
                                <MemberName>{asMember[i].name}</MemberName>
                                <MemberSerial>{asMember[i].serial} - {asMember[i].reason}</MemberSerial>
                            </MemberBox>
                        );
                    }
                }
                for(let i=0; i<member_list.length; i++) {
                    member_list[i]=(
                        <MemberColumn>
                            {member_list[i]}
                        </MemberColumn>
                    );
                }
                setAsMemberList(member_list);
                break;
            case 'etc':
                for(let i=0; i<=etcMember.length; i++) {
                    if(etcMember.length === i) {
                        member_list.push(temp_list);
                    } else if((i+1)%2 === 0) {
                        temp_list.push(
                            <MemberBox>
                                <MemberName>{etcMember[i].name}</MemberName>
                                <MemberSerial>{etcMember[i].serial} - {etcMember[i].reason}</MemberSerial>
                            </MemberBox>
                        );
                        member_list.push(temp_list);
                        temp_list = [];
                    } else {
                        temp_list.push(
                            <MemberBox>
                                <MemberName>{etcMember[i].name}</MemberName>
                                <MemberSerial>{etcMember[i].serial} - {etcMember[i].reason}</MemberSerial>
                            </MemberBox>
                        );
                    }
                }
                for(let i=0; i<member_list.length; i++) {
                    member_list[i]=(
                        <MemberColumn>
                            {member_list[i]}
                        </MemberColumn>
                    );
                }
                setEtcMemberList(member_list);
                break;
        }
    }


    useEffect(() => {setMemberColumn('wb');}, [outMember]);
    useEffect(() => {setMemberColumn('club');}, [clubMember]);
    useEffect(() => {setMemberColumn('as');}, [asMember]);
    useEffect(() => {setMemberColumn('etc');}, [etcMember]);
    return (
        <Container>
            <Box>
                <TopBox>
                    <BSBOX>
                        <BTitle>{classNum}</BTitle>
                        <SubTitle>{teacherName}</SubTitle>
                    </BSBOX>

                    <StatusContainer>
                        <SBox title="총원" num={totalNum} />
                        <SBox title="현원" num={currentNum} />
                        <SBox title="결원" num={absentNum} />
                    </StatusContainer>

                    <BSBOX>
                        <BTitle>{TimeTable}</BTitle>
                        <SubTitle>{SelfStudyTimeTable[TimeTable]}</SubTitle>
                    </BSBOX>

                    <TimeBox>{Timer}</TimeBox>
                </TopBox>

                <Board>
                    <StatusBoard>
                        <StatusTitle>물 / 화장실</StatusTitle>
                        <StatusMemberBoard>
                            {outMemberList}
                        </StatusMemberBoard>
                    </StatusBoard>
                    <StatusBoard>
                        <StatusTitle>동아리</StatusTitle>
                        <StatusMemberBoard>
                            {clubMemberList}
                        </StatusMemberBoard>
                    </StatusBoard>
                    <StatusBoard>
                        <StatusTitle>방과후</StatusTitle>
                        <StatusMemberBoard>
                            {asMemberList}
                        </StatusMemberBoard>
                    </StatusBoard>
                    <StatusBoard>
                        <StatusTitle>기타</StatusTitle>
                        <StatusMemberBoard>
                            {etcMemberList}
                        </StatusMemberBoard>
                    </StatusBoard>
                </Board>
            </Box>
            <DimiBackground src={dimiback} />
        </Container>
    );
}

export default Status;