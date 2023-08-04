import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import { Dashboard, NewsPage } from "./components"
import { FilterProvider } from "./contexts/filterContext"
import { PaginationProvider } from "./contexts/paginationContext"
import { RequestNewsProvider } from "./contexts/RequestNewsContext"

function App() {
	return (
		<RequestNewsProvider>
			<PaginationProvider>
				<FilterProvider>
					<BrowserRouter>
						<Routes>
							<Route path='/' element={<Navigate to='/news' />} />
							<Route path='/news' element={<Dashboard />} />
							<Route path='/news/:title' element={<NewsPage />} />
						</Routes>
					</BrowserRouter>
				</FilterProvider>
			</PaginationProvider>
		</RequestNewsProvider>
	)
}

export default App
