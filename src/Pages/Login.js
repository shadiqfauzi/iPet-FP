import React from 'react';
import { Input, Button, Label } from 'reactstrap'

const Login = () => {
    return (
        <div className='container-fluid'>
            <div className='row'>
                    <div className='col-md-8 img-placeholder'>
                </div>
                <div className='col-md-4 d-flex flex-column pr-5 pl-5 auth-form'>
                    <h1>Login to continue</h1>
                    <Label for='username' className='mt-5'>Username</Label>
                    <Input type='text' placeholder='Username' id='username'></Input>
                    <Label for='password' className='mt-2'>Password</Label>
                    <Input type='password' placeholder='Password' id='password'></Input>
                    <span className='text-center mt-3'>Forgot Password?</span>
                    <Button className='mt-4 auth-button' color='info'>Login</Button>
                </div>
            </div>
        </div>
    );
}
 
export default Login;