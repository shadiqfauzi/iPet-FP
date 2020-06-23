import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Axios from 'axios'
import { API_URL } from '../Support/API_URL'
import { FaChartLine, FaShoppingCart, FaFileInvoiceDollar, FaUserCog } from 'react-icons/fa'

const AdminLinks = (props) => {
	const { status } = props

	let totalPending = useSelector((state) => state.transactionStatus.totalPending)

	const dispatch = useDispatch()

	useEffect(() => {
		Axios.get(`${API_URL}/transaction-status/pending`)
			.then((res) => {
				dispatch({
					type: 'FETCH_PENDING',
					payload: res.data.data,
				})
			})
			.catch((err) => console.log(err))
	}, [dispatch])

	let location = useLocation()
	let manageProduct = location.pathname.match(/manage-product/)
	let transactionStatus = location.pathname.match(/transaction-status/)
	let addProduct = location.pathname.match(/manage-product\/add/)
	let productPackage = location.pathname.match(/manage-product\/package/)
	let addPackage = location.pathname.match(/manage-product\/new-package/)
	let manageUsers = location.pathname.match(/manage-users/)

	return (
		<ul className='list-group list-group-flush'>
			<Link to={'/admin'}>
				<li style={{ cursor: 'pointer' }} className={`list-group-item ${location.pathname === '/admin' && 'list-group-item-primary'}`}>
					<FaChartLine /> Report Overview
				</li>
			</Link>
			<Link to={'/admin/manage-product'}>
				<li style={{ cursor: 'pointer' }} className={`list-group-item ${manageProduct && 'list-group-item-primary'}`}>
					<FaShoppingCart /> Manage Product
				</li>
			</Link>
			{manageProduct && (
				<React.Fragment>
					<Link to={'/admin/manage-product'}>
						<li
							style={{ cursor: 'pointer' }}
							className={`list-group-item pl-5 ${
								manageProduct && !addProduct && !productPackage && !addPackage && 'list-group-item-info'
							}`}
						>
							All Products
						</li>
					</Link>
					<Link to={'/admin/manage-product/add'}>
						<li style={{ cursor: 'pointer' }} className={`list-group-item pl-5 ${addProduct && 'list-group-item-info'}`}>
							Add Product
						</li>
					</Link>
					<Link to={'/admin/manage-product/package'}>
						<li style={{ cursor: 'pointer' }} className={`list-group-item pl-5 ${productPackage && 'list-group-item-info'}`}>
							Product Packages
						</li>
					</Link>
					<Link to={'/admin/manage-product/new-package'}>
						<li style={{ cursor: 'pointer' }} className={`list-group-item pl-5 ${addPackage && 'list-group-item-info'}`}>
							Add Package
						</li>
					</Link>
				</React.Fragment>
			)}
			<Link to={'/admin/transaction-status'}>
				<li className={`list-group-item ${transactionStatus && 'list-group-item-primary'}`}>
					<FaFileInvoiceDollar /> Transaction Status {totalPending ? <span className='badge badge-info ml-2'>{totalPending}</span> : null}
				</li>
			</Link>
			{transactionStatus && (
				<React.Fragment>
					<Link to={'/admin/transaction-status'}>
						<li
							style={{ cursor: 'pointer' }}
							className={`list-group-item pl-5 ${transactionStatus && status === null && 'list-group-item-info'}`}
						>
							All
						</li>
					</Link>
					<Link to={'/admin/transaction-status?status=pending'}>
						<li style={{ cursor: 'pointer' }} className={`list-group-item pl-5 ${status === 'pending' && 'list-group-item-info'}`}>
							Pending {totalPending ? <span className='badge badge-info ml-2'>{totalPending}</span> : null}
						</li>
					</Link>
					<Link to={'/admin/transaction-status?status=approval'}>
						<li style={{ cursor: 'pointer' }} className={`list-group-item pl-5 ${status === 'approval' && 'list-group-item-info'}`}>
							Approved
						</li>
					</Link>
					<Link to={'/admin/transaction-status?status=reject'}>
						<li style={{ cursor: 'pointer' }} className={`list-group-item pl-5 ${status === 'reject' && 'list-group-item-info'}`}>
							Rejected
						</li>
					</Link>
				</React.Fragment>
			)}
			<Link to={'/admin/manage-users'}>
				<li style={{ cursor: 'pointer' }} className={`list-group-item ${manageUsers && 'list-group-item-primary'}`}>
					<FaUserCog /> Manage Users
				</li>
			</Link>
		</ul>
	)
}

export default AdminLinks
