import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const Register: React.FC = () => {
    const [students, setStudents] = useState([]);
    

    useEffect(() => {
        axios.post("/api/getStudents")
        .then(data => {
            setStudents(data.data['students']);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    const redirect = (e:any) => {
        window.location.href = `http://localhost:3001/get_uid?status=r&sid=${e.target.dataset.serial}&name=${e.target.dataset.name}`;
    }

    return (
        <div>
            {students.length !== 0 ? (
                students.map((data) => {
                    return <span data-serial={data['serial']} data-name={data['name']} onClick={redirect}>{data['name']}</span>
                })
            ) : (
                <h1>로딩중..</h1>
            )}
        </div>
    );
}

export default Register;