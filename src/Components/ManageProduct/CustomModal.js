import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container } from 'reactstrap'

const CustomModal = (props) => {
	const { className, toggle, modal, oneButton } = props

	return (
		<div>
			<Modal isOpen={modal} toggle={toggle} className={className}>
				<ModalHeader toggle={toggle}>{props.title}</ModalHeader>
				<ModalBody>
					<Container>{props.children}</Container>
				</ModalBody>
				<ModalFooter>
					<Button color='primary' onClick={props.onConfirm}>
						{props.confirmLabel}
					</Button>{' '}
					{oneButton ? null : (
						<Button color='secondary' onClick={toggle}>
							Cancel
						</Button>
					)}
				</ModalFooter>
			</Modal>
		</div>
	)
}

export default CustomModal
