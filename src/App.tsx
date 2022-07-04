import React, {ChangeEvent, useEffect} from "react";
import './App.css';
import {useState} from "react";
import axios, {AxiosResponse} from 'axios'
import {FullCategoryList} from "./components/FullCategoryList";
import {CategoryPage} from "./components/CategoryPage";
import {Routes, Route} from "react-router-dom";


const initialData: Array<DataType> =
    [
        {
            "id": 1,
            "pageType": "",
            "pageTitle": "",
            "isActive": false,
            "content": ""
        }
    ]
export type DataType = {
    id: number
    pageType: string
    pageTitle: string
    isActive: boolean
    content: string
}
export type InitialDataType = {
    data: Array<DataType>
    inputFilter: string
    isActiveFilter: boolean

}

function App() {

    const [state, setState] = useState({
        date: initialData,
        inputFilter: "",
        isActiveFilter: false
    });
    useEffect(() => {
        axios.get("./data.json")
            .then(res => {
                    console.log(res.data)
                    setState({...state, date: res.data});
                }
            )
            .catch(err => console.log(err))
    }, [])
    let data = [...state.date];


    const onChangeInputFitler = (e: ChangeEvent<HTMLInputElement>) => {
        let query = e.currentTarget.value;
        setState({...state, inputFilter: query})
    }
    const onChangeCheckboxFitler = (e: ChangeEvent<HTMLInputElement>) => {
        let isActiveCheckbox = e.currentTarget.checked;
        setState({...state, isActiveFilter: isActiveCheckbox})
    }
    //console.log(state);
    if (state.inputFilter.length > 0) {
        data = data.filter(item => item.pageTitle.toLocaleLowerCase().includes(state.inputFilter))
        console.log(data);
    }
    if (state.isActiveFilter) {
        data = data.filter(item => item.isActive === state.isActiveFilter)
        console.log(data);
    }
    const changeStatus = (id: number, e: boolean) => {
        let newData = state.date.map(item => item.id === id ? {...item, isActive: e} : {...item})
        setState({...state, date: newData});
    }
    return (

        <div className="App">
            <div className="container">
                <Routes>
                    <Route path="/" element={
                        <>
                            <div>
                                <h1>All Caterories</h1>
                            </div>
                            <div className="filter__container">
                                <input type="text" onChange={onChangeInputFitler}/>
                                Only Active Catagories
                                <input type="checkbox" onChange={onChangeCheckboxFitler}/>
                            </div>
                            {
                                data.map(cat => {
                                    return <FullCategoryList
                                        key={cat.id}
                                        id={cat.id}
                                        pageTitle={cat.pageTitle}
                                        isActive={cat.isActive}
                                        callBack={changeStatus}/>
                                })
                            }
                        </>
                    }/>
                    <Route path="/cat/:catId" element={<CategoryPage data={state.date} callBack={changeStatus}/>}/>
                </Routes>

            </div>
        </div>
    );
}

export default App;
