export const API_URL = 'https://chadmuro-jordan-api.herokuapp.com';

export const fromImageToUrl = image => {
	if (!image) {
		return '/vercel.svg';
	}

	if (image.url.indexOf('/') === 0) {
		return `${API_URL}${image.url}`;
	}

	return image.url;
};