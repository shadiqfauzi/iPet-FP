import React from 'react'
import { Switch, useRouteMatch, Route, useLocation } from 'react-router-dom'

import TransactionStatusPage from './TransactionStatus/TransactionStatusPage'
import TransactionStatusDetailPage from './TransactionStatus/TransactionStatusDetailPage'
import AdminLinks from '../Components/AdminLinks'
import ManageProductPage from './ManageProduct/ManageProductPage'
import AddProductPage from './ManageProduct/AddProductPage'
import EditProductPage from './ManageProduct/EditProductPage'
import ProductPackagePage from './ManageProduct/ProductPackagePage'
import ProductPackageDetail from './ManageProduct/ProductPackageDetail'
import AddPackagePage from './ManageProduct/AddPackagePage'
import EditPackagePage from './ManageProduct/EditPackagePage'
import AdminLandingPage from './AdminLandingPage'

const useQuery = () => {
	return new URLSearchParams(useLocation().search)
}

const AdminPage = (props) => {
	let query = useQuery()
	let status = query.get('status')

	let { path } = useRouteMatch()

	return (
		<div className='d-flex'>
			<div style={{ backgroundColor: '#f5f5f5' }} className='col-2'>
				<div className='mt-4' style={{ height: '100vh' }}>
					<AdminLinks status={status} />
				</div>
			</div>
			<div className='col-10'>
				<div className='mt-4 ml-2'>
					<Switch>
						<Route exact path={`${path}/`}>
							<AdminLandingPage />
						</Route>
						<Route exact path={`${path}/manage-product`}>
							<ManageProductPage />
						</Route>
						<Route exact path={`${path}/manage-product/add`}>
							<AddProductPage />
						</Route>
						<Route exact path={`${path}/manage-product/package`}>
							<ProductPackagePage />
						</Route>
						<Route exact path={`${path}/manage-product/edit-package/:id`}>
							<EditPackagePage />
						</Route>
						<Route exact path={`${path}/manage-product/new-package`}>
							<AddPackagePage />
						</Route>
						<Route path={`${path}/manage-product/package/detail/:id`}>
							<ProductPackageDetail />
						</Route>
						<Route path={`${path}/manage-product/edit/:id`}>
							<EditProductPage />
						</Route>
						<Route exact path={`${path}/transaction-status`}>
							<TransactionStatusPage />
						</Route>
						<Route path={`${path}/transaction-status/detail/:transactionId`}>
							<TransactionStatusDetailPage />
						</Route>
					</Switch>
				</div>
			</div>
		</div>
	)
}

export default AdminPage
