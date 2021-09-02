import Airtable from 'airtable';
import styles from '../styles/Home.module.css'

import { useEffect, useState } from 'react';
import { MenuList, MenuItem, Dropdown, SubMenuItem } from 'react-menu-list';
import mergeDeep from '../helpers/mergeDeep';
import useDynamicRefs from '../hooks/useDynamicRefs';
// import '../styles/globals.css'

const table = new Airtable({ apiKey: 'keyJJJN5MlBHVo3T7' }).base('appBtrYj2IybnYTds')

const Menu = () => {
  const [data, setData] = useState<Array<{}>>([])
  const [mergedData, setMergedData] = useState<Record<string, any>>({})
  const [getRef, setRef] = useDynamicRefs<SubMenuItem>();

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
    <div className={styles.menuWrapper}>
      <MenuList>
        {mergedData && Object.keys(mergedData).map((item1, i) => (
          <SubMenuItem
            ref={setRef(`sm_${item1}`)}
            key={i}
            menu={
              <div className={styles.subMenuItem} onMouseLeave={() => getRef(`sm_${item1}`).current!.close()}>
                <Dropdown>
                  <MenuList>
                    {mergedData[item1] && Object.keys(mergedData[item1]).map((item2, i) => {
                      return (
                        <SubMenuItem
                          key={i}
                          highlightedStyle={{ color: '#333' }}
                          style={{ cursor: 'pointer', userSelect: 'none' }}
                          menu={
                            <div className={styles.subMenuItem}>
                              <Dropdown>
                                <MenuList>
                                  {mergedData[item1][item2] && Object.keys(mergedData[item1][item2]).map((item3, i) => {
                                    return (
                                      <SubMenuItem
                                        key={i}
                                        highlightedStyle={{ color: '#333' }}
                                        style={{ cursor: 'pointer', userSelect: 'none' }}
                                        menu={
                                          <div className={styles.subMenuItem}>
                                            <Dropdown>
                                              <MenuList>
                                                {mergedData[item1][item2][item3] && Object.keys(mergedData[item1][item2][item3]).map((item4, i) => {
                                                  return (
                                                    <SubMenuItem
                                                      key={i}
                                                      highlightedStyle={{ color: '#333' }}
                                                      style={{ cursor: 'pointer', userSelect: 'none' }}
                                                      menu={
                                                        <div className={styles.subMenuItem}>
                                                          <Dropdown>
                                                            <MenuList>
                                                              {mergedData[item1][item2][item3][item4] && Object.keys(mergedData[item1][item2][item3][item4]).map((item5, i) => {
                                                                return (
                                                                  <SubMenuItem
                                                                    key={i}
                                                                    highlightedStyle={{ color: '#333' }}
                                                                    style={{ cursor: 'pointer', userSelect: 'none' }}
                                                                    menu={
                                                                      <div className={styles.subMenuItem}>
                                                                        <Dropdown>
                                                                          <MenuList>
                                                                            {mergedData[item1][item2][item3][item4][item5] && Object.keys(mergedData[item1][item2][item3][item4][item5]).map((item6, i) => {
                                                                              return <MenuItem key={item6}><a href="/123">{item6}</a></MenuItem>
                                                                            })}
                                                                          </MenuList>
                                                                        </Dropdown>
                                                                      </div>
                                                                    }
                                                                  >
                                                                    <a href="">{item5}</a>
                                                                  </SubMenuItem>
                                                                )
                                                              })}
                                                            </MenuList>
                                                          </Dropdown>
                                                        </div>
                                                      }
                                                    >
                                                      <a href="">{item4}</a>
                                                    </SubMenuItem>

                                                  )
                                                })}
                                              </MenuList>
                                            </Dropdown>
                                          </div>
                                        }
                                      >
                                        <a href="">{item3}</a>
                                      </SubMenuItem>

                                    )
                                  })}
                                </MenuList>
                              </Dropdown>
                            </div>
                          }
                        >
                          <a href="">{item2}</a>
                        </SubMenuItem>

                      )
                    })}
                  </MenuList>

                </Dropdown>
              </div>
            }
          >
            <a href="">{item1}</a>
          </SubMenuItem>

        ))}
      </MenuList>
    </div>
  )
}
export default Menu
