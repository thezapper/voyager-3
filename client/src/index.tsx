import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';

import { Babylon } from './components/babylon';

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