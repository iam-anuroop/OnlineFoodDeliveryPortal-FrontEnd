import React from 'react'
import { useNavigate } from 'react-router-dom'

const WorkDetails = () => {
    const navigate = useNavigate()
  return (
    <div>
        <button onClick={()=>navigate('/deliveryhome')}>
            <h1>Back</h1>
        </button>
        WorkDetails
    </div>
  )
}

export default WorkDetails