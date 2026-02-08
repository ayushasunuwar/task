import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { AuthContext } from "../context/AuthContext"

const Dashboard = () => {
  const [message,setMessage]=useState('')
  const navigate=useNavigate()
  const {backendUrl}=useContext(AuthContext)

  const fetchDashboard=async()=>{
    try {
      const response=await axios.post(backendUrl+'/api/dashboard/',{},{withCredentials:true})
      if(response.data.success){
        setMessage(response.data.message)
      }else{
        toast.error(response.data.message)
        navigate('/')
      }
    } catch (error) {
      toast.error('Something went wrong')
      navigate('/')
    }
  }
  useEffect(()=>{
    fetchDashboard()
  },[])

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{message}</p>
    </div>
  )
}

export default Dashboard