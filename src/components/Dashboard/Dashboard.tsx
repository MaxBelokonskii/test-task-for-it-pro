import { FC, useEffect, useState } from "react"
import { getNews } from "../../requests/news"
import styles from "./Dashboard.module.css"

import { Filters } from "../Filters"
import { DashboardTable } from "../DashboardTable"
import { useFilterContext } from "../../contexts/filterContext"
import { usePaginationContext } from "../../contexts/paginationContext"
import { SECTION_TOP_HEADLINES } from "../../utils/constants"
import { useRequestNewsContext } from "../../contexts/RequestNewsContext"

export const Dashboard: FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const { section, category, country, language, search, searchIn, sort } = useFilterContext()
	const { page, perPage } = usePaginationContext()
	const { setNews, setTotalItems } = useRequestNewsContext()

	const paramsDefault = {
		page: page,
		pageSize: perPage,
		q: search,
		from: "2023-07-20",
		sortBy: sort,
		searchIn: searchIn,
		language: language,
	}

	const paramsTopHeadlines = {
		category: category,
		country: country,
	}

	const sectionParams = section === SECTION_TOP_HEADLINES && paramsTopHeadlines

	useEffect(() => {
		;(async () => {
			try {
				setIsLoading(true)
				const res = await getNews(section, { ...paramsDefault, ...sectionParams })
				setNews(res.articles)
				setTotalItems(res.totalResults)
			} catch (e) {
				console.error(e)
			} finally {
				setIsLoading(false)
			}
		})()
	}, [section, page, perPage, search, sort, searchIn, language, category, country])
	return (
		<div className={styles.container}>
			<div className={styles.title_block}>
				<h1 className={styles.title}>Все новости</h1>
				<h3 className={styles.subtitle}>Вы можете выбрать необходимые вам фильтры и настроить дашборд по вашим требованиям</h3>
			</div>
			<Filters />
			<DashboardTable isLoading={isLoading} />
		</div>
	)
}
