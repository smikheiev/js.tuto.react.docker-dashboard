import * as React from 'react'
import * as _ from 'lodash'
import { IContainerProps } from './containerListItem'
import { ContainerList } from './containerList'
import socket from '../socket'

interface IAppState {
  runningContainers?: IContainerProps[]
  stoppedContainers?: IContainerProps[]
}

export class AppComponent extends React.Component<{}, IAppState> {
  constructor (props) {
    super(props)

    this.state = {
      runningContainers: [],
      stoppedContainers: []
    }

    socket.on('containers.list', (containers: any) => {
      const partitioned = _.partition(containers, (c: any) => c.State === 'running')
      this.setState({
        runningContainers: partitioned[0].map(this.mapContainer),
        stoppedContainers: partitioned[1].map(this.mapContainer)
      })
    })
  }

  mapContainer (container: any): IContainerProps {
    return {
      id: container.Id,
      name: _.chain(container.Names)
        .map((n: string) => n.substr(1))
        .join(', ')
        .value(),
      image: container.Image,
      state: container.State,
      status: `${container.State} ${container.Status}`
    }
  }

  componentDidMount () {
    socket.emit('containers.list')
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
