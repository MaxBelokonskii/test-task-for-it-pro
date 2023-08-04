import axios from "axios"
import { API_KEY, DEFAULT_URL } from "../utils/constants"
import { INewsResponse } from "../utils/types"

export const getNews = async (section: string, params?: Record<string, unknown>) => {
	const res = await axios.get(`${DEFAULT_URL}${section}`, {
		params: {
			...params,
			apikey: API_KEY,
		},
	})
	return res.data as INewsResponse
}
