import React, { useState } from "react";
import styled from "@emotion/styled";

import dimiback from "../stylesheets/images/dimiback.svg";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
`;

const DimiBackground = styled.img`
    width: 100%;
    position: absolute;
    bottom: 0;
    opacity: 0.15;
`;

const StatusMenu: React.FC = () => {
    return (
        <Container>
            <DimiBackground src={dimiback} />
        </Container>
    );
}

export default StatusMenu;