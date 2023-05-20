import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import {Bars} from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom';

const ENDPOINT="http://localhost:4000"

function Signup() {
    const navigate=useNavigate();
    const [isLoading,setIsLoading]=useState(false);
    const [data,setData]=useState({
        fullname:"",
        email:"",
        password:""
    })
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
            await axios.post(`${ENDPOINT}/registerUser`,data).then((res)=>{
                if(res.data.isPresent===0){
                   
                    toast.error("User already exists!",{
                        theme:"dark",
                        hideProgressBar:true
                    })
                    setIsLoading(false);
                }
                else if(res.data.isPresent===1){
                    
                    toast.success("Account Created Successfully!",{
                        theme:"dark",
                        hideProgressBar:true
                    })
                    sessionStorage.setItem("email",data.email)
                    setIsLoading(false);
                    navigate('/dashboard',{
                        state:{
                            from:"signup"
                        }
                    })
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Full Name" name='fullname' onChange={updateData}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' onChange={updateData} required/>
      </Form.Group>

      <Form.Group className="mb-4" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' onChange={updateData} required/>
      </Form.Group>
      {
        isLoading?<div className='w-full flex justify-center'>
            <Bars/>
        </div>:<Button variant="primary" type="submit" className='w-full'>
        Signup
      </Button>
      }
      <ToastContainer/>
    </Form>
  );
}

export default Signup;