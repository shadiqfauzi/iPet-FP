import React, { useState } from 'react';
import { Input, Button, Label } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Login } from '../Redux/Action/authAction';
import Swal from 'sweetalert2';
import Axios from 'axios';
import { API_URL } from '../Support/API_URL';

const LoginPage = () => {
    const [formInput, setFormInput] = useState({
        username : '',
        password : ''
    })

    const handleChange = (e) => {
        setFormInput({
            ...formInput,
            [e.target.id] : e.target.value
        })
    }

    const dispatch = useDispatch()

    const handleLogin = () => {
        // Axios.get(`${API_URL}/users/fetchAllUsers`)
        // .then(res => {
        //     if(formInput.username.length < 0 ){
        //         Swal.fire({
        //             icon: 'error',
        //             title: 'Wrong Username',
        //             text: 'Username not found',
        //           })
        //     }
        //     if(formInput.password.length < 0){
        //         Swal.fire({
        //             icon: 'error',
        //             title: 'Wrong Password',
        //             text: 'Password incorrect',
        //           })
        //     }
        // })
        // .catch(err => console.group(err))

            dispatch(
            Login(formInput)
        )
    }

    const loading = useSelector((state) => state.auth.loading)
    const username = useSelector(({ auth }) => auth.username)

    if(username){
        return(
            <Redirect to='/'/>
        )
    }
    console.log(formInput)
    
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-8 img-placeholder'></div>
                <div className='col-md-4 d-flex flex-column pr-5 pl-5 auth-form'>
                    <h1>Login to continue</h1>
                    <Label for='username' className='mt-5'>
                        Username
                    </Label>
                    <Input
                        type='text'
                        placeholder='Username'
                        id='username'
                        onChange={handleChange}
                    ></Input>
                    <Label for='password' className='mt-2'>
                        Password
                    </Label>
                    <Input
                        type='password'
                        placeholder='Password'
                        id='password'
                        onChange={handleChange}
                    ></Input>
                    <span className='text-center mt-3'>Forgot Password?</span>
                    <Button className='mt-4 auth-button' color='info' onClick={handleLogin}>
                        Login
                        {
                            loading
                            ?
                            'loading...'
                            :
                            'Login'
                        }
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
