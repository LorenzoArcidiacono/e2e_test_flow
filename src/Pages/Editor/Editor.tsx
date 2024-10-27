import styles from './Editor.module.scss'
import { DrawflowEditor } from "../../Components/Drawflow"
import { Page } from '../../Components/Layout';

export const Editor: React.FC = ()=>{
    return (
        <Page className={styles.editorPage}>
            {/* EDITOR */}
            <DrawflowEditor/>
            {/* RESULT */}
            <div></div>
        </Page>
    )
}
