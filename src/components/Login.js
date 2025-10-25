import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import {Bars} from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { ENDPOINT } from '../constants';


function Login() {
    const navigate=useNavigate();
    const [data,setData]=useState({
        email:"",
        password:""
    })
    const [isLoading,setIsLoading]=useState(false);
    const updateData=(e)=>{
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
    }
    const submitHandler= async (e)=>{
        e.preventDefault();
        try {
            setIsLoading(true);
            await axios.post(`${ENDPOINT}/login`,data).then((res)=>{
                if(res.data.isPresent===-1){
                   
                    toast.error("User doesn't exists!",{
                        theme:"dark",
                        hideProgressBar:true
                    })
                    
                    setIsLoading(false);
                }
                else if(res.data.isPresent===0){
                    
                    toast.warn("Incorrect Password",{
                        theme:"dark",
                        hideProgressBar:true
                    })
                    setIsLoading(false);
                }
                else{
                    
                    toast.success("Login Successfull",{
                        theme:"dark",
                        hideProgressBar:true
                    })
                    sessionStorage.setItem("email",data.email)
                    setIsLoading(false);
                    navigate('/dashboard',{
                        state:{
                            from:"login"
                        }
                    })
                }
            })
        
            // console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail" >
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' onChange={updateData} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' onChange={updateData}/>
      </Form.Group>
      {
        isLoading?<div className='w-full flex justify-center'>
            <Bars/>
        </div>:<Button variant="primary" type="submit" className='w-full'>
        Login
      </Button>
      }
      <ToastContainer/>
    </Form>
  );
}

export default Login;