import React, {useState} from "react";
import style from './Call.module.css';
import {Button, Checkbox, DatePicker, Input, message, Table} from "antd";
import {collection, doc, getFirestore, setDoc} from "firebase/firestore";
import moment from "moment";

export const Call = () => {
    const [visits, setVisit] = useState<any>([])
    const firestore = getFirestore();
    const visitsRef = collection(firestore, 'visits');

    const changeValue = (newValue: any, key: any, record: any, index: any) => {
        console.log(newValue)
        let newArr = [...visits];
        newArr[index] = {...newArr[index], [key]: newValue}
        setVisit(newArr);
    }

    const reloadData = (record: any) => {
        console.log({...record, reload: 22, date: moment(record.date).format("YYYY-MM-DD")})
        setDoc(doc(visitsRef, record.id), {...record, reload: 22, date: moment(record.date).format("YYYY-MM-DD")})
            .then(() => {
                message.success("Medical card updated!");
            })
            .catch(function (error) {
                message.error(error);
                console.log(error);
            });
    }
    const columns = [
        {
            title: "id",
            key: "id",
            dataIndex: "id",
            render: (text: string, record: any, index: any) => <Input onChange={(e) => changeValue(e.target.value, 'id', record, index)} value={text}></Input>
        },
        {
            title: "doctor",
            key: "doctor",
            dataIndex: "doctor",
            render: (text: string, record: any, index: any) => <Input onChange={(e) => changeValue(e.target.value, 'doctor', record, index)} value={text}></Input>
        },
        {
            title: "date",
            key: "date",
            dataIndex: "date",
            render: (text: Date, record: any, index: any) => <DatePicker style={{width: '100%'}} value={moment(new Date)} onChange={(e) => changeValue(e?.date, 'date', record, index)}></DatePicker>
        },
        {
            title: "plot",
            key: "plot",
            dataIndex: "plot",
            render: (text: string, record: any, index: any) => <Input onChange={(e) => changeValue(e.target.value, 'plot', record, index)}  value={text}></Input>
        },
        {
            title: "address",
            key: "address",
            dataIndex: "address",
            render: (text: string, record: any, index: any) => <Input onChange={(e) => changeValue(e.target.value, 'address', record, index)}  value={text}></Input>
        },
        {
            title: "contactPhone",
            key: "contactPhone",
            dataIndex: "contactPhone",
            render: (text: string, record: any, index: any) => <Input onChange={(e) => changeValue(e.target.value, 'contactPhone', record, index)}  value={text}></Input>
        },
        {
            title: "",
            key: "reload",
            dataIndex: "reload",
            render: (text: string, record: any) => <Button type="primary" onClick={() => reloadData(record)}>{text || 'Update'}</Button>
        }
    ];
    return <>
        <Table dataSource={visits} columns={columns}></Table>
    </>
}