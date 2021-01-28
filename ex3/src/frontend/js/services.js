class Services {
	constructor() {}

	/* START MAIN HTTP REQUEST */

	/**
	 * @class getData
	 * @description using fetch to get data
	 * @param {string} url endpoint
	 * @param {string} method POST, GET, PUT, DELETE, etc.
	 * @param {object} data data to send
	 */
	async getData(url = '', method = 'GET') {
		let fetchOption = {
			method: method, //Accepted GET, HEAD
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'omit', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json',
			},
			redirect: 'follow', 
			referrerPolicy: 'no-referrer',
		};


		const response = await fetch(url, fetchOption);
		return response.json();
    }
    
}

export default Services;