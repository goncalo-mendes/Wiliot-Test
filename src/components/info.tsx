import React from "react";

type tempInfoProps = {
    id: string;
    value: number
}

const Info: React.FunctionComponent<tempInfoProps>  = ({ id, value }) => {
    return (
        <div className="infoBlock">
            <h2>{id}</h2>
            <p>Temp: {value} C</p>
        </div>
    );
};

export default Info;