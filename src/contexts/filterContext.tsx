import React, { createContext, useContext, useState } from "react"
import { FILTER_SEARCH_IN_LIST, FILTER_SORTING_LIST, SECTION_TOP_HEADLINES, TOP_COUNTRIES, TOP_LANGUAGES, TOP_TITLES } from "../utils/constants"

interface FilterContextType {
	section: string
	updateSection: (section: string) => void
	category: string
	updateCategory: (category: string) => void
	country: string
	updateCountry: (country: string) => void
	language: string
	updateLanguage: (language: string) => void
	search: string
	updateSearch: (search: string) => void
	searchIn: string
	updateSearchIn: (searchIn: string) => void
	sort: string
	updateSort: (sort: string) => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export const useFilterContext = () => {
	const context = useContext(FilterContext)
	if (!context) {
		throw new Error("useAppContext must be used within an AppProvider")
	}
	return context
}

interface FilterProviderProps {
	children: React.ReactNode
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
	const [section, setSection] = useState<string>(SECTION_TOP_HEADLINES)
	const [category, setCategory] = useState<string>(TOP_TITLES[0].value)
	const [country, setCountry] = useState<string>(TOP_COUNTRIES[0].value)
	const [language, setLanguage] = useState<string>(TOP_LANGUAGES[0].value)
	const [search, setSearch] = useState<string>((category || language || country) !== "" && section === SECTION_TOP_HEADLINES ? "" : "all")
	const [sort, setSort] = useState<string>(FILTER_SORTING_LIST[0].value)
	const [searchIn, setSearchIn] = useState<string>(FILTER_SEARCH_IN_LIST[0].value)

	const updateSection = (newSection: string) => {
		setSection(newSection)
	}
	const updateCategory = (newCategory: string) => {
		setCategory(newCategory)
	}
	const updateCountry = (newCountry: string) => {
		setCountry(newCountry)
	}
	const updateLanguage = (newLanguage: string) => {
		setLanguage(newLanguage)
	}
	const updateSearch = (newSearch: string) => {
		setSearch(newSearch)
	}
	const updateSearchIn = (newSearchIn: string) => {
		setSearchIn(newSearchIn)
	}
	const updateSort = (newSort: string) => {
		setSort(newSort)
	}

	return <FilterContext.Provider value={{ sort, updateSort, searchIn, updateSearchIn, search, updateSearch, section, updateSection, category, updateCategory, country, updateCountry, language, updateLanguage }}>{children}</FilterContext.Provider>
}
