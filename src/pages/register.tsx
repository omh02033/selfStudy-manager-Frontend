import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import Btn from "../components/Btn";

import Loading from "../stylesheets/images/loading.gif";
import dimiback from "../stylesheets/images/dimiback.svg";

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Frame = styled.iframe`
    position: absolute;
    visibility: hidden;
    left: 0;
    transform: translateX(-100%);
`;
const FieldBox = styled.div`
    width: 75%;
    margin: 10px;
`;
const LoadingBox = styled.img`
    width: 50px;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
`;

const Title = styled.span`
    font: 35px/65px Apple SD Gothic Neo B;
    color: black;
    margin: 10px;
`;

const DimiBackground = styled.img`
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: -1;
`;

const Register: React.FC = () => {
    const [students, setStudents] = useState([]);
    
    const FrameRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        axios.post("/api/getStudents")
        .then(data => {
            setStudents(data.data['students']);
        })
        .catch(err => {
            console.log(err);
        });

        window.addEventListener("message", (e) => {
            window.document.getElementById(`_${e.data.serial}`)
        });
    }, []);

    const redirect = (e:any) => {
        console.log(e.target);
        FrameRef.current!.src = `http://localhost:3001/get_uid?status=r&sid=${e.target.dataset.serial}&number=${e.target.dataset.number}`;
    }

    return (
        <Container>
            <Title>회원 선택</Title>
            {students.length !== 0 ? (
                students.map((data) => {
                    return <FieldBox onClick={redirect}><Btn type="button" borderColor="#3BCD94" data-serial={data['serial']} data-number={data['number']} msg={data['serial']+" "+data['name']}></Btn></FieldBox>
                })
            ) : (
                <LoadingBox src={Loading} />
            )}
            <Frame frameBorder="no" width="100" height="100" ref={FrameRef}/>
            <DimiBackground src={dimiback} />
        </Container>
    );
}

export default Register;