import React, { useEffect, useState } from "react";
import io from '../api/socket';
import { useParams } from "react-router-dom";

type param = {
    roomid: string
};

interface out {
    classNum: string
    serial: string
    name: string
    field: string
    reason: string
    status: string
    id?: number
}
interface comeback {
    classNum: string
    serial: string
}

const Status: React.FC = () => {
    const [totalOutMember, setTotalOutMember] = useState<out[] | []>([]);

    const [outMember, setOutMember] = useState<out[] | []>([]);
    const [etcMember, setEtcMember] = useState<out[] | []>([]);

    const { roomid } =  useParams<param>();

    io.emit('class', roomid);   // 소켓 연결
    io.on('userOut', (data: out) => {
        setTotalOutMember([
            ...totalOutMember,
            {
                id: totalOutMember.length,
                ...data
            }
        ]);
    });
    io.on('userComeback', (data: comeback) => {
        const idx = totalOutMember.findIndex((item) => {return item.serial === data.serial});
        totalOutMember.splice(idx, 1);
        setTotalOutMember([...totalOutMember]);
        if(totalOutMember.length == 0) {
            setOutMember([]);
            setEtcMember([]);
        }
    });

    useEffect(() => {
        for(let i of totalOutMember) {
            if(i.field == 'wb') {
                setOutMember([
                    ...outMember,
                    i
                ]);
            } else {
                setEtcMember([
                    ...etcMember,
                    i
                ]);
            }
        }
    }, [totalOutMember]);

    return (
        <div>
            <h1>status</h1>
            <h2>물, 화장실</h2>
            {outMember.map((data) => {
                return <span key={data.id}>{data.name}</span>
            })}
            <h2>기타</h2>
            {etcMember.map((data) => {
                return <span key={data.id}>{data.name} ({data.reason})</span>
            })}
        </div>
    );
}

export default Status;