import React, { FunctionComponent, useEffect, useState } from 'react';
import {planet} from '../index'
import { Details } from './details'

interface UIPanel_props {
    planets: planet[];
    onSelectCallback : (arg0:string)=>void;
    curPlanet: string;
 }

export const UIPanel: FunctionComponent<UIPanel_props> = (props) =>
{
    // Navigate back to the menu
    let goBack = () =>
    {
        props.onSelectCallback('none');
    }

    let items = props.planets.map(
        (itm, idx) => <ListItem key={itm.name} name={itm.name} onClick={props.onSelectCallback}/>
    )

    if (props.curPlanet === 'none')
    {

        return (
            <div className={'uipanel'}>
            Select a Planet
            {items}
        </div>
        )
    }   
    else
    {
        let url = props.planets.find( (el) => el.name === props.curPlanet ).url;

        return (
            <div className={'uipanel'}>
            Current Planet - {props.curPlanet}
            <Details planet={url} back={goBack}/>
        </div>
        )
    }
}

// -- An item in the list----------------------------------------------------------------------
interface ListItem_props {
    name: string;
    onClick: (name: string) => void;
}
export const ListItem: FunctionComponent<ListItem_props> = (props) =>
{
    return (
        <div className={'item'} onClick={ () => props.onClick(props.name)}>
            {props.name}    
        </div>
    )
}