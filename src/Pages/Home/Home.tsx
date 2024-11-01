import { useNavigate } from "react-router-dom";
import { Button } from "../../Components/Buttons";
import { Page } from "../../Components/Layout";
import styles from "./Home.module.scss";
import { AccountTree, AccountTreeOutlined } from "@mui/icons-material";

export const Home: React.FC = () => {
	const navigator = useNavigate();

	return (
		<Page>
			<div className={styles.container}>
				<div className={`${styles.box} ${styles.fly_left}`}>
					<h1 className={styles.title}>
						<AccountTree style={{marginRight: 10}}/>
						E2E Test Flow
						<AccountTree style={{marginLeft: 10}}/>
					</h1>
					<p>A simple, visual way to test your API!</p>
				</div>
				<div
					className={`${styles.box} ${styles.fly_right} ${styles.flex_row}`}
				>
					<Button
						className={styles.button}
						label="Make my live easier!"
						size="large"
						color="accent"
						onClick={() => navigator("/editor")}
					/>
					<Button
						className={styles.button}
						label="Tell me more"
						size="large"
						color="primary"
						variant="outlined"
					/>
				</div>
			</div>
		</Page>
	);
};
