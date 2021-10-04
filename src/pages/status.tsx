import React, { useEffect, useState, useCallback } from "react";
import io from '../api/socket';
import { useParams } from "react-router-dom";
import axios from "axios";

type param = {
    roomid: string
};

interface out {
    classNum: string
    serial: string
    name: string
    fields: string
    reason: string
    status?: string
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

    const addOutUser = useCallback((data:out) => {
        setTotalOutMember((prevList) => {
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
        console.log(totalOutMember);
        const idx = totalOutMember.findIndex((item) => {return item.serial === data.serial});
        totalOutMember.splice(idx, 1);
        console.log(totalOutMember);
        setTotalOutMember((prevList) => {
            const pa = prevList;
            const idx = pa.findIndex((item) => {return item.serial === data.serial});
            pa.splice(idx, 1);
            return [...pa];
        });
        if(totalOutMember.length === 0) {
            setOutMember([]);
            setEtcMember([]);
        }
    }, [totalOutMember]);

    useEffect(() => {
        axios.post('/api/outing', {classNum: roomid})
        .then((data:any) => {
            for(let i=0; i<data.data['users'].length; i++) {
                data.data['users'][i]['id'] = i;
            }
            setTotalOutMember(data.data['users']);
        });
        io.emit('class', roomid);   // 소켓 연결
        io.on('userOut', addOutUser);
        io.on('userComeback', removeOutUser);
    }, []);

    useEffect(() => {
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
                return data.name ? <span key={data.id}>{data.name} ({data.reason})</span> : '';
            })}
        </div>
    );
}

export default Status;