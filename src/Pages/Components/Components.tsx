import { CSSProperties } from "react";
import { Button } from "../../Components/Buttons/Button";
import { Page } from "../../Components/Layout";
import { IconButton } from "../../Components/Buttons/IconButton";
import { Add } from "@mui/icons-material";

export const Components: React.FC = () => {
	const containerStyle: CSSProperties = {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "flex-start",
		width: "100%",
		height: "100%",
		margin: "10px 0",
		gap: "10px",
	};

	return (
		<Page style={{ backgroundColor: "var(--level3)" }}>
			<div style={{ padding: "50px" }}>
				<h1 style={{ margin: "0", color: "white" }}>Buttons</h1>
				<div style={containerStyle}>
					<div style={{ ...containerStyle, flexDirection: "row" }}>
						<Button label="Click me" />
						<Button label="Click me" color="accent" />
						<Button label="Click me" color="dark" />
					</div>
                    <h3 style={{ margin: "0", color: "white" }}>Sizes</h3>
					<div style={{ ...containerStyle, flexDirection: "row" }}>
						<Button label="Click me" color="accent" size="small" />
						<Button label="Click me" color="accent" size="medium" />
						<Button label="Click me" color="accent" size="large" />
					</div>
                    <h2 style={{ margin: "0", color: "white" }}>Link</h2>
					<div style={{ ...containerStyle, flexDirection: "row" }}>
						<Button label="Click me" variant="link" />
						<Button label="Click me" variant="link" color="accent" />
                        <Button label="Click me" variant="link" color="dark" />
					</div>
                    <h3 style={{ margin: "0", color: "white" }}>Sizes</h3>
					<div style={{ ...containerStyle, flexDirection: "row" }}>
						<Button label="Click me" variant="link" color="accent" size="small" />
						<Button label="Click me" variant="link" color="accent" size="medium" />
						<Button label="Click me" variant="link" color="accent" size="large" />
					</div>
                    <h2 style={{ margin: "0", color: "white" }}>Outlined</h2>
					<div style={{ ...containerStyle, flexDirection: "row" }}>
						<Button label="Click me" variant="outlined" />
						<Button label="Click me" variant="outlined" color="accent" />
                        <Button label="Click me" variant="outlined" color="dark" />
					</div>
                    <h3 style={{ margin: "0", color: "white" }}>Sizes</h3>
					<div style={{ ...containerStyle, flexDirection: "row" }}>
						<Button label="Click me" variant="outlined" color="accent" size="small" />
						<Button label="Click me" variant="outlined" color="accent" size="medium" />
						<Button label="Click me" variant="outlined" color="accent" size="large" />
					</div>
				</div>
			</div>
            <div style={{ padding: "50px" }}>
				<h1 style={{ margin: "0", color: "white" }}>Icon Buttons</h1>
				<div style={containerStyle}>
					<div style={{ ...containerStyle, flexDirection: "row" }}>
						<IconButton icon={<Add/>} />
						<IconButton icon={<Add/>} color="accent" />
						<IconButton icon={<Add/>} color="dark" />
					</div>
                    <h3 style={{ margin: "0", color: "white" }}>Sizes</h3>
					<div style={{ ...containerStyle, flexDirection: "row" }}>
						<IconButton icon={<Add/>} color="accent" size="small" />
						<IconButton icon={<Add/>} color="accent" size="medium" />
						<IconButton icon={<Add/>} color="accent" size="large" />
					</div>
                    <h2 style={{ margin: "0", color: "white" }}>Link</h2>
					<div style={{ ...containerStyle, flexDirection: "row" }}>
						<IconButton icon={<Add/>} variant="link" />
						<IconButton icon={<Add/>} variant="link" color="accent" />
                        <IconButton icon={<Add/>} variant="link" color="dark" />
					</div>
                    <h3 style={{ margin: "0", color: "white" }}>Sizes</h3>
					<div style={{ ...containerStyle, flexDirection: "row" }}>
						<IconButton icon={<Add/>} variant="link" color="accent" size="small" />
						<IconButton icon={<Add/>} variant="link" color="accent" size="medium" />
						<IconButton icon={<Add/>} variant="link" color="accent" size="large" />
					</div>
                    <h2 style={{ margin: "0", color: "white" }}>Outlined</h2>
					<div style={{ ...containerStyle, flexDirection: "row" }}>
						<IconButton icon={<Add/>} variant="outlined" />
						<IconButton icon={<Add/>} variant="outlined" color="accent" />
                        <IconButton icon={<Add/>} variant="outlined" color="dark" />
					</div>
                    <h3 style={{ margin: "0", color: "white" }}>Sizes</h3>
					<div style={{ ...containerStyle, flexDirection: "row" }}>
						<IconButton icon={<Add/>} variant="outlined" color="accent" size="small" />
						<IconButton icon={<Add/>} variant="outlined" color="accent" size="medium" />
						<IconButton icon={<Add/>} variant="outlined" color="accent" size="large" />
					</div>
				</div>
			</div>
		</Page>
	);
};
