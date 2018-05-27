import * as React from 'react'
import { IContainerProps, ContainerListItem } from './containerListItem'

export interface IContainerListProps {
  containers: IContainerProps[]
  title?: string
}

export class ContainerList extends React.Component<IContainerListProps, {}> {
  render () {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <p>{this.props.containers.length === 0 ? 'No containers to show' : ''}</p>
        <div className="row">
          {this.props.containers.map(c => <ContainerListItem key={c.name} {...c} />)}
        </div>
      </div>
    )
  }
}
