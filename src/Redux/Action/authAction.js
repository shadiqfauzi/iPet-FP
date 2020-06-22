import {
    API_AUTH_START,
    API_AUTH_SUCCESS, 
    API_AUTH_FAILED, 
    LOGIN,
    LOGOUT,
    VERIFIED,
    PROFILE_PICTURE,
} from '../types';

import Axios from 'axios';
import { API_URL } from '../../Support/API_URL';

let token = localStorage.getItem('token')

export const changePicture = (userId) => {
    return async (dispatch) => {
            dispatch({
                type : API_AUTH_START
            })
            try{
                let headers = {
                    headers : {
                        'Authorization' : `Bearer ${token}`
                    }
                }
                await Axios.patch(`${API_URL}/users/changePicture/${userId}`, headers);
                dispatch({
                    type : PROFILE_PICTURE,
                })
                dispatch({
                    type : API_AUTH_SUCCESS
                })
            }catch(err){
                dispatch({
                    type : API_AUTH_FAILED
            })
        }
    }
}

export const Login = (form) => {
    return async (dispatch) => {
        // async
        // await bisa dilakukan apabila function return sebuah promise
        // let res = await Axios.post(`${API_URL}/users/login`, form)
        // console.log(res)
        // dispatch({
        //     type : API_AUTH_START
        // })
        // Axios.post(`${API_URL}/users/login`, form)
        // .then((res) => {
        //     dispatch({
        //         type : LOGIN,
        //         payload : res.data.data
        //     })
        //     dispatch({
        //         type : API_AUTH_SUCCESS
        //     })
        // })
        // .catch((err) => {
        //     dispatch({
        //         type : API_AUTH_FAILED
        //     })
        // })
        dispatch({
            type : API_AUTH_START
        })
        try{
            let res = await Axios.post(`${API_URL}/users/login`, form)
            let { id, username, email, roleId, token, verified, status } = res.data.data
            dispatch({
                type : LOGIN,
                payload : {
                    id,
                    username,
                    email,
                    roleId,
                    verified,
                    status
                }
            })
            localStorage.setItem('token', token)
            dispatch({
                type : API_AUTH_SUCCESS
            })
        }catch(err){
            dispatch({
                type : API_AUTH_FAILED
            })
        }
    }
}

export const Register = (form) => {
    return(dispatch) => {
        dispatch({
            type : API_AUTH_START
        })
        Axios.post(`${API_URL}/users/register`, form) // {username, password, email}
        .then((res) => {
            console.log(res.data)
            let { id, username, email, roleId, token, verified } = res.data.data
            // {status : 'Success', data : {id,username, email, roleId}, message: ''}
            dispatch({
                type : LOGIN,
                payload : {
                    id, 
                    username, 
                    email, 
                    roleId,
                    verified
                }
            })
            localStorage.setItem('token', token)
            dispatch({
                type : API_AUTH_SUCCESS
            })
        })
        .catch((err) => {
            dispatch({
                type : API_AUTH_FAILED
            })
        })
    }
}

export const keepLogin = (token) => {
    // console.log('keeplogin')
    return async (dispatch) => {
        let token = localStorage.getItem('token')
        // console.log(token)
        try{        
            if(token){
                dispatch({
                    type : API_AUTH_START
                })
                let headers = {
                    headers : {
                        'Authorization' : `Bearer ${token}`
                    }
                }
                let res = await Axios.post(`${API_URL}/users/keep-login`, {}, headers)
                let { id, username, email, roleId, verified } = res.data.data;
                dispatch({
                    type : LOGIN,
                    payload : {
                        id,
                        username,
                        email, 
                        roleId,
                        verified
                    }
                })
                dispatch({
                    type : API_AUTH_SUCCESS
                })
            }
        }catch(err){
            dispatch({
                type : API_AUTH_FAILED
            })
        }
    }
}

export const Logout = () => {
    return(dispatch) => {
        localStorage.removeItem('token')
        dispatch({
            type : LOGOUT
        })
    }
}

export const Verification = (form) => {
    return async (dispatch) => {
        dispatch({
            type : API_AUTH_START
        })
        try{
            let res = await Axios.post(`${API_URL}/users/verification`, form);
            // true res.data.data
            dispatch({
                type : VERIFIED,
                payload : res.data.data
            })
            dispatch({
                type : API_AUTH_SUCCESS
            })

        }catch(err){
            console.log(err, 'ini error')
            console.log(err.status)
            console.log(err.message)
            dispatch({
                type : API_AUTH_FAILED,
                payload : err.response
            })
        }
    }
}

