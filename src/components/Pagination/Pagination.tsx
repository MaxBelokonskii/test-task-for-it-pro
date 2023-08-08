import { FC, useState } from "react"
import styles from "./Pagination.module.css"
import { usePaginationContext } from "../../contexts/paginationContext"
import { useRequestNewsContext } from "../../contexts/RequestNewsContext"
import { PER_PAGE_LIST } from "../../utils/constants"
import cn from "classnames"

export const Pagination: FC = () => {
	const [isVisibleSelect, setIsVisibleSelect] = useState<boolean>(false)

	const { page, perPage, setPage, setPerPage } = usePaginationContext()
	const { totalItems } = useRequestNewsContext()

	const totalPage = Math.ceil(totalItems / perPage)

	const onSelectPerPage = (perPage: number) => {
		setPerPage(perPage)
		setPage(1)
		setIsVisibleSelect((prev) => !prev)
	}

	return (
		<div className={styles.container}>
			<div className={styles.change_per_page_block}>
				<div onClick={(e) => [setIsVisibleSelect((prev) => !prev), e.stopPropagation()]} className={styles.perPage}>
					{perPage}
				</div>
				{isVisibleSelect && (
					<div className={styles.select_options}>
						{PER_PAGE_LIST.map((item) => {
							return (
								<div
									key={item}
									onClick={() => onSelectPerPage(item)}
									className={cn(styles.select_option, {
										[styles.active]: item === perPage,
									})}
								>
									{item}
								</div>
							)
						})}
					</div>
				)}
			</div>
			<div className={styles.change_page_block}>
				<button onClick={() => setPage(page - 1)} disabled={page === 1} className={styles.change_page_button}>
					{"<"}
				</button>
				<span>{page}</span>
				<button onClick={() => setPage(page + 1)} disabled={page === totalPage} className={styles.change_page_button}>
					{">"}
				</button>
			</div>
		</div>
	)
}
