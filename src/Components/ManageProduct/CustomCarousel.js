import React, { useState } from 'react'
import {
	Carousel,
	CarouselItem,
	CarouselControl,
	CarouselIndicators,
} from 'reactstrap'

const CustomCarousel = (props) => {
	const items = props.images

	const [activeIndex, setActiveIndex] = useState(0)
	const [animating, setAnimating] = useState(false)

	const next = () => {
		if (animating) return
		const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1
		setActiveIndex(nextIndex)
	}

	const previous = () => {
		if (animating) return
		const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1
		setActiveIndex(nextIndex)
	}

	const goToIndex = (newIndex) => {
		if (animating) return
		setActiveIndex(newIndex)
	}

	const slides = items.map((item) => {
		return (
			<CarouselItem
				onExiting={() => setAnimating(true)}
				onExited={() => setAnimating(false)}
				key={item.src}
			>
				<div
					style={{
						width: '200px',
                        height: '150px',
					}}
				>
					<img
						style={{ width: '100%', height:'100%', objectFit: 'contain'}}
						src={item.src}
						alt='Product Images'
					/>
				</div>
			</CarouselItem>
		)
	})

	return (
		<div style={{ width: '200px' }}>
			<Carousel activeIndex={activeIndex} next={next} previous={previous}>
				<CarouselIndicators
					items={items}
					activeIndex={activeIndex}
					onClickHandler={goToIndex}
				/>
				{slides}
				<CarouselControl
					direction='prev'
					directionText='Previous'
					onClickHandler={previous}
				/>
				<CarouselControl
					direction='next'
					directionText='Next'
					onClickHandler={next}
				/>
			</Carousel>
		</div>
	)
}

export default CustomCarousel
