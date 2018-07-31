import React from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

const HeaderTab = ({history, location, uri}) => (
  <div
    className={location.pathname.includes(uri) ? 'tabActive tab' : 'tab'}
    onClick={() => history.push(`/${uri}`)}
  >
    {uri[0].toUpperCase() + uri.slice(1)}
  </div>
)

HeaderTab.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  uri: PropTypes.string.isRequired
}

export default withRouter(HeaderTab)
