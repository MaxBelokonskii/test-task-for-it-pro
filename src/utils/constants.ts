export const DEFAULT_URL = "https://newsapi.org/v2/"
export const API_KEY = "37e486430c9746de9bacd64a9c24cf0a"
export const SECTION_EVERYTHING = "everything"
export const SECTION_TOP_HEADLINES = "top-headlines"

export const TOP_TITLES = [
	{
		name: "Все",
		value: "",
	},
	{
		name: "Бизнес",
		value: "business",
	},
	{
		name: "Развлечения",
		value: "entertainment",
	},
	{
		name: "Общее",
		value: "general",
	},
	{
		name: "Здоровье",
		value: "health",
	},
	{
		name: "Наука",
		value: "science",
	},
	{
		name: "Спорт",
		value: "sports",
	},
	{
		name: "Технологии",
		value: "technology",
	},
]
export const TOP_COUNTRIES = [
	{
		name: "Все",
		value: "",
	},
	{
		name: "Россия",
		value: "ru",
	},
	{
		name: "CША",
		value: "us",
	},
	{
		name: "Германия",
		value: "de",
	},
	{
		name: "Канада",
		value: "ca",
	},
	{
		name: "Великобритания",
		value: "gb",
	},
]
export const TOP_LANGUAGES = [
	{
		name: "Все",
		value: "",
	},
	{
		name: "Русский",
		value: "ru",
	},
	{
		name: "Английский",
		value: "en",
	},
	{
		name: "Немецкий",
		value: "de",
	},
]

export const FILTER_SORTING_LIST = [
	{
		name: "Сначала новые",
		value: "publishedAt",
	},
	{
		name: "По популярности",
		value: "popularity",
	},
	{
		name: "Актуальные по поиску",
		value: "relevancy",
	},
]

export const FILTER_SEARCH_IN_LIST = [
	{
		name: "По названию",
		value: "title",
	},
	{
		name: "По описанию",
		value: "description",
	},
	{
		name: "По статье",
		value: "content",
	},
]

export const PER_PAGE_LIST = [5, 10, 20, 50, 100]
