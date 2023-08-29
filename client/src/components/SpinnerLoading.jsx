import React from "react";

const SpinnerLoading = () => {
    return (
        <div className="d-flex container-fluid justify-content-center align-items-center vh-100">
            <div
                className="spinner-border spinner-border-lg text-success"
                role="status"
            >
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default SpinnerLoading;
