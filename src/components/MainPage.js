import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import error404 from './error404';
import MainDashboard from './MainDashboard';
function MainPage(props) {
    const location=useLocation();
    const [state,setState]=useState(location?.state?.from);
   console.log(state);
  return (
    <>
        {
            state=="login" || state=="signup"?<MainDashboard/>:
            <div className='w-full h-full' style={{backgroundColor:"rgb(234,233,232)"}}>
                <img src="https://cdn.dribbble.com/users/469578/screenshots/2597126/404-drib23.gif" alt="" className='w-full h-full object-contain'/>
            </div>
        }
    </>
  )
}

export default MainPage