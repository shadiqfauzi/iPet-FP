import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

const ManageProductPagination = (props) => {
	let { totalActiveProducts, currentPage } = props
	return (
		<Pagination aria-label='Page navigation example'>
			<PaginationItem disabled>
				<PaginationLink first href='#' />
			</PaginationItem>
			<PaginationItem disabled>
				<PaginationLink previous href='#' />
			</PaginationItem>

			<PaginationItem active>
				<PaginationLink href='#1'>1</PaginationLink>
			</PaginationItem>
			<PaginationItem>
				<PaginationLink href='#2'>2</PaginationLink>
			</PaginationItem>
			<PaginationItem>
				<PaginationLink href='#3'>3</PaginationLink>
			</PaginationItem>
			<PaginationItem>
				<PaginationLink href='#4'>4</PaginationLink>
			</PaginationItem>
			<PaginationItem>
				<PaginationLink href='#5'>5</PaginationLink>
			</PaginationItem>
			<PaginationItem>
				<PaginationLink next href='#' />
			</PaginationItem>
			<PaginationItem>
				<PaginationLink last href='#' />
			</PaginationItem>
		</Pagination>
	)
}

export default ManageProductPagination
