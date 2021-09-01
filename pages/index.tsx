import Airtable from 'airtable';
import { useEffect, useState } from 'react';
import { MenuList, MenuItem, Dropdown, SubMenuItem } from 'react-menu-list';
import mergeDeep from '../helpers/mergeDeep';

const table = new Airtable({ apiKey: 'keyJJJN5MlBHVo3T7' }).base('appBtrYj2IybnYTds')

const Menu = () => {
  const [data, setData] = useState<Array<{}>>([])
  const [mergedData, setMergedData] = useState<Record<string, any>>({})

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
    <div style={{ width: 200 }}>
      <MenuList>
        { mergedData && Object.keys(mergedData).map((item1, i) => (
          <SubMenuItem
          key={i}
          style={{cursor: 'pointer', userSelect: 'none'}}
          highlightedStyle={{background: 'lightgray'}}
          menu={
            <Dropdown>
              <MenuList>
                { mergedData[item1] && Object.keys(mergedData[item1]).map((item2, i) => {
                  return (
                    <SubMenuItem
                      key={i}
                      style={{cursor: 'pointer', userSelect: 'none'}}
                      highlightedStyle={{background: 'lightgray'}}
                      menu={
                        <Dropdown>
                          <MenuList>
                            { mergedData[item1][item2] && Object.keys(mergedData[item1][item2]).map((item3, i) => {
                              return (
                                <SubMenuItem
                                  key={i}
                                  style={{cursor: 'pointer', userSelect: 'none'}}
                                  highlightedStyle={{background: 'lightgray'}}
                                  menu={
                                    <Dropdown>
                                      <MenuList>
                                        { mergedData[item1][item2][item3] && Object.keys(mergedData[item1][item2][item3]).map((item4, i) => {
                                          return (
                                            <SubMenuItem
                                              key={i}
                                              style={{cursor: 'pointer', userSelect: 'none'}}
                                              highlightedStyle={{background: 'lightgray'}}
                                              menu={
                                                <Dropdown>
                                                  <MenuList>
                                                    { mergedData[item1][item2][item3][item4] && Object.keys(mergedData[item1][item2][item3][item4]).map((item5, i) => {
                                                      return (
                                                        <SubMenuItem
                                                          key={i}
                                                          style={{cursor: 'pointer', userSelect: 'none'}}
                                                          highlightedStyle={{background: 'lightgray'}}
                                                          menu={
                                                            <Dropdown>
                                                              <MenuList>
                                                                { mergedData[item1][item2][item3][item4][item5] && Object.keys(mergedData[item1][item2][item3][item4][item5]).map((item6, i) => {
                                                                  return <MenuItem key={item6}>{item6}</MenuItem>
                                                                } )}
                                                              </MenuList>
                                                            </Dropdown>
                                                          }
                                                        >
                                                          {item5}
                                                        </SubMenuItem>
                                                      )
                                                    } )}
                                                  </MenuList>
                                                </Dropdown>
                                              }
                                            >
                                              {item4}
                                            </SubMenuItem>
                                          )
                                        } )}
                                      </MenuList>
                                    </Dropdown>
                                  }
                                >
                                  {item3}
                                </SubMenuItem>
                              )
                            } )}
                          </MenuList>
                        </Dropdown>
                      }
                    >
                      {item2}
                    </SubMenuItem>
                  )       
                } )}
              </MenuList>
            </Dropdown>
          }
        >
          {item1}
        </SubMenuItem>
        )) }
      </MenuList>
    </div>
  )
}
export default Menu
