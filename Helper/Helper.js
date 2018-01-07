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
	return current && current.valueOf() < Date.now();
}

export function sortArr(arr) {
	//ascending order
	return arr.sort((a, b) => new Date(a.metadata.date) - new Date(b.metadata.date));
}
