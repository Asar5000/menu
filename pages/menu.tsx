import Airtable from 'airtable';
import { useEffect, useState } from 'react';
import mergeDeep from '../helpers/mergeDeep';
import type { NextPage } from 'next'
import RecursiveMenu from '../components/recursive-menu';

const table = new Airtable({ apiKey: 'keyJJJN5MlBHVo3T7' }).base('appBtrYj2IybnYTds')

const Menu: NextPage = () => {
  const [data, setData] = useState<Array<{}>>([])
  const [mergedData, setMergedData] = useState<Record<string, object>>({})

  useEffect(() => {
    setMergedData(mergeDeep({}, ...data))
  }, [data])

  useEffect(() => {
    const arr: Array<{}> = []

    table('Item').select().eachPage((records, fetchNextPage) => {
      records.forEach((record) => {
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

        arr.push(obj)

      });

      fetchNextPage();
    })
      .then(() => setData(arr))
      .catch(err => console.log(err));
  }, [])

  return (
    <RecursiveMenu data={ mergedData }></RecursiveMenu>
  )
}

export default Menu