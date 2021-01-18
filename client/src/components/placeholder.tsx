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
        "width": "800px",
        "height": "800px",
    }

    return (
        <div style={stl}>
            Hello, this is some placeholder text
        </div>
    )
}