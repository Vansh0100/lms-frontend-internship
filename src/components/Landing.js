import React from 'react'
import Login from './Login'
import Signup from './Signup'

function Landing(props) {
  return (
    <div className='w-full h-full d-flex justify-center p-8'>
        <div className='w-full md:w-1/2  lg:w-1/3 p-12 border-2 shadow-md rounded-sm'>
            {
                !props.show?<div>
                    <h2 className='text-center mb-5'>Login</h2>
                    <Login/>
                </div>:<div>
                    <h2 className='text-center mb-5'>Signup</h2>
                    <Signup/>
                </div>
            }
        </div>
    </div>
  )
}

export default Landing