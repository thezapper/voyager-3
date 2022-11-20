import React, { FunctionComponent, useEffect, useState } from 'react';

interface UIPanel_props {
    placeholder?: string;
 }

export const DinoUI: FunctionComponent<UIPanel_props> = (props) =>
{
  return (
    <>{props.placeholder}</>
  )
}