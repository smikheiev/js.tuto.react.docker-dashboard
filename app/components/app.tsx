import * as React from 'react'
import * as _ from 'lodash'
import { IContainerProps } from './containerListItem'
import { ContainerList } from './containerList'

interface IAppState {
  runningContainers?: IContainerProps[]
  stoppedContainers?: IContainerProps[]
}

export class AppComponent extends React.Component<{}, IAppState> {
  fakeContainers: IContainerProps[] = [
    {
      id: '1',
      name: 'test container 1',
      image: 'test image 1',
      state: 'running',
      status: 'Running'
    },
    {
      id: '2',
      name: 'test container 2',
      image: 'test image 2',
      state: 'stopped',
      status: 'Running'
    }
  ]

  constructor () {
    super({})

    const partitionedContainers = _.partition(this.fakeContainers, c => c.state === 'running')

    this.state = {
      runningContainers: partitionedContainers[0],
      stoppedContainers: partitionedContainers[1]
    }
  }

  render () {
    return (
      <div className='container'>
        <h1 className='page-header'>Docker Dashboard</h1>

        <ContainerList title='Running containers' containers={this.state.runningContainers}/>
        <ContainerList title='Stopped containers' containers={this.state.stoppedContainers}/>
      </div>
    )
  }
}
