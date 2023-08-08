import { FC, useMemo, useState } from "react"
import styles from "./Filters.module.css"
import { FILTER_SEARCH_IN_LIST, FILTER_SORTING_LIST, SECTION_EVERYTHING, SECTION_TOP_HEADLINES, TOP_COUNTRIES, TOP_LANGUAGES, TOP_TITLES } from "../../utils/constants"
import { useFilterContext } from "../../contexts/filterContext"
import cn from "classnames"

export const Filters: FC = () => {
	const [isVisibleFilters, setIsVisibleFilters] = useState<boolean>(false)
	const [searchValue, setSearchValue] = useState<string>("")
	const { section, setSection, category, setCategory, country, setCountry, language, setLanguage, searchIn, setSearchIn, sort, setSort, setSearch } = useFilterContext()

	const renderTopHeadlines = (title: string, state: string, setState: (state: string) => void, content: { name: string; value: string }[]) => {
		return (
			<div className={styles.top_headlines_title}>
				{title}:{" "}
				{content.map((title) => {
					return (
						<button
							key={title.name}
							className={cn(styles.toggle_button, {
								[styles.active]: state === title.value,
							})}
							onClick={() => setState(title.value)}
						>
							{title.name}
						</button>
					)
				})}
			</div>
		)
	}

	const memoizedFilterSearchInList = useMemo(() => FILTER_SEARCH_IN_LIST, [])
	const memoizedTopLanguages = useMemo(() => TOP_LANGUAGES, [])
	const memoizedFilterSortingList = useMemo(() => FILTER_SORTING_LIST, [])

	const memoizedRenderTopHeadlines = useMemo(() => {
		return renderTopHeadlines
	}, [])

	return (
		<div className={styles.container}>
			<button className={styles.change_button} onClick={() => setIsVisibleFilters((prev) => !prev)}>
				Изменить фильтры
			</button>
			<div
				className={cn(styles.filter_block, {
					[styles.visible]: isVisibleFilters,
				})}
			>
				<div className={styles.search_block}>
					<input className={styles.search} onChange={(e) => setSearchValue(e.target.value)} type='text' placeholder='Поиск по новостям' />
					<button onClick={() => setSearch(searchValue)} className={styles.search_button}>
						Поиск
					</button>
				</div>

				{memoizedRenderTopHeadlines("Искать по", searchIn, setSearchIn, memoizedFilterSearchInList)}
				{memoizedRenderTopHeadlines("Язык", language, setLanguage, memoizedTopLanguages)}
				{memoizedRenderTopHeadlines("Сортировка", sort, setSort, memoizedFilterSortingList)}
				<div className={styles.toggle_block}>
					<button
						className={cn(styles.toggle_button, {
							[styles.active]: section === SECTION_TOP_HEADLINES,
						})}
						onClick={() => setSection(SECTION_TOP_HEADLINES)}
					>
						Популярные
					</button>
					<button
						className={cn(styles.toggle_button, {
							[styles.active]: section !== SECTION_TOP_HEADLINES,
						})}
						onClick={() => setSection(SECTION_EVERYTHING)}
					>
						Все
					</button>
				</div>
				<div
					className={cn(styles.top_headlines_block, {
						[styles.visible]: section === SECTION_TOP_HEADLINES,
					})}
				>
					{memoizedRenderTopHeadlines("Тема", category, setCategory, TOP_TITLES)}
					{memoizedRenderTopHeadlines("Страна", country, setCountry, TOP_COUNTRIES)}
				</div>
			</div>
		</div>
	)
}
