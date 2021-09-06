import Airtable from 'airtable';
import styles from '../styles/Home.module.css'

import {useEffect, useState} from 'react';
import {MultilevelMenu} from "../components/menu";
import {string} from "prop-types";

const table = new Airtable({apiKey: 'keyJJJN5MlBHVo3T7'}).base('appBtrYj2IybnYTds')

const Menu = () => {
    const [data, setData] = useState<Array<{}>>([])

    useEffect(() => {
        const arr: Array<{}> = []
        const keys: Array<[string]> = []
        table('Item').select().eachPage((records, fetchNextPage) => {
            records.forEach((record, index: number) => {

                const auto: any = record.get('Авто URL')
                const model: any = record.get('Модель URL')
                const brand: any = record.get('Бренд URL')
                const category1: any = record.get('Категория URL')
                const category2: any = record.get('Категория URL')
                const category3: any = record.get('Категория URL')

                const obj = {
                    [auto]: {
                        [model]: {
                            [brand]: {
                                [category1]: {
                                    [category2]: {
                                        [category3]: {}
                                    }
                                }
                            }
                        }
                    }
                }

                if (!keys.includes(auto)) {
                    keys.push(auto)
                    arr.push(obj)
                }
            });
            fetchNextPage();
        })
            .then(() => setData(arr))
            .catch(err => console.log(err));
    }, [])

    return (
        <div className={styles.menuWrapper}>
            <MultilevelMenu data={data}/>
        </div>
    )
}
export default Menu
