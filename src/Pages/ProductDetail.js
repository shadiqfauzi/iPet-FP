import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Button } from 'reactstrap'

import { fetchProductById } from '../Redux/Action'
import Axios from 'axios'

const ProductDetail = () => {
    const data = useSelector((state) => state.productView.productById)

    const dispatch = useDispatch()

    const { id } = useParams()

    useEffect(() => {
        dispatch(fetchProductById(id))
    }, [dispatch, id])

    const AddCart = () => {}

    const productById = () => {
        return data.map((e) => {
            return (
                <div className='container'>
                    <div className='card'>
                        <div className='img-p'>
                            {e.images.map((img) => {
                                return (
                                    <center>
                                        <img
                                            src={img.imagePath}
                                            alt='gambar'
                                            width='100px'
                                        />
                                    </center>
                                )
                            })}
                        </div>
                        <div className='text-p'>
                            <p>{e.productName}</p>
                            <p>{e.price}</p>
                            {e.categories.map((cat) => {
                                return <p>{cat.category}</p>
                            })}
                        </div>
                        <Button type='button' color='info' onClick={AddCart}>
                            Add to cart
                        </Button>
                    </div>
                </div>
            )
        })
    }

    return <div>{productById()}</div>
}

export default ProductDetail
