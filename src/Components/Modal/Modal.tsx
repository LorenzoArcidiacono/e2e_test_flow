import styles from "./Modal.module.scss";

interface IModal {
	children: JSX.Element;
	onClose: () => void;
}

export const Modal: React.FC<IModal> = (props: IModal) => {
	const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) props.onClose();
	};

	return (
		<div className={styles.modal} onClick={handleClose}>
			{props.children}
		</div>
	);
};
