export interface INews {
	author: string
	content: string
	description: string
	publishedAt: string
	source: {
		id: string
		name: string
	}
	title: string
	url: string
	urlToImage: string
}

export interface INewsResponse {
	articles: INews[]
	status: string
	totalResults: number
}
