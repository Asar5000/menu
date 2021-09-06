import React, {FC, useEffect, useState} from 'react';
import {RenderItem} from "./components/RenderItem";
import {MenuList} from "react-menu-list";
import {removeDuplicate} from "../../helpers/removeDuplicate";

interface IMultilevelMenuProps {
    data: any[]
}

export const MultilevelMenu: FC<IMultilevelMenuProps> = ({data}) => {
    
    return (
        <MenuList>
            {data.map((item: {}, idx: number) => (
                <RenderItem
                    key={idx}
                    index={idx}
                    item={item}
                />)
            )}
        </MenuList>
    );
};
