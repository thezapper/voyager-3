import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';

import { Babylon } from './components/babylon';
import { ThreeRenderer } from './components/three';
import { Renderer2d} from './components/Renderer2d.js';

interface IProps
{
}

interface IState
{
  someText: string,
}



class MainApp extends React.Component<IProps, IState>
{
  constructor(props: IProps)
  {
    super(props);

    this.state =
    {
      someText: "Hello, world!"
    };

  }

  /* componentDidMount()
  {

  } */

  render()
  {

    return (
      <div>
        <ThreeRenderer />
      </div>

    );
  }
}


ReactDOM.render(
  <MainApp />,
  document.getElementById('container')
);