import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';

import { Babylon } from './components/babylon';
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
        <Babylon />
      </div>

    );
  }
}


ReactDOM.render(
  <MainApp />,
  document.getElementById('container')
);