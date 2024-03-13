import { useRef, useState } from 'react';
import clsx from 'clsx';
import useLazyLoad from '../CustomHook/useLazyLoad';
import { Card } from './Card';
import { LoadingPosts } from './LoadingPosts';

export const Posts = () => {
	const triggerRef = useRef(null);
	const [pageNum, setPageNum] = useState(null);

	const API_URL = process.env.REACT_APP_API_URL;
	const NUM_PER_PAGE = 8;
	const TOTAL_PAGES = 2;

	const onGrabData = async (currentPage) => {
		setPageNum(currentPage);
		try {
			// Fetch data only if the current page is within the total pages limit
			const response = await fetch(
				`${API_URL}?_page=${currentPage}&_limit=${NUM_PER_PAGE}`
			);
			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error fetching data:', error);
			return [];
		}
	};

	const { data, loading } = useLazyLoad({ triggerRef, onGrabData });

	return (
		<>
			<div className="grid grid-cols-4 gap-4 content-start">
				{data.map((image, index) => {
					return (
						<Card
							key={index}
							owner={image.descriptions}
							imageUrl={image.ImageContainer}
						/>
					);
				})}
			</div>
			<div
				ref={triggerRef}
				className={clsx('trigger', { visible: loading })}
			>
				{pageNum !== TOTAL_PAGES && <LoadingPosts />}
			</div>
		</>
	);
};
