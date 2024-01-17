import React from 'react'
import { useNavigate } from 'react-router-dom'

const WorkDetails = () => {
    const navigate = useNavigate()
  return (
    <div>
        <button onClick={()=>navigate('/deliveryhome')}>Back</button>
        WorkDetails
    </div>
  )
}

export default WorkDetails