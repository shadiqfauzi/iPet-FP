import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import { useSelector } from 'react-redux'

const ManageProductPagination = (props) => {
	const { currentPage, setCurrentPage, handlePage } = props

	const totalActiveProducts = useSelector((state) => state.manageProduct.totalActiveProducts)
	const totalPage = Math.ceil(totalActiveProducts / 5)

	const renderPageButtons = () => {
		const result = []
		for (let i = 0; i < totalPage; i++) {
			result.push(
				<PaginationItem key={i} active={currentPage === i ? true : false}>
					<PaginationLink
						onClick={() => {
							setCurrentPage(i)
							if (i !== currentPage) handlePage(i)
							window.scrollTo(0, 0)
						}}
					>
						{`${i + 1}`}
					</PaginationLink>
				</PaginationItem>
			)
		}
		return result
	}

	return (
		<Pagination aria-label='Page navigation example'>
			<PaginationItem disabled={currentPage + 1 === 1 ? true : false}>
				<PaginationLink
					first
					onClick={() => {
						setCurrentPage(0)
						handlePage(0)
						window.scrollTo(0, 0)
					}}
				/>
			</PaginationItem>
			<PaginationItem disabled={currentPage + 1 === 1 ? true : false}>
				<PaginationLink
					previous
					onClick={() => {
						setCurrentPage((prevState) => prevState - 1)
						handlePage(currentPage - 1)
						window.scrollTo(0, 0)
					}}
				/>
			</PaginationItem>
			{renderPageButtons()}
			<PaginationItem disabled={currentPage + 1 === totalPage ? true : false}>
				<PaginationLink
					next
					onClick={() => {
						setCurrentPage((prevState) => prevState + 1)
						handlePage(currentPage + 1)
						window.scrollTo(0, 0)
					}}
				/>
			</PaginationItem>
			<PaginationItem disabled={currentPage + 1 === totalPage ? true : false}>
				<PaginationLink
					last
					onClick={() => {
						setCurrentPage(totalPage - 1)
						handlePage(totalPage - 1)
						window.scrollTo(0, 0)
					}}
				/>
			</PaginationItem>
		</Pagination>
	)
}

export default ManageProductPagination
