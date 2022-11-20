import React, { FunctionComponent, ReactComponentElement, ReactElement, useEffect, useState } from 'react';
import { LEVEL }   from './levels/level';
import { SpaceUI } from './levels/solarSystem/ui/SpaceUI';
import { DinoUI }  from './levels/dino/ui/DinoUI';

interface UiContainer_props {
  currentLevel: LEVEL
}

export const UiContainer: FunctionComponent<UiContainer_props> = (props) => {
  let current: ReactElement;

  switch (props.currentLevel) 
  {
    case LEVEL.SPACE:
      current = <SpaceUI />;
      break;
    case LEVEL.DINOS:
      current = <DinoUI />;
      break;
  }
  return (
    current
  )
}