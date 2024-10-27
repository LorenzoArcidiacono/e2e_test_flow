import styles from './Page.module.scss'
import { CSSProperties } from "react";

interface IPage{
    style?: CSSProperties
    className?: string
    children?: React.ReactNode
}

export const Page: React.FC<IPage> = (props: IPage)=>{
    return (
        <div className={`${props.className} ${styles.page}`} style={props.style}>
            {props.children}
        </div>
    )
}
