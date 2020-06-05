import React from 'react'
import Loader from 'react-loader-spinner'
import { Container } from 'reactstrap'

const CustomLoader = () => {
	const styles = {
		container: {
			paddingTop: '20px',
			display: 'flex',
			justifyContent: 'center',
		},
	}

	return (
		<Container style={styles.container}>
			<Loader type='Puff' color='#000' height={100} width={100} />
		</Container>
	)
}

export default CustomLoader
