import Head from 'next/head';
import { fromImageToUrl, API_URL } from '../../utils/urls';

const Shoe = ({ shoe }) => {
	return (
		<div>
			<Head>
				<title>History of Air Jordan || {shoe.title}</title>
				<meta name="description" content={shoe.name} />
			</Head>
            <h3>{shoe.name}</h3>
            <img src={fromImageToUrl(shoe.hero_image)} alt={shoe.name} />
            <h3>{shoe.name}</h3>
            <p>{shoe.description}</p>
		</div>
	);
};

export async function getStaticProps({ params: { slug } }) {
	const shoes_res = await fetch(`${API_URL}/jordans/?slug=${slug}`);
	const found = await shoes_res.json();

	return {
		props: {
			shoe: found[0],
		},
	};
}

export async function getStaticPaths() {
	const shoes_res = await fetch(`${API_URL}/jordans/`);
	const shoes = await shoes_res.json();

	return {
		paths: shoes.map(shoe => ({
			params: { slug: String(shoe.slug) },
		})),
		fallback: false,
	};
}

export default Shoe;
