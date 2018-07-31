import React, {Component} from 'react'
import '../styles/UploadDataForm.css'
import PropTypes from 'prop-types'

class UploadDataForm extends Component {
  constructor() {
    super()
    this.state = {
      open: false
    }
  }

  render() {
    return (this.state.open ? (
      <div className='UploadDataForm'>Paste JSON here
        <textarea
          className='UploadDataFormTextArea'
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          id='json'
        />
        Or Upload a JSON file
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

UploadDataForm.propTypes = {
  handleDataUpload: PropTypes.func.isRequired
}

export default UploadDataForm
