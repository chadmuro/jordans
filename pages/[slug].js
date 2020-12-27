import Head from 'next/head';
import styles from '../styles/Shoe.module.scss';

import { API_URL } from '../utils/urls';

const Shoe = ({ shoe }) => {
	return (
		<div className={styles.container}>
			<Head>
				<title>History of Air Jordan || {shoe.name}</title>
				<meta name="description" content={shoe.name} />
			</Head>

			<h3 className={styles.title}>{shoe.name}</h3>
			<img className={styles.hero} src={shoe.hero_image.url} alt={shoe.name} />
			<h3 className={styles.title}>{shoe.name}</h3>
			<h4 className={styles.subtitle}>Designer: {shoe.designer}</h4>
			<h4 className={styles.subtitle}>Released: {shoe.released_year}</h4>
			<p className={styles.description}>{shoe.description}</p>
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
