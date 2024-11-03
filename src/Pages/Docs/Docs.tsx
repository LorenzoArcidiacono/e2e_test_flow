import {
	Accordion,
	AccordionContent,
	AccordionGroup,
	AccordionHeader,
} from "../../Components/Accordion/Accordion";
import { Page } from "../../Components/Layout";
import styles from "./Docs.module.scss";
import { docsData } from "./docs_data";

export const Docs: React.FC = () => {
	return (
		<Page>
			<div className={styles.container}>
				{docsData.map((doc, index) => {
					return (
						<div
                            key={index}
							className={index % 2 === 0 ? styles.animate_left : styles.animate_right}
							style={{
								animationDelay: `${index * 0.1}s`,
							}}
						>
                            {doc.type === "react_node" && doc.content}
							{doc.type === "accordion_group" && (
								<AccordionGroup
									color="accent"
								>
									{doc.content.map((doc, index) => (
										<Accordion key={`ac-${index}`}>
											<AccordionHeader>
												<div
													dangerouslySetInnerHTML={{
														__html: doc.header,
													}}
												/>
											</AccordionHeader>
											<AccordionContent
												className={
													styles.accordion_content
												}
											>
												<div
													dangerouslySetInnerHTML={{
														__html: doc.content,
													}}
												/>
											</AccordionContent>
										</Accordion>
									))}
								</AccordionGroup>
							)}
						</div>
					);
				})}
			</div>
		</Page>
	);
};
