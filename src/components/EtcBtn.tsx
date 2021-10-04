import {useState, useEffect, useRef} from "react";
import styled from "styled-components";

import CheckGif from "../stylesheets/images/check.gif";
import LoadingGif from "../stylesheets/images/loading.gif";

const Button = styled.button`
    width: 100%;
    padding: 5px;
    font: 20px/65px Apple SD Gothic Neo B;
    color: white;
    outline: none;
    transition: all 0.5s ease;
    border-radius: 10px;
    position: relative;
`;
const BtnActive = {
    color: "black",
    border: "3px solid black",
    background: "none",
};
const BtnComplete = {
    color: "#3BCD94",
    border: "3px solid #3BCD94",
    background: "none",
}

const LAC = styled.img`
    height: 50%;
    position: absolute;
    left: 10%;
    transform: translateY(-50%);
    top: 50%;
    opacity: 0;
    transition: opacity 0.3s ease;
`;

const Btn = (prop: any) => {
    const [isActive, setIsActive] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const dis = useRef<HTMLButtonElement>(null);

    const btnStart = () => {
        setIsActive(true);
    }
    useEffect(() => {
        setIsComplete(prop.isSelect);
        if(prop.isSelect) {
            setTimeout(() => {
                setIsActive(false);
                setIsComplete(false);
                dis.current!.disabled = false;
            }, 1000);
        }
    }, [prop.isSelect]);

    return (
        <Button style={isComplete ? BtnComplete : (isActive ? BtnActive : {
            background: prop.borderColor,
            border: `2px solid ${prop.borderColor}`
        })} id={prop.id} onClick={btnStart} ref={dis}>
            <LAC style={isActive ? {opacity: 1} : {}} src={prop.isSelect ? CheckGif : (isActive ? LoadingGif : '')}/>
            {prop.msg}
        </Button>
    );
}

export default Btn;