import React, { createContext, useContext, useState } from "react"

interface PaginationContextType {
	perPage: number
	setPerPage: (value: number) => void
	page: number
	setPage: (value: number) => void
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

	return <PaginationContext.Provider value={{ perPage, setPerPage, page, setPage }}>{children}</PaginationContext.Provider>
}
