export * from './Button'
import { CSSProperties } from "react";
import { TColor, TShape, TSize, TVariant } from "../types";
import { SvgIconComponent } from '@mui/icons-material';

interface IBaseButton {
    className?: string;
	style?: CSSProperties;
	onClick?: () => void;
    variant?: TVariant;
	size?: TSize;
	color?: TColor;
	shape?: TShape;
    type?: "button" | "icon";
    disabled?: boolean;
}

interface IButton extends IBaseButton {
    type?: "button";
	label: string;
    startIcon?: SvgIconComponent;
    endIcon?: SvgIconComponent;
    
}	

interface IIconButton extends IBaseButton{
    type: "icon";
	icon: SvgIconComponent;
}

export type TButton = IButton | IIconButton;