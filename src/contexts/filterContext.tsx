import React, { createContext, useContext, useState } from "react"
import { FILTER_SEARCH_IN_LIST, FILTER_SORTING_LIST, SECTION_TOP_HEADLINES, TOP_COUNTRIES, TOP_LANGUAGES, TOP_TITLES } from "../utils/constants"

interface FilterContextType {
	section: string
	setSection: (section: string) => void
	category: string
	setCategory: (category: string) => void
	country: string
	setCountry: (country: string) => void
	language: string
	setLanguage: (language: string) => void
	search: string
	setSearch: (search: string) => void
	searchIn: string
	setSearchIn: (searchIn: string) => void
	sort: string
	setSort: (sort: string) => void
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

	return <FilterContext.Provider value={{ sort, setSort, searchIn, setSearchIn, search, setSearch, section, setSection, category, setCategory, country, setCountry, language, setLanguage }}>{children}</FilterContext.Provider>
}
