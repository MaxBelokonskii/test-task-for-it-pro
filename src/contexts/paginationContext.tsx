import React, { createContext, useContext, useState } from "react"

interface PaginationContextType {
	perPage: number
	updatePerPage: (value: number) => void
	page: number
	updatePage: (value: number) => void
}

const PaginationContext = createContext<PaginationContextType | undefined>(undefined)

export const usePaginationContext = () => {
	const context = useContext(PaginationContext)
	if (!context) {
		throw new Error("useAppContext must be used within an AppProvider")
	}
	return context
}

interface PaginationProviderProps {
	children: React.ReactNode
}

export const PaginationProvider: React.FC<PaginationProviderProps> = ({ children }) => {
	const [perPage, setPerPage] = useState<number>(10)
	const [page, setPage] = useState<number>(1)

	const updatePerPage = (newValue: number) => {
		setPerPage(newValue)
	}
	const updatePage = (newValue: number) => {
		setPage(newValue)
	}

	return <PaginationContext.Provider value={{ perPage, updatePerPage, page, updatePage }}>{children}</PaginationContext.Provider>
}
