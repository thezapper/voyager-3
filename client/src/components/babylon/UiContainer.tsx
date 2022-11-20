import React, { FunctionComponent, ReactComponentElement, ReactElement, useEffect, useState } from 'react';
import { UIPanel as SpaceUI } from './levels/solarSystem/ui/UIPanel';

enum LEVEL
{
  SPACE,
  DINOS,
  CV
}

interface UiContainer_props
{
  currentLevel : LEVEL
}

export const UiContainer: FunctionComponent<UiContainer_props> = (props) =>
{
  let current: ReactElement;

  switch (props.currentLevel)
  {
  case LEVEL.SPACE:
    current = <SpaceUI />;
    break;
  }
  return (
    current
  )
}