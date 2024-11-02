import { CSSProperties } from "react";
import { Button } from "../../Components/Buttons/Button";
import { Page } from "../../Components/Layout";
import { Add } from "@mui/icons-material";
import { AccordionGroup } from '../../Components/Accordion/Accordion';
import {
	Accordion,
	AccordionContent,
	AccordionHeader,
} from "../../Components/Accordion/Accordion";

export const Components: React.FC = () => {
	const containerStyle: CSSProperties = {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "flex-start",
		width: "100%",
		margin: "10px 0",
		gap: "10px",
	};

	return (
		<Page style={{ background: "var(--black)" }}>
			<div style={{ padding: "50px", display: "flex", gap: "10px", flexDirection: "column" }}>
				<AccordionGroup color="accent">
					<Accordion>
						<AccordionHeader>
							<h1 style={{ margin: "0" }}>Buttons</h1>
						</AccordionHeader>
						<AccordionContent>
							<div style={{ ...containerStyle, flexDirection: "row" }} >
								<Button label="Click me" />
								<Button label="Click me" color="accent" />
								<Button label="Click me" color="dark" />
							</div>
							<h3 style={{ margin: "0", color: "white" }}>Sizes</h3>
							<div style={{ ...containerStyle, flexDirection: "row" }} >
								<Button label="Click me" color="accent" size="small" />
								<Button label="Click me" color="accent" size="medium" />
								<Button label="Click me" color="accent" size="large" />
							</div>
							<h3 style={{ margin: "0", color: "white" }}>Shapes</h3>
							<div style={{ ...containerStyle, flexDirection: "row" }} >
								<Button label="Click me" color="accent" shape="rounded" />
								<Button label="Click me" color="accent" shape="rounded" variant="outlined" />
							</div>
							<h2 style={{ margin: "0", color: "white" }}>Link</h2>
							<div style={{ ...containerStyle, flexDirection: "row" }} >
								<Button label="Click me" variant="link" />
								<Button label="Click me" variant="link" color="accent" />
								<Button label="Click me" variant="link" color="dark" />
							</div>
							<h3 style={{ margin: "0", color: "white" }}>Sizes</h3>
							<div style={{ ...containerStyle, flexDirection: "row" }} >
								<Button label="Click me" variant="link" color="accent" size="small" />
								<Button label="Click me" variant="link" color="accent" size="medium" />
								<Button label="Click me" variant="link" color="accent" size="large" />
							</div>
							<h2 style={{ margin: "0", color: "white" }}> Outlined </h2>
							<div style={{ ...containerStyle, flexDirection: "row" }} >
								<Button label="Click me" variant="outlined" />
								<Button label="Click me" variant="outlined" color="accent" />
								<Button label="Click me" variant="outlined" color="dark" />
							</div>
							<h3 style={{ margin: "0", color: "white" }}>Sizes</h3>
							<div style={{ ...containerStyle, flexDirection: "row" }} >
								<Button label="Click me" variant="outlined" color="accent" size="small" />
								<Button label="Click me" variant="outlined" color="accent" size="medium" />
								<Button label="Click me" variant="outlined" color="accent" size="large" />
							</div>
							<h3 style={{ margin: "0", color: "white" }}>Icons</h3>
							<div style={{ ...containerStyle, flexDirection: "row" }} >
								<Button label="Click me" startIcon={Add} />
								<Button label="Click me" endIcon={Add} />
								<Button label="Click me" color="dark" startIcon={Add} />
								<Button label="Click me" color="accent" endIcon={Add} />
								<Button label="Click me" color="dark" shape="rounded" startIcon={Add} />
								<Button label="Click me" color="accent" variant="outlined" endIcon={Add} />
								<Button label="Click me" color="accent" variant="link" startIcon={Add} />
							</div>
						</AccordionContent>
					</Accordion>
					<Accordion>
						<AccordionHeader>
							<h1 style={{ margin: "0" }}> Icon Buttons </h1>
						</AccordionHeader>
						<AccordionContent>
							<div style={containerStyle}>
								<div style={{ ...containerStyle, flexDirection: "row", }} >
									<Button type="icon" icon={Add} />
									<Button type="icon" icon={Add} color="accent" />
									<Button type="icon" icon={Add} color="dark" />
								</div>
								<h3 style={{ margin: "0", color: "white" }}> Sizes </h3>
								<div style={{ ...containerStyle, flexDirection: "row", }} >
									<Button type="icon" icon={Add} color="accent" size="small" />
									<Button type="icon" icon={Add} color="accent" size="medium" />
									<Button type="icon" icon={Add} color="accent" size="large" />
								</div>
								<h3 style={{ margin: "0", color: "white" }}> Shapes </h3>
								<div style={{ ...containerStyle, flexDirection: "row", }} >
									<Button type="icon" icon={Add} color="accent" shape="rounded" />
								</div>
								<h2 style={{ margin: "0", color: "white" }}> Link </h2>
								<div style={{ ...containerStyle, flexDirection: "row", }} >
									<Button type="icon" icon={Add} variant="link" />
									<Button type="icon" icon={Add} variant="link" color="accent" />
									<Button type="icon" icon={Add} variant="link" color="dark" />
								</div>
								<h3 style={{ margin: "0", color: "white" }}> Sizes </h3>
								<div style={{ ...containerStyle, flexDirection: "row", }} >
									<Button type="icon" icon={Add} variant="link" color="accent" size="small" />
									<Button type="icon" icon={Add} variant="link" color="accent" size="medium" />
									<Button type="icon" icon={Add} variant="link" color="accent" size="large" />
								</div>
								<h2 style={{ margin: "0", color: "white" }}> Outlined </h2>
								<div style={{ ...containerStyle, flexDirection: "row", }} >
									<Button type="icon" icon={Add} variant="outlined" />
									<Button type="icon" icon={Add} variant="outlined" color="accent" />
									<Button type="icon" icon={Add} variant="outlined" color="dark" />
								</div>
								<h3 style={{ margin: "0", color: "white" }}> Sizes </h3>
								<div style={{ ...containerStyle, flexDirection: "row", }} >
									<Button type="icon" icon={Add} variant="outlined" color="accent" size="small" />
									<Button type="icon" icon={Add} variant="outlined" color="accent" size="medium" />
									<Button type="icon" icon={Add} variant="outlined" color="accent" size="large" />
								</div>
							</div>
						</AccordionContent>
					</Accordion>
				</AccordionGroup>
			</div>
		</Page>
	);
};
