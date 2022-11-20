import React, { FunctionComponent, useEffect, useState } from 'react';
import { planet, planetData } from '../planet'
import { Details } from './details'
import { ee } from '../../../../../index'

// This is the base container component for all the React UI

// interface UIPanel_props {
//   planets?: planet[];
//   onSelectCallback?: (arg0: string) => void;
// }

export const SpaceUI: FunctionComponent = (props) => {

  const [currentPlanet, setPlanet] = useState('none');
  const [planets, setPlanetList] = useState<planetData[]>([]);
  
  useEffect(() =>
  {
    // recieve notifications from Babylon
    ee.on('selectPlanet', (choice) =>
    {
      setPlanet(choice);
    });

    ee.on('loadPlanets', (planetList) =>
    {
      setPlanetList(planetList);
    });

  }, [])

  const onSelectPlanet = (name: string) => 
  {
    //setPlanet(name);
    // emit an event to let Babylon know
    ee.emit('selectPlanet', name)
  }

  const items = planets.map((itm, idx) => 
  {
    return (
      <ListItem key={itm.name} name={itm.name} onClick={ onSelectPlanet}/>
    )
  }
  )

  if (currentPlanet === 'none') 
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
    const url = planets.find((el) => el.name === currentPlanet).url;

    return (
      <div className={'uipanel'}>
        Current Planet - {currentPlanet}
        <Details planet={url} back={ () => onSelectPlanet('none') } />
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
    <div className={'item'} onClick={() => props.onClick(props.name)}>
      {props.name}
    </div>
  )
}