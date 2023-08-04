import { FC } from "react"
import { INews } from "../../utils/types"
import styles from "./DashboardElement.module.css"
import dayjs from "dayjs"
import { useFilterContext } from "../../contexts/filterContext"
import { Link } from "react-router-dom"

interface DashboardElementProps {
	news: INews
	isVisibleDate: boolean
	isVisibleTitle: boolean
	isVisibleDescription: boolean
	isVisibleAuthor: boolean
}

export const DashboardElement: FC<DashboardElementProps> = ({ news, isVisibleDate, isVisibleTitle, isVisibleDescription, isVisibleAuthor }) => {
	const { section } = useFilterContext()
	const day = dayjs(news.publishedAt).format("DD.MM.YYYY HH:mm")

	return (
		<Link to={`${encodeURIComponent(news.title)}?section=${section}`}>
			<div className={styles.container}>
				{isVisibleDate && <div className={styles.date}>{day}</div>}
				{isVisibleTitle && <div className={styles.title}>{news.title}</div>}
				{isVisibleDescription && <div className={styles.description}>{news.description}</div>}
				{isVisibleAuthor && <div className={styles.author}>{news.author || "-"}</div>}
			</div>
		</Link>
	)
}
