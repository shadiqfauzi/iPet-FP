import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'reactstrap'
import Swal from 'sweetalert2'

import { FetchCartByUserId } from '../Redux/Action/cartAction'
import { API_URL } from '../Support/API_URL'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'

const CartPage = () => {
	const id = useSelector((state) => state.auth.id)
	const username = useSelector((state) => state.auth.username)
	const email = useSelector((state) => state.auth.email)
	const data = useSelector((state) => state.cart.data)

	const dispatch = useDispatch()

	useEffect(() => {
		if (id) {
			dispatch(FetchCartByUserId(id))
		}
	}, [dispatch, id])

	const handleDelete = (cartId) => {
		Axios.delete(`${API_URL}/products/delCart/${cartId}`)
			.then(() => dispatch(FetchCartByUserId(id)))
			.catch((err) => window.alert(err.message))
	}

	const renderCart = () => {
		return data.map((cart, index) => {
			return (
				<tr key={cart.cartId}>
					<td>{index + 1}</td>
					<td>{cart.productName}</td>
					<td>
						<img width='20%' src={API_URL + cart.images[0].imagePath} alt='hadeuh'></img>
					</td>
					<td>Rp{cart.price.toLocaleString('id-ID')},00</td>
					<td>{cart.qty}</td>
					<td>
						<Button onClick={() => handleDelete(cart.cartId)} size='sm' color='danger'>
							Delete
						</Button>
					</td>
				</tr>
			)
		})
	}

	let totalLetsGOOO = 0
	const countTotal = () => {
		data.forEach((cart) => (totalLetsGOOO = totalLetsGOOO + cart.price * cart.qty))
		return totalLetsGOOO.toLocaleString('id-ID')
	}

	const handlePayment = () => {
		Swal.fire({
			title: 'Are you sure to continue to payment?',
			text: 'You will be sent an Invoice for this transaction. Be sure to upload a reciept of the transfer on the next page.',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes',
		}).then((result) => {
			if (result.value) {
				Axios.post(`${API_URL}/products/transaction`, { cart: data, userId: id, totalPrice: totalLetsGOOO, API_URL, username, email })
					.then((res) =>
						Swal.fire({
							title: 'Transaction request submitted!',
							text: `An email has been sent to ${email} containing an invoice of this transaction.`,
							icon: 'success',
							showCancelButton: true,
							confirmButtonColor: '#3085d6',
							cancelButtonColor: '#d33',
							confirmButtonText: 'OK',
						}).then((newResult) => {
							if (newResult.value) {
								return <Redirect to='/transaction' />
							}
						})
					)
					.catch((err) => console.log(err))
			}
		})
	}

	return (
		<div className='container mt-5' style={{ minHeight: '100vh' }}>
			<h4>Your Cart {data.length === 0 ? 'IS EMPTY, YEET' : null}</h4>
			{data.length !== 0 ? (
				<table className='table'>
					<thead>
						<tr>
							<th scope='col'>#</th>
							<th scope='col'>Product Name</th>
							<th scope='col'>Image</th>
							<th scope='col'>Price</th>
							<th scope='col'>Quantity</th>
							<th scope='col'></th>
						</tr>
					</thead>
					<tbody>{data && renderCart()}</tbody>
					<tfoot>
						<tr>
							<td colSpan='2'></td>
							<td>
								<p className='text-right'>Grand Total</p>
							</td>
							<td colSpan='3'>Rp{data && countTotal()},00</td>
						</tr>
						<tr>
							<td colSpan='4'></td>
							<td colSpan='2'>
								<Button style={{ width: '100%' }} size='sm' onClick={handlePayment}>
									Payment
								</Button>
							</td>
						</tr>
					</tfoot>
				</table>
			) : null}
		</div>
	)
}

export default CartPage
