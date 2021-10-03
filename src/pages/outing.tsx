import React, { useEffect, useState, useRef } from "react";
import Select from 'react-select';

const Outing: React.FC = () => {
    const [etc, setEtc] = useState(false);

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
        { value: 'etc', label: '기타' },
    ]

    const redirect = (e: any) => {
        window.location.href = `http://localhost:3001/get_uid?status=o&field=${e.target.id}&reason=none&class=16`;
    }
    const etcStatus = () => {
        setEtc(true);
    }
    const etcChange = (e: any) => {
        if(e.value == 'etc') {
            const reason = prompt("사유를 입력하세요.", "직접입력");
            window.location.href = `http://localhost:3001/get_uid?status=o&field=etc&reason=${reason}&class=16`;
        } else {
            window.location.href = `http://localhost:3001/get_uid?status=o&field=etc&reason=${e.label}&class=16`;
        }
    }

    return (
        <div>
            <input type="radio" name="wb" id="wb" value="물,화장실" onClick={redirect} />
            <label htmlFor="wb">물, 화장실</label>
            <input type="radio" name="etc" id="etc" value="기타" onClick={etcStatus} />
            <label htmlFor="etc">기타</label>
            {etc ? (
                <Select options={options} onChange={etcChange} />
            ) : (
                <div></div>
            )}
        </div>
    );
}

export default Outing;