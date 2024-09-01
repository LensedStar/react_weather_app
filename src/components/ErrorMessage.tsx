import React from "react";

type ErrorProps = {
    errorText: string;
};
const ErrorMessage:React.FC<ErrorProps> = ({errorText}) => {
    return (
        <div className="error-message">
            <h1>{errorText}</h1>
        </div>
    );
};
export default ErrorMessage;
