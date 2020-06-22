import React, {useState} from 'react';
import { Input, Button, Label } from 'reactstrap';
import { Register } from '../Redux/Action/authAction';
import {useDispatch, useSelector} from 'react-redux';

const RegisterPage = () => {
    const [formInput, setFormInput] = useState({
        username : '',
        email : '',
        password : '',
        confirmPassword : ''
    })

    const handleChange = (e) => {
        setFormInput({
            ...formInput,
            [e.target.id] : e.target.value
        })
    }

    const dispatch = useDispatch()

    const handleRegister = ()=> {
        
        let { username, email, password, confirmPassword } = formInput;
        if(username && email && password && confirmPassword){
            if(password === confirmPassword){
                dispatch(
                    Register({
                        username,
                        email,
                        password
                    })
                    )
            }else{
                alert('Invalid Password')
            }
        }else{
            alert('Please fill in all the forms')
        }
    }


    const loading = useSelector((state) => state.auth.loading)

    console.log(formInput)
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-8 img-placeholder'></div>
                <div className='col-md-4 d-flex flex-column pr-5 pl-5 auth-form'>
                    <h1>Register</h1>
                    <Label for='username' className='mt-5'>
                        Username
                    </Label>
                    <Input
                        type='text'
                        placeholder='Username'
                        id='username'
                        onChange={handleChange}
                    ></Input>
                    <Label for='email' className='mt-2'>
                        Email
                    </Label>
                    <Input type='email' placeholder='Email' id='email' onChange={handleChange}></Input>
                    <Label for='password' className='mt-2'>
                        Password
                    </Label>
                    <Input
                        type='password'
                        placeholder='Password'
                        id='password'
                        onChange={handleChange}
                    ></Input>
                    <Label for='confirmPassword' className='mt-2'>
                        Confirm Password
                    </Label>
                    <Input
                        type='password'
                        placeholder='Confirm Password'
                        id='confirmPassword'
                        onChange={handleChange}
                    ></Input>
                    <Button className='mt-5 auth-button' color='success' onClick={handleRegister}>
                        Register Now
                        {
                            loading
                            ?
                            'loading...'
                            :
                            'Register'
                        }
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
