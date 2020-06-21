import React, { useEffect, useState } from 'react'
import { Doughnut, Line } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'
import Swal from 'sweetalert2'
import moment from 'moment'
import 'chartjs-plugin-labels'

import { FetchReport } from '../Redux/Action'
import CustomLoader from '../Components/CustomLoader'
import Axios from 'axios'
import { API_URL } from '../Support/API_URL'
import { API_REPORT_FAILED } from '../Redux/types'

const AdminLandingPage = (props) => {
	const dispatch = useDispatch()

	const data = useSelector((state) => state.report.data)
	const loading = useSelector((state) => state.report.loading)
	const error = useSelector((state) => state.report.error)

	const [monthOptions, setMonthOptions] = useState([])
	const [productOptions, setProductOptions] = useState([])
	const [selectMonth, setSelectMonth] = useState({})
	const [selectProduct, setSelectProduct] = useState({})

	useEffect(() => {
		const fetchOptions = async () => {
			try {
				const res = await Axios.get(`${API_URL}/report/select-options`)
				setSelectMonth(res.data.data.selectMonth[res.data.data.selectMonth.length - 1])
				setSelectProduct(res.data.data.selectProduct[0])
				setMonthOptions(res.data.data.selectMonth)
				setProductOptions(res.data.data.selectProduct)
			} catch (err) {
				dispatch({
					type: API_REPORT_FAILED,
					payload: {
						message: err.message,
						status: err.name,
					},
				})
			}
		}
		fetchOptions()
	}, [dispatch])

	useEffect(() => {
		window.scrollTo(0, 0)
		if (selectMonth.value && selectProduct.value) {
			dispatch(FetchReport(selectMonth.value, selectProduct.value ? selectProduct.value : null))
		}
	}, [dispatch, selectMonth, selectProduct])

	const countFloat = (current, prev) => {
		let result = ((current / prev) * 100 - 100).toFixed(2)
		if (result >= 0) {
			return (
				<span className='text-success'>
					<FaAngleUp /> {isFinite(result) ? result : 100.0}%
				</span>
			)
		} else {
			return (
				<span className='text-danger'>
					<FaAngleDown /> {result}%
				</span>
			)
		}
	}

	if (loading) return <CustomLoader />
	if (error) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Something went wrong!',
			footer: '<a href="#">Refresh Page</a>',
		})
	}
	return (
		<div className='row'>
			<div className='col-8'>
				{data.mostPopular && (
					<div className='p-3 shadow'>
						<Doughnut
							data={data.mostPopular}
							options={{
								responsive: true,
								title: { display: true, text: data.mostPopular.datasets[0].label },
								legend: { position: 'top', display: true, align: 'start' },
								plugins: {
									labels: {
										render: 'value',
										fontColor: '#fff',
										fontStyle: 'strong',
										fontSize: 14,
										textShadow: true,
									},
								},
							}}
						/>
					</div>
				)}
			</div>
			<div className='col-4 pl-3 pr-3'>
				<div style={{ height: '100%' }} className=' d-flex flex-column justify-content-between'>
					<Select options={monthOptions} onChange={(e) => setSelectMonth(e)} value={selectMonth} />
					{data.revenue && (
						<div className='shadow pl-3 pt-2' style={{ height: '40%' }}>
							<h3 className='text-center'>Revenue</h3>
							<p style={{ fontSize: '1.5em', margin: 0 }}>
								<strong>{moment(`${data.reportDate.year}${data.reportDate.month}`, 'YYYYM').format('MMMM YYYY')}</strong>:
							</p>
							<p>
								Rp{data.revenue.currentRevenue.toLocaleString('id-ID')},00{' '}
								{data.revenue.currentRevenue && countFloat(data.revenue.currentRevenue, data.revenue.prevRevenue)}
							</p>
							<p style={{ fontSize: '0.8em', margin: 0 }}>
								<strong>{moment(`${data.reportDate.year}${data.reportDate.month - 1}`, 'YYYYM').format('MMMM YYYY')}</strong>:
							</p>
							<p> Rp{data.revenue.prevRevenue.toLocaleString('id-ID')},00</p>
						</div>
					)}
					{data.sold && (
						<div className='shadow pl-3 pt-2' style={{ height: '40%' }}>
							<h3 className='text-center'>Items sold</h3>
							<p style={{ fontSize: '1.5em', margin: 0 }}>
								<strong>{moment(`${data.reportDate.year}${data.reportDate.month}`, 'YYYYM').format('MMMM YYYY')}</strong>:
							</p>
							<p>
								{data.sold.currentSold} units {data.sold.currentSold && countFloat(data.sold.currentSold, data.sold.prevSold)}
							</p>
							<p style={{ fontSize: '0.8em', margin: 0 }}>
								<strong>{moment(`${data.reportDate.year}${data.reportDate.month - 1}`, 'YYYYM').format('MMMM YYYY')}</strong>:
							</p>
							<p>{data.sold.prevSold} units</p>
						</div>
					)}
				</div>
			</div>
			<div className='col-12'>
				{data.productChartData && (
					<React.Fragment>
						<div className='row justify-content-center col-12 mb-3 mt-4'>
							<div className='col-6'>
								{selectProduct && <Select options={productOptions} value={selectProduct} onChange={(e) => setSelectProduct(e)} />}
							</div>
						</div>
						{selectProduct.value !== null && (
							<div style={{ height: '50vh' }}>
								<Line
									data={data.productChartData}
									options={{
										maintainAspectRatio: false,
										responsive: true,
										title: { display: true, text: `${selectProduct.label} Monthly Views` },
										legend: { display: false },
										plugins: {
											labels: {
												render: 'value',
												fontColor: '#fff',
												fontStyle: 'strong',
												fontSize: 14,
												textShadow: true,
											},
										},
									}}
								/>
							</div>
						)}
					</React.Fragment>
				)}
			</div>
		</div>
	)
}

export default AdminLandingPage
