import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardBody, CardTitle } from 'reactstrap'

import { fetchProduct } from '../Redux/Action'
import { Link } from 'react-router-dom'

const ProductsCard = () => {
    const data = useSelector((state) => state.productView.data)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProduct())
    }, [dispatch])

    const products = () => {
        return data.map((e) => {
            return (
                <Link to={`/products-detail/${e.productId}`}>
                    <div className='card-group'>
                        <div className='card'>
                            <div className='card-body text-center'>
                                {e.images.map((img) => {
                                    console.log(img)
                                    return (
                                        <img
                                            src={img.imagePath}
                                            alt='gambar'
                                            width='100px'
                                        />
                                    )
                                })}
                                <p className='card-text'>
                                    <p>{e.productName}</p>
                                    <p>Rp. {e.price.toLocaleString()}</p>
                                    {e.categories.map((cat) => {
                                        return <p>{cat.category}</p>
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>
                </Link>
            )
        })
    }

    return <div>{products()}</div>
}

export default ProductsCard
