import React from 'react';
import { Input, Button, Label } from 'reactstrap'

const Register = () => {
    return (
        <div className='container-fluid'>
            <div className='row'>
                    <div className='col-md-8 img-placeholder'>
                </div>
                <div className='col-md-4 d-flex flex-column pr-5 pl-5 auth-form'>
                    <h1>Register</h1>
                    <Label for='username' className='mt-5'>Username</Label>
                    <Input type='text' placeholder='Username' id='username'></Input>
                    <Label for='email' className='mt-2'>Email</Label>
                    <Input type='email' placeholder='Email' id='email'></Input>
                    <Label for='password' className='mt-2'>Password</Label>
                    <Input type='password' placeholder='Password' id='password'></Input>
                    <Label for='confirmPassword' className='mt-2'>Confirm Password</Label>
                    <Input type='password' placeholder='Confirm Password' id='confirmPassword'></Input>
                    <Button className='mt-5 auth-button' color='success'>Register Now</Button>
                </div>
            </div>
        </div>
    );
}
 
export default Register;