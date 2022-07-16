import * as React from 'react';
import {useState} from "react";

export function MusicItem(props) {

    return (
        <>
        <div className={"card approval_card"} >
            <div>{props.name}</div>
        </div>
        </>
    );
};