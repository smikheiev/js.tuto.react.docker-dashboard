import * as React from 'react'

export interface IModalTriggerProps {
  modalId: string
  buttonText: string
}

export class ModalTrigger extends React.Component<IModalTriggerProps, {}> {
  render () {
    const href = `#${this.props.modalId}`

    return (
      <a className='btn btn-primary' data-toggle='modal' href={href}>
        {this.props.buttonText}
      </a>
    )
  }
}
