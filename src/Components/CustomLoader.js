import React from 'react'
import Loader from 'react-loader-spinner'
import { Container } from 'reactstrap'

const CustomLoader = () => {
	const styles = {
		container: {
			paddingTop: '35vh',
			display: 'flex',
			justifyContent: 'center',
		},
	}

	return (
		<Container style={styles.container}>
			<Loader type='Puff' color='#BEE5EB' height={100} width={100} />
		</Container>
	)
}

export default CustomLoader
