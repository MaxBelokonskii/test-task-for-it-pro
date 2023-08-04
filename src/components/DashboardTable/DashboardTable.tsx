import { FC, useState } from "react"
import { DashboardElement } from "../DashboardElement"
import styles from "./DashboardTable.module.css"
import { Pagination } from "../Pagination"
import { useRequestNewsContext } from "../../contexts/RequestNewsContext"

interface DashboardTableProps {
	isLoading: boolean
}

export const DashboardTable: FC<DashboardTableProps> = ({ isLoading }) => {
	//состояния таблицы (видимость колонок)
	const [isVisibleDate, setIsVisibleDate] = useState<boolean>(true)
	const [isVisibleTitle, setIsVisibleTitle] = useState<boolean>(true)
	const [isVisibleDescription, setIsVisibleDescription] = useState<boolean>(true)
	const [isVisibleAuthor, setIsVisibleAuthor] = useState<boolean>(true)

	const [isVisibleChangeBlock, setIsVisibleChangeBlock] = useState<boolean>(false)
	const { news } = useRequestNewsContext()

	const toggleChangeBlock = () => {
		setIsVisibleChangeBlock((prev) => !prev)
	}
	return (
		<div className={styles.container}>
			<button onClick={toggleChangeBlock} className={styles.change_button}>
				Изменить дашборд
			</button>
			<div className={`${styles.change_table_block} ${isVisibleChangeBlock ? styles.visible : ""}`}>
				<label htmlFor='date'>
					<input type='checkbox' checked={isVisibleDate} onChange={() => setIsVisibleDate((prev) => !prev)} id='date' name='Дата публикации' /> Дата публикации
				</label>
				<label htmlFor='title'>
					<input type='checkbox' checked={isVisibleTitle} onChange={() => setIsVisibleTitle((prev) => !prev)} id='title' name='Заголовок' /> Заголовок
				</label>
				<label htmlFor='description'>
					<input type='checkbox' checked={isVisibleDescription} onChange={() => setIsVisibleDescription((prev) => !prev)} id='description' name='Описание' /> Краткое описание
				</label>
				<label htmlFor='description'>
					<input type='checkbox' checked={isVisibleAuthor} onChange={() => setIsVisibleAuthor((prev) => !prev)} id='author' name='Автор' /> Автор
				</label>
			</div>
			<div className={styles.table__title_block}>
				{isVisibleDate && <div className={styles.title_block_date}>Дата публикации</div>}
				{isVisibleTitle && <div className={styles.title_block_title}>Заголовок</div>}
				{isVisibleDescription && <div className={styles.title_block_description}>Краткое описание</div>}
				{isVisibleAuthor && <div className={styles.title_block_author}>Автор</div>}
			</div>

			{isLoading ? (
				<div className={styles.loading}>Загрузка...</div>
			) : !!news.length ? (
				news.map((news) => {
					return <DashboardElement key={news.title} news={news} isVisibleDate={isVisibleDate} isVisibleTitle={isVisibleTitle} isVisibleDescription={isVisibleDescription} isVisibleAuthor={isVisibleAuthor} />
				})
			) : (
				<div className={styles.loading}>Новостей нет</div>
			)}
			<Pagination />
		</div>
	)
}
