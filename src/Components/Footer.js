import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Col } from 'reactstrap'
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from 'mdbreact'

class Footer extends Component {
    state = {}

    render() {
        return (
            <MDBFooter color='blue' className='font-small pt-4 mt-4 footer'>
                <MDBContainer fluid className='text-center text-md-left'>
                    <MDBRow>
                        <MDBCol md='4'>
                            <h5 className='title'>STAY CONNECTED</h5>
                            <Form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for='exampleEmail'>Email</Label>
                                        <Input
                                            type='email'
                                            name='email'
                                            id='exampleEmail'
                                            placeholder='Your Email Address'
                                        />
                                    </FormGroup>
                                </Col>
                            </Form>
                        </MDBCol>
                        <MDBCol md='4'>
                            <h5 className='title'>Products</h5>
                            <ul>
                                <li className='list-unstyled'>
                                    <a href='#!'>Link 1</a>
                                </li>
                                <li className='list-unstyled'>
                                    <a href='#!'>Link 2</a>
                                </li>
                                <li className='list-unstyled'>
                                    <a href='#!'>Link 3</a>
                                </li>
                                <li className='list-unstyled'>
                                    <a href='#!'>Link 4</a>
                                </li>
                            </ul>
                        </MDBCol>
                        <MDBCol md='4'>
                            <h1>lol</h1>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <div className='footer-copyright text-center py-3'>
                    <MDBContainer fluid>
                        &copy; {new Date().getFullYear()} Copyright:{' '}
                        <a href='https://www.mdbbootstrap.com'> Ipet.com </a>
                    </MDBContainer>
                </div>
            </MDBFooter>
        )
    }
}

export default Footer
