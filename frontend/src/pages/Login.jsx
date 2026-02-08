import { useContext, useEffect, useState } from "react"
import axios from 'axios'
import { toast } from "react-toastify"
import {useNavigate} from 'react-router-dom'
import { AuthContext } from "../context/AuthContext"

const Login = () => {
    const [isLogin, setIsLogin]=useState(true)
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [name, setName] = useState('')
    const navigate = useNavigate()
    const {backendUrl,isLoggedIn,setIsLoggedIn}=useContext(AuthContext)

    useEffect(()=>{
        if(isLoggedIn){
        navigate('/dashboard')
    }
    },[isLoggedIn])

    const onsubmitHandler=async(e)=>{
        e.preventDefault()
        try {
            if (isLogin) {
                const response = await axios.post(backendUrl+'/api/users/login',{email,password},{withCredentials:true})
                if(response.data.success){
                    toast.success('Login successful')
                    setIsLoggedIn(true)
                    navigate('/dashboard')
                }else{
                    toast.error(response.data.message)
                }
            } else{
                const response=await axios.post(backendUrl+'/api/users/signup',{name,email,password},{withCredentials:true})
                if(response.data.success){
                    toast.success('Signup successful')
                    setIsLogin(false)
                }
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
            setIsLoggedIn(false)
        }

        setEmail('')
        setPassword('')
        setName('')
    }

  return (
    <div>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={onsubmitHandler}>
            {!isLogin&&<div>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter full name" required />
            </div>}
            <div>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" required/> <br />
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" required /> <br />
            </div>
            <p>{isLogin?"Don't have an account?":"Already have an account?"}
                <span className="pointer" onClick={()=>setIsLogin(!isLogin)}>{isLogin?"Sign Up":"Login"}</span>{""}
            </p>
            <button type="submit">{isLogin?"Login":"Sign Up"}</button>
        </form>
        </div>
  )
}

export default Login