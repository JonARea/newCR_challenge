import React, {Component} from 'react'
import '../styles/UploadDataForm.css'

class UploadDataForm extends Component {
  constructor() {
    super()
    this.state = {
      open: false,
      data: {}
    }
  }

  render() {
    return (this.state.open ? (
      <div className='UploadDataForm'>Paste JSON here
        <textarea className='UploadDataFormTextArea' autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" id='json' />
        Or Upload JSON file
        <input id='UploadJSONFile' type="file" accept='.json' />
        <div className='UploadDataFormSubmit' onClick={() => {
          this.setState({open: false})
          this.props.handleDataUpload()
          }}>Submit
        </div>
      </div>) : (
        <div className='UploadDataFormButton' onClick={() => this.setState({open: true})} >Upload New Data</div>
      )
    )
  }
}

export default UploadDataForm
