import React from 'react'
import { loggout } from './Auth'
import Button from './Button'
import { Link } from 'react-router'

function LogoutBtn() {
    const logoutHandler = () => {
        loggout()
    }

  return (
    <Button
      className='inline-bock px-6 py-2 duration-200 hover:bg-blue-400 rounded-full'
      onClick={logoutHandler}
    >
      Se déconnecter
      <Link to="/"></Link>
    </Button>
  )
}

export default LogoutBtn
import React from 'react'
import { loggout } from './Auth'
import Button from './Button'
import { Link } from 'react-router'

function LogoutBtn() {
    const logoutHandler = () => {
        loggout()
    }

  return (
    <Button
      className='inline-bock px-6 py-2 duration-200 hover:bg-blue-400 rounded-full'
      onClick={logoutHandler}
    >
      Se déconnecter
      <Link to="/"></Link>
    </Button>
  )
}

export default LogoutBtn