import React, {ChangeEvent} from "react";
import {Link, useParams} from 'react-router-dom';
//import data from "../store/data.json"
import {DataType} from "../App";

type CategoryPageType = {
    data: DataType[]
    callBack: (id: number, status: boolean) => void
}
export const CategoryPage = (props: CategoryPageType) => {
    const {
        data,
        callBack
    } = props;
    const params = useParams();
    let catId = Number(params.catId);
    let catData = data.find(item => item.id === catId);
    console.log(catData);
    let isChecked: boolean;
    catData ? isChecked = catData.isActive : isChecked = false;
    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        callBack(catId, e.currentTarget.checked);
    }
    return (
        <div>
            <h1>{catData ? catData.pageTitle : null}</h1>
            <div><input type="checkbox" checked={isChecked} onChange={onChangeStatus}/></div>
            <div>{catData ? catData.content : null}</div>
            <Link to="/">back to all Categories</Link>
        </div>
    );

}