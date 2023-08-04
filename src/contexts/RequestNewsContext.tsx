import React, { createContext, useContext, useState } from "react"
import { INews } from "../utils/types"

interface RequestNewsContextType {
	news: INews[]
	updateNews: (value: INews[]) => void
	totalItems: number
	updateTotalItems: (value: number) => void
}

const RequestNewsContext = createContext<RequestNewsContextType | undefined>(undefined)

export const useRequestNewsContext = () => {
	const context = useContext(RequestNewsContext)
	if (!context) {
		throw new Error("useAppContext must be used within an AppProvider")
	}
	return context
}

interface RequestNewsProviderProps {
	children: React.ReactNode
}

export const RequestNewsProvider: React.FC<RequestNewsProviderProps> = ({ children }) => {
	const [news, setNews] = useState<INews[]>([])
	const [totalItems, setTotalItems] = useState<number>(1)

	const updateNews = (newValue: INews[]) => {
		setNews(newValue)
	}

	const updateTotalItems = (newValue: number) => {
		setTotalItems(newValue)
	}

	return <RequestNewsContext.Provider value={{ news, updateNews, totalItems, updateTotalItems }}>{children}</RequestNewsContext.Provider>
}
