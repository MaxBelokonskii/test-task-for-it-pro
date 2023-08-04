import { FC, useState } from "react"
import styles from "./Filters.module.css"
import { FILTER_SEARCH_IN_LIST, FILTER_SORTING_LIST, SECTION_EVERYTHING, SECTION_TOP_HEADLINES, TOP_COUNTRIES, TOP_LANGUAGES, TOP_TITLES } from "../../utils/constants"
import { useFilterContext } from "../../contexts/filterContext"

export const Filters: FC = () => {
	const [isVisibleFilters, setIsVisibleFilters] = useState<boolean>(false)
	const [searchValue, setSearchValue] = useState<string>("")
	const { section, updateSection, category, updateCategory, country, updateCountry, language, updateLanguage, searchIn, updateSearchIn, sort, updateSort, updateSearch } = useFilterContext()

	const renderTopHeadlines = (title: string, state: string, setState: (state: string) => void, content: { name: string; value: string }[]) => {
		return (
			<div className={styles.top_headlines_title}>
				{title}:{" "}
				{content.map((title) => {
					return (
						<button key={title.name} className={`${styles.toggle_button} ${state === title.value ? styles.active : ""}`} onClick={() => setState(title.value)}>
							{title.name}
						</button>
					)
				})}
			</div>
		)
	}

	return (
		<div className={styles.container}>
			<button className={styles.change_button} onClick={() => setIsVisibleFilters((prev) => !prev)}>
				Изменить фильтры
			</button>
			<div className={`${styles.filter_block} ${isVisibleFilters ? styles.visible : ""}`}>
				<div className={styles.search_block}>
					<input className={styles.search} onChange={(e) => setSearchValue(e.target.value)} type='text' placeholder='Поиск по новостям' />
					<button onClick={() => updateSearch(searchValue)} className={styles.search_button}>
						Поиск
					</button>
				</div>

				{renderTopHeadlines("Искать по", searchIn, updateSearchIn, FILTER_SEARCH_IN_LIST)}
				{renderTopHeadlines("Язык", language, updateLanguage, TOP_LANGUAGES)}
				{renderTopHeadlines("Сортировка", sort, updateSort, FILTER_SORTING_LIST)}
				<div className={styles.toggle_block}>
					<button className={`${styles.toggle_button} ${section === SECTION_TOP_HEADLINES ? styles.active : ""}`} onClick={() => updateSection(SECTION_TOP_HEADLINES)}>
						Популярные
					</button>
					<button className={`${styles.toggle_button} ${section === SECTION_TOP_HEADLINES ? "" : styles.active}`} onClick={() => updateSection(SECTION_EVERYTHING)}>
						Все
					</button>
				</div>
				<div className={`${styles.top_headlines_block} ${section === SECTION_TOP_HEADLINES ? styles.visible : ""}`}>
					{renderTopHeadlines("Тема", category, updateCategory, TOP_TITLES)}
					{renderTopHeadlines("Страна", country, updateCountry, TOP_COUNTRIES)}
				</div>
			</div>
		</div>
	)
}
