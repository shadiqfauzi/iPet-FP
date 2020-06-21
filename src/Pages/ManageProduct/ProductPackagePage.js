import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FetchProductPackage } from '../../Redux/Action/'
import PackageTable from '../../Components/ManageProduct/PackageTable'
import CustomLoader from '../../Components/CustomLoader'
import { useLocation } from 'react-router-dom'
import { Alert } from 'reactstrap'

const useQuery = () => {
	return new URLSearchParams(useLocation().search)
}

const ProductPackagePage = (props) => {
	let query = useQuery()
	let success = query.get('success') ? true : false
	let editSuccess = query.get('edit-success') ? true : false
	let deleteSuccess = query.get('delete-success') ? true : false
	const [alert, setAlert] = useState(success)
	const [editAlert, setEditalert] = useState(editSuccess)
	const [deleteAlert, setDeleteAlert] = useState(deleteSuccess)

	const dispatch = useDispatch()
	const data = useSelector((state) => state.productPackage.data)
	const loading = useSelector((state) => state.productPackage.loading)

	useEffect(() => {
		window.scrollTo(0,0)
		dispatch(FetchProductPackage())
	}, [dispatch])

	if (loading) return <CustomLoader />
	return (
		<div>
			<Alert color='success' isOpen={alert} toggle={() => setAlert(null)}>
				Successfully added new package!
			</Alert>
			<Alert color='success' isOpen={editAlert} toggle={() => setEditalert(null)}>
				Package successfully edited!
			</Alert>
			<Alert color='warning' isOpen={deleteAlert} toggle={() => setDeleteAlert(null)}>
				Package successfully deleted!
			</Alert>
			<PackageTable data={data} />
		</div>
	)
}

export default ProductPackagePage
