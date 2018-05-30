import * as React from 'react'
import * as classNames from 'classnames'
import { Modal } from './modal'

interface INewContainerModalProps {
  id: string,
  onRunImage?: (name: string) => void
}

interface INewContainerModalState {
  imageName: string,
  isValid: boolean
}

export class NewContainerModal extends React.Component<INewContainerModalProps, INewContainerModalState> {
  constructor (props: any) {
    super(props)

    this.state = {
      imageName: '',
      isValid: false
    }
  }

  onImageNameChange (e: any) {
    const name = e.target.value

    this.setState({
      imageName: name,
      isValid: name.length > 0
    })
  }

  runImage () {
    if (this.state.isValid && this.props.onRunImage) {
      this.props.onRunImage(this.state.imageName)
    }

    return this.state.isValid
  }

  render () {
    const inputClass = classNames({
      'form-group': true,
      'has-error': !this.state.isValid
    })

    return (
      <Modal id='newContainerModal' title='Create and run new container' buttonText='Run'
             onButtonClicked={() => this.runImage()}>
        <form className='form-horizontal'>
          <div className={inputClass}>
            <label htmlFor='imageName' className='col-sm-3 control-label'>Image name</label>
            <div className='col-sm-9'>
              <input type='text' className='form-control' id='imageName' placeholder='e.g. mongodb:latest'
                     onChange={(e: any) => this.onImageNameChange(e)}/>
            </div>
          </div>
        </form>
      </Modal>
    )
  }
}
