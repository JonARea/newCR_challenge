import React from 'react'
import '../styles/Header.css'
import {withRouter} from 'react-router-dom'

const Header = ({history}) => (
  <div className='header'>
    <h1 className='title'>User Infographics</h1>
    <div className='tabs'>
      <div onClick={() => history.push('/gender')} className='tab'>Gender</div>
      <div className='tab' onClick={() => history.push('/firstName')}>First Name</div>
      <div className='tab' onClick={() => history.push('/lastName')}>Last Name</div>
      <div className='tab' onClick={() => history.push('/state/overall')}>State</div>
      <div className='tab' onClick={() => history.push('/age/females')}>Age</div>
    </div>
  </div>
)

export default withRouter(Header)
