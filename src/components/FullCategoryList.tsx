import React, {ChangeEvent} from "react";
import {Link} from "react-router-dom";

type FullCategoryListType = {
    id: number
    pageTitle: string
    isActive: boolean
    callBack: (id: number, status: boolean) => void
}


export const FullCategoryList = (props: FullCategoryListType) => {
    const {
        id,
        pageTitle,
        isActive,
        callBack,
    } = props;

    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        callBack(id, e.currentTarget.checked);
    }
    return (
        <>
            <div className="cat__container">
                <div className="cat__active-box"><input type="checkbox" checked={isActive} onChange={onChangeStatus}/>
                </div>
                <Link to={`/cat/${id}`}>
                    <div className="cat__title">{pageTitle}</div>
                </Link>
            </div>
        </>
    )
}