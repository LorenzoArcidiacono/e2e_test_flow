import styles from './Editor.module.scss'
import { DrawflowEditor } from "../../Components/Drawflow"
import { Page } from '../../Components/Layout';

export const Editor: React.FC = ()=>{


    return (
        <Page className={styles.editorPage} style={{display: 'flex', flexDirection: 'column'}}>
            {/* EDITOR */}
            <DrawflowEditor/>
        </Page>
    )
}
