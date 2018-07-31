import React from 'react'
import '../styles/Header.css'
import UploadDataForm from './UploadDataForm'
import HeaderTab from './HeaderTab'
import PropTypes from 'prop-types'


const Header = ({handleDataUpload}) => {
  return (
    <div className='header'>
      <h1 className='title'>User Infographics</h1>
      <UploadDataForm handleDataUpload={handleDataUpload} />
      <div className='tabs'>
        <HeaderTab uri='gender' />
        <HeaderTab uri='firstName' />
        <HeaderTab uri='LastName' />
        <HeaderTab uri='state/overall' />
        <HeaderTab uri='age/overall' />
      </div>
    </div>
  )
}

Header.propTypes = {
  handleDataUpload: PropTypes.func.isRequired
}

export default Header
