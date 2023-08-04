import { FC, useState } from "react"
import styles from "./Pagination.module.css"
import { usePaginationContext } from "../../contexts/paginationContext"
import { useRequestNewsContext } from "../../contexts/RequestNewsContext"
import { PER_PAGE_LIST } from "../../utils/constants"

export const Pagination: FC = () => {
	const [isVisibleSelect, setIsVisibleSelect] = useState<boolean>(false)

	const { page, perPage, updatePage, updatePerPage } = usePaginationContext()
	const { totalItems } = useRequestNewsContext()

	const totalPage = Math.ceil(totalItems / perPage)

	const onSelectPerPage = (perPage: number) => {
		updatePerPage(perPage)
		updatePage(1)
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
								<div onClick={() => onSelectPerPage(item)} className={`${styles.select_option} ${item === perPage ? styles.active : ""}`}>
									{item}
								</div>
							)
						})}
					</div>
				)}
			</div>
			<div className={styles.change_page_block}>
				<button onClick={() => updatePage(page - 1)} disabled={page === 1} className={styles.change_page_button}>
					{"<"}
				</button>
				<span>{page}</span>
				<button onClick={() => updatePage(page + 1)} disabled={page === totalPage} className={styles.change_page_button}>
					{">"}
				</button>
			</div>
		</div>
	)
}
