import * as React from 'react'
import * as classNames from 'classnames'
import socket from '../socket'

export interface IContainerProps {
  id: string
  name: string
  image: string
  state: string
  status: string
}

export class ContainerListItem extends React.Component<IContainerProps, {}> {
  isRunning () {
    return this.props.state === 'running'
  }

  onActionButtonClick () {
    if (this.isRunning()) {
      socket.emit('container.stop', {id: this.props.id})
    } else {
      socket.emit('container.start', {id: this.props.id})
    }
  }

  render () {
    const panelSubclass = this.isRunning() ? 'success' : 'default'
    const panelClasses = classNames('panel', `panel-${panelSubclass}`)
    const buttonText = this.isRunning() ? 'Stop' : 'Start'

    return (
      <div className='col-sm-3'>
        <div className={panelClasses}>
          <div className='panel-heading'>{this.props.name}</div>
          <div className='panel-body'>
            Status: {this.props.status}<br/>
            Image: {this.props.image}
          </div>
          <div className='panel-footer'>
            <button className='btn btn-default' onClick={() => this.onActionButtonClick()}>
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    )
  }
}
