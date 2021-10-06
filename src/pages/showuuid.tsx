import React from "react";

import * as CONF from "../api/env";

const Main: React.FC = () => {
    return (
        <iframe src={`${CONF.API_SERVER}/get_uid?status=u`} width="500" height="100"></iframe>
    );
}

export default Main;