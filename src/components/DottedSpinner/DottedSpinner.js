import React from 'react';

import './DottedSpinner.css';

const DottedSpinner = () => {
    return (
        <div className="d-flex justify-content-center">
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
    );
}
export default DottedSpinner;