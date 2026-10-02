import React from 'react';
import ReactDOM from 'react-dom';
export const TEMP = true;
export const Comp = () => React.createElement('div', null, 'TEMP');
export const render = () => {
    // Just to use react-dom
    console.log(ReactDOM.version);
};
