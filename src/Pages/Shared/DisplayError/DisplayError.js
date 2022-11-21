import React from 'react';
import { useRouteError } from 'react-router-dom';

const DisplayError = () => {
    const error = useRouteError();
    return (
        <div>
            <p>Something Wrong</p>
            <p>{error.message || error.statusText}</p>
            <h4>signout</h4>
        </div>
    );
};

export default DisplayError;