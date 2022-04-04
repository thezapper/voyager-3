//import "./styles.css";
import React, { FunctionComponent, useEffect, useState } from 'react';

interface Placeholder_props { }

export const Placeholder: FunctionComponent<Placeholder_props> = (props) =>
{
    useEffect(() => 
    {
        console.log("Creating Placeholder component...");
        return () =>
        {
            console.log("Destroying Placeholder component...");
        };

    });

    let stl =
    {
        "border": "solid 2px black",
        "width": "80px",
        "height": "80px",
    }

    return (
        <div className={'comp1'}>
            Hello, this is some placeholder text
        </div>
    )
}