import React from 'react'
import { MenuList, MenuItem, Dropdown, SubMenuItem } from 'react-menu-list';
import useDynamicRefs from '../hooks/useDynamicRefs';
import styles from '../styles/Home.module.css'

type Props = {
    data: { [key: string]: any },
}

const RecursiveMenu = ({ data }: Props) => {

  const [getRef, setRef] = useDynamicRefs<SubMenuItem>();

  const constructMenu = (item: any) => {

    return (
      <div className={ styles.menuWrapper }>
        { constructMenuList(item, { isRoot: true }) }
      </div>
    )
  }
  
  const constructMenuList = (item: any, { isRoot = false, key = '0' }: {isRoot?: boolean, key?: string }) => {

    return (
        <MenuList>
          {
            Object.keys(item).map((element: string, i: number) => {
              if (Object.keys(item[element]).length !== 0) {
                return constructSubmenu(item[element], element, key + i, isRoot)
              }

              return <MenuItem key={ 'menu_element_' + key + i }>{ element }</MenuItem>
            }) 
          }  
        </MenuList>
    )
  }

  const constructSubmenu = (item: { [key: string]: object }, text: string, key: string, isRoot = false) => {

    return (
      <SubMenuItem menu={
          <div className={ styles.subMenuItem } onMouseLeave={ () => {
            if (isRoot) getRef('menu_ref_root' + key).current!.close()
          } }>
            <Dropdown>
              { constructMenuList(item, { key: key }) }
            </Dropdown>
          </div>
        }
        key={ 'menu_element_' + key }
        ref={  setRef(isRoot ? 'menu_ref_root' + key : 'menu_ref_' + key) }
      >
        { text }
      </SubMenuItem>
    )
  }

  return (
    constructMenu(data)
  )
}

export default RecursiveMenu