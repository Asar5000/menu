import React, {FC} from 'react';
import styles from '../../../styles/Home.module.css'

interface IRenderMenuProps {
    index: number;
    item: {}
}

export const RenderItem: FC<IRenderMenuProps> = ({index, item,}) => {
    const trigger = Object.values(item) && Object.values(item).length;
    return (
        <ul key={index}
            className={trigger ? styles.subMenuItem : styles.subMenuItemHide}>
            {Object.keys(item)}
            <ul className={styles.subMenuItem__list}>
                {Object.values(item).length ? Object.values(item).map((i: any, idx: number) => (
                    <li key={idx}>
                        {trigger ?
                            <RenderItem index={idx} item={i}/> : null}
                    </li>
                )) : null}
            </ul>
        </ul>
    )
}
