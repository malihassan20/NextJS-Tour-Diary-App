import cookie from 'react-cookies';

export function getCurrentDate() {
	const today = new Date();
	let dd = today.getDate();
	let mm = today.getMonth() + 1; //January is 0!
	const yyyy = today.getFullYear();

	if (dd < 10) {
		dd = `0${dd}`;
	}

	if (mm < 10) {
		mm = `0${mm}`;
	}
	return `${yyyy}-${mm}-${dd}`;
}

export function disabledDate(current) {
	//disable future dates
	return current && current.valueOf() > Date.now();
}

export function allowSpecificDates(current) {
	const tour = cookie.load('tour');
	//enable dates which are within the tour range dates
	if (tour) {
		return !(
			current.valueOf() >= new Date(tour.metadata.start_date) &&
			current.valueOf() <= new Date(tour.metadata.end_date)
		);
	}

	//disable future dates
	return current && current.valueOf() > Date.now();
}

export function sortArr(arr) {
	//ascending order
	return arr.sort((a, b) => new Date(a.metadata.date) - new Date(b.metadata.date));
}

export function getTourStartDate() {
	const tour = cookie.load('tour');
	//enable dates which are within the tour range dates
	if (tour) {
		return new Date(tour.metadata.start_date);
	}

	return getCurrentDate();
}

export function getCurrentTour() {
	const tour = cookie.load('tour');
	if (tour) {
		return tour;
	}
	return null;
}
