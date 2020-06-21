import React, { Component } from 'react'
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
} from 'reactstrap'

class LandingPage extends Component {
    state = {}

    render() {
        return (
            <div>
                <div className='Parallax'>
                    <h1 className='slogan'>WELCOME TO IPET</h1>
                    <h4 className='slogan2'>WE ARE GROUP ... ... .. </h4>
                    <div className='buleud' style={{ marginTop: '5%' }}>
                        <svg
                            className='bi bi-chevron-double-down'
                            width='2em'
                            height='2em'
                            viewBox='0 0 16 16'
                            fill='white'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                fillRule='evenodd'
                                d='M1.646 6.646a.5.5 0 01.708 0L8 12.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z'
                                clipRule='evenodd'
                            />
                            <path
                                fillRule='evenodd'
                                d='M1.646 2.646a.5.5 0 01.708 0L8 8.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z'
                                clipRule='evenodd'
                            />
                        </svg>
                    </div>
                </div>
                <div className='content'>
                    <h1 className='AbUs'>CATEGORIES</h1>
                    <div className='arrow'>
                        <svg
                            className='bi bi-chevron-down'
                            width='2em'
                            height='3em'
                            viewBox='0 0 16 16'
                            fill='grey'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                fillRule='evenodd'
                                d='M1.646 4.646a.5.5 0 01.708 0L8 10.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z'
                                clipRule='evenodd'
                            />
                        </svg>
                        <div
                            className='x1'
                            style={{ marginBottom: '30px' }}
                        ></div>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-sm'>
                                    <Card className='card-d'>
                                        <CardImg
                                            top
                                            width='100%'
                                            src={require('../Public/Assets/info1.jpg')}
                                            alt='Card image cap'
                                        />
                                        <CardBody>
                                            <CardTitle className='titleName'>
                                                Toys
                                            </CardTitle>
                                            <CardSubtitle>
                                                Card subtitle
                                            </CardSubtitle>
                                            <CardText>
                                                Find every kind of toy for every
                                                kind of dog or cat at iPet.
                                                You'll find we carry a variety
                                                of appropriately-sized toys for
                                                your pet
                                            </CardText>
                                        </CardBody>
                                    </Card>
                                </div>
                                <div className='col-sm'>
                                    <Card className='card-d'>
                                        <CardImg
                                            top
                                            width='100%'
                                            src={require('../Public/Assets/info2.jpg')}
                                            alt='Card image cap'
                                        />
                                        <CardBody>
                                            <CardTitle className='titleName'>
                                                Foods
                                            </CardTitle>
                                            <CardText>
                                                Finding the right dog and cat
                                                food for your pet is easy at
                                                iPet. With top food brands you
                                                trust, you'll find a wide
                                                variety of healthy food.
                                            </CardText>
                                        </CardBody>
                                    </Card>
                                </div>
                                <div className='col-sm'>
                                    <Card className='card-d'>
                                        <CardImg
                                            top
                                            width='100%'
                                            src={require('../Public/Assets/info3.jpg')}
                                            alt='Card image cap'
                                        />
                                        <CardBody>
                                            <CardTitle className='titleName'>
                                                Medicines
                                            </CardTitle>
                                            <CardText>
                                                Help them look and feel their
                                                best. At iPet we carry pet
                                                health care and wellness
                                                products, such as
                                                over-the-counter medications.
                                            </CardText>
                                        </CardBody>
                                    </Card>
                                </div>
                                <div className='col-sm'>
                                    <Card className='card-d'>
                                        <CardImg
                                            top
                                            width='100%'
                                            src={require('../Public/Assets/info4.jpg')}
                                            alt='Card image cap'
                                        />
                                        <CardBody>
                                            <CardTitle className='titleName'>
                                                Hygiene
                                            </CardTitle>
                                            <CardText>
                                                Keep your home smelling its best
                                                with cleaning supplies to tackle
                                                the toughest odors and stains.
                                                healthy and safe so you can play
                                                with your best friend any time.
                                            </CardText>
                                        </CardBody>
                                    </Card>
                                </div>
                                <div className='col-sm'>
                                    <Card className='card-d'>
                                        <CardImg
                                            top
                                            width='100%'
                                            src={require('../Public/Assets/info5.jpg')}
                                            alt='Card image cap'
                                        />
                                        <CardBody>
                                            <CardTitle className='titleName'>
                                                And Many More
                                            </CardTitle>
                                            <CardText>
                                                mkdfksdjkfksjkfjkdjs
                                            </CardText>
                                        </CardBody>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='content2'>
                    <h1 className='AbUs'>OUR SERVICE</h1>
                    <div className='arrow'>
                        <svg
                            className='bi bi-chevron-down'
                            width='2em'
                            height='3em'
                            viewBox='0 0 16 16'
                            fill='grey'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                fillRule='evenodd'
                                d='M1.646 4.646a.5.5 0 01.708 0L8 10.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z'
                                clipRule='evenodd'
                            />
                        </svg>
                        <div
                            className='x1'
                            style={{ marginBottom: '30px' }}
                        ></div>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-sm'>
                                    <svg
                                        className='bi bi-house-fill'
                                        width='5em'
                                        height='5em'
                                        viewBox='0 0 16 16'
                                        fill='#717171'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            fillRule='evenodd'
                                            d='M8 3.293l6 6V13.5a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 012 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5z'
                                            clipRule='evenodd'
                                        />
                                        <path
                                            fillRule='evenodd'
                                            d='M7.293 1.5a1 1 0 011.414 0l6.647 6.646a.5.5 0 01-.708.708L8 2.207 1.354 8.854a.5.5 0 11-.708-.708L7.293 1.5z'
                                            clipRule='evenodd'
                                        />
                                    </svg>
                                    <CardTitle className='title'>
                                        HOME
                                    </CardTitle>
                                    "Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam"
                                </div>
                                <div className='col-sm'>
                                    <svg
                                        className='bi bi-heart-half'
                                        width='5em'
                                        height='5em'
                                        viewBox='0 0 16 16'
                                        fill='#717171'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            fillRule='evenodd'
                                            d='M8 1.314C3.562-3.248-7.534 4.735 8 15V1.314z'
                                            clipRule='evenodd'
                                        />
                                        <path
                                            fillRule='evenodd'
                                            d='M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 01.176-.17C12.72-3.042 23.333 4.867 8 15z'
                                            clipRule='evenodd'
                                        />
                                    </svg>
                                    <CardTitle className='title'>
                                        LOVE
                                    </CardTitle>
                                    "Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam"
                                </div>
                                <div className='col-sm'>
                                    <svg
                                        className='bi bi-shield-lock'
                                        width='5em'
                                        height='5em'
                                        viewBox='0 0 16 16'
                                        fill='#717171'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            fillRule='evenodd'
                                            d='M5.443 1.991a60.17 60.17 0 00-2.725.802.454.454 0 00-.315.366C1.87 7.056 3.1 9.9 4.567 11.773c.736.94 1.533 1.636 2.197 2.093.333.228.626.394.857.5.116.053.21.089.282.11A.73.73 0 008 14.5c.007-.001.038-.005.097-.023.072-.022.166-.058.282-.111.23-.106.525-.272.857-.5a10.197 10.197 0 002.197-2.093C12.9 9.9 14.13 7.056 13.597 3.159a.454.454 0 00-.315-.366c-.626-.2-1.682-.526-2.725-.802C9.491 1.71 8.51 1.5 8 1.5c-.51 0-1.49.21-2.557.491zm-.256-.966C6.23.749 7.337.5 8 .5c.662 0 1.77.249 2.813.525a61.09 61.09 0 012.772.815c.528.168.926.623 1.003 1.184.573 4.197-.756 7.307-2.367 9.365a11.191 11.191 0 01-2.418 2.3 6.942 6.942 0 01-1.007.586c-.27.124-.558.225-.796.225s-.526-.101-.796-.225a6.908 6.908 0 01-1.007-.586 11.192 11.192 0 01-2.417-2.3C2.167 10.331.839 7.221 1.412 3.024A1.454 1.454 0 012.415 1.84a61.11 61.11 0 012.772-.815z'
                                            clipRule='evenodd'
                                        />
                                        <path d='M9.5 6.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z' />
                                        <path d='M7.411 8.034a.5.5 0 01.493-.417h.156a.5.5 0 01.492.414l.347 2a.5.5 0 01-.493.585h-.835a.5.5 0 01-.493-.582l.333-2z' />
                                    </svg>
                                    <CardTitle className='title'>
                                        SECURITY
                                    </CardTitle>
                                    "Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam"
                                </div>
                                <div className='col-sm'>
                                    <svg
                                        className='bi bi-star'
                                        width='5em'
                                        height='5em'
                                        viewBox='0 0 16 16'
                                        fill='#717171'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            fillRule='evenodd'
                                            d='M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 00-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 00-.163-.505L1.71 6.745l4.052-.576a.525.525 0 00.393-.288l1.847-3.658 1.846 3.658a.525.525 0 00.393.288l4.052.575-2.906 2.77a.564.564 0 00-.163.506l.694 3.957-3.686-1.894a.503.503 0 00-.461 0z'
                                            clipRule='evenodd'
                                        />
                                    </svg>
                                    <CardTitle className='title'>
                                        STAR
                                    </CardTitle>
                                    "Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam"
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LandingPage
