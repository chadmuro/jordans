import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.scss';

import { fromImageToUrl, API_URL } from '../utils/urls';

export default function Home({ shoes }) {
	console.log(shoes);

	return (
		<div>
			<Head>
				<title>History of Air Jordan</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className={styles.grid}>
				{shoes.map(shoe => (
					<div key={shoe.name}>
						<Link href={`/jordans/${shoe.slug}`}>
							<a>
								<div className={styles.card}>
									<div className={styles.image}>
										<img
											
											src={fromImageToUrl(shoe.home_image)}
											alt={shoe.name}
										/>
									</div>
									<div className={styles.name}>{shoe.name}</div>
								</div>
							</a>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}

export async function getStaticProps() {
	const shoes_res = await fetch(`${API_URL}/jordans/?_sort=id:ASC`);
	const shoes = await shoes_res.json();

	return {
		props: {
			shoes,
		},
	};
}
