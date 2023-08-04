import { useLocation, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getNews } from "../../requests/news"
import { INews } from "../../utils/types"
import styles from "./NewsPage.module.css"

export const NewsPage = () => {
	const { title } = useParams()
	const location = useLocation()
	const searchParams = new URLSearchParams(location.search)
	const section = searchParams.get("section")

	const [news, setNews] = useState<INews>()

	useEffect(() => {
		;(async () => {
			try {
				if (section !== null) {
					const res = await getNews(section, { q: title })
					setNews(res.articles[0])
				}
			} catch (e) {
				console.error(e)
			}
		})()
	}, [])

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>{news?.title}</h1>
			<img src={news?.urlToImage} alt='news' />
			<p className={styles.content}>{news?.content}</p>
			<a className={styles.link} href={news?.url}>
				Ссылка на источник
			</a>
			<a className={styles.link} href='/news'>
				На главную
			</a>
		</div>
	)
}
