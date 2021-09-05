import React, {FC} from 'react';
import {RenderItem} from "./components/RenderItem";
import {MenuList} from "react-menu-list";

interface IMultilevelMenuProps {
    data: any[]
}

export const MultilevelMenu: FC<IMultilevelMenuProps> = ({data}) => {

    return (
        <MenuList>
            {data.map((item, idx) => <RenderItem key={idx} index={idx} item={item}/>)}
        </MenuList>
    );
};
