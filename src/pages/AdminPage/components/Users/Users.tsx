import {getDoc, getFirestore, doc, collection, query, getDocs, setDoc} from "firebase/firestore";
import React, {useEffect, useState} from "react";
import style from './Users.module.css';
import {Button, Checkbox, Input, message, Table} from "antd";
import {setUserCard} from "../../../../redux/user";

export const Users = () => {
    const [users, setUsers] = useState<any>([]);
    const firestore = getFirestore();
    const usersRef = collection(firestore, 'medcards');

    const changeValue = (newValue: any, key: any, record: any, index: any) => {
        console.log(newValue)
        let newArr = [...users];
        newArr[index] = {...newArr[index], [key]: newValue}
        setUsers(newArr);
    }

    const reloadData = (record: any) => {
        setDoc(doc(usersRef, record.uid), record)
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
                title: "weight",
                key: "weight",
                dataIndex: "weight",
                render: (text: string, record: any, index: any) => <Input onChange={(e) => changeValue(e.target.value, 'weight', record, index)} value={text}></Input>
            },
            {
                title: "polis",
                key: "polis",
                dataIndex: "polis",
                render: (text: string, record: any, index: any) => <Input onChange={(e) => changeValue(e.target.value, 'polis', record, index)}  value={text}></Input>
            },
            {
                title: "firstName",
                key: "firstName",
                dataIndex: "firstName",
                render: (text: string, record: any, index: any) => <Input onChange={(e) => changeValue(e.target.value, 'firstName', record, index)}  value={text}></Input>
            },
            {
                title: "uid",
                key: "uid",
                dataIndex: "uid",
                render: (text: string, record: any, index: any) => <Input onChange={(e) => changeValue(e.target.value, 'uid', record, index)}  disabled value={text}></Input>
            },
            {
                title: "snils",
                key: "snils",
                dataIndex: "snils",
                render: (text: string, record: any, index: any) => <Input onChange={(e) => changeValue(e.target.value, 'snils', record, index)}  value={text}></Input>
            },
            {
                title: "lastName",
                key: "lastName",
                dataIndex: "lastName",
                render: (text: string, record: any, index: any) => <Input onChange={(e) => changeValue(e.target.value, 'lastName', record, index)}  value={text}></Input>
            },
            {
                title: "height",
                key: "height",
                dataIndex: "height",
                render: (text: string, record: any, index: any) => <Input onChange={(e) => changeValue(e.target.value, 'height', record, index)}  value={text}></Input>
            },
            {
                title: "dateBth",
                key: "dateBth",
                dataIndex: "dateBth",
                render: (text: string, record: any, index: any) => <Input onChange={(e) => changeValue(e.target.value, 'dateBth', record, index)}  value={text}></Input>
            },
            {
                title: "verifed",
                key: "verifed",
                dataIndex: "verifed",
                render: (text: boolean, record: any, index: any) => <Checkbox onChange={(e) => changeValue(e.target.checked, 'verifed', record, index)} checked={text}></Checkbox>
            },
            {
                title: "secondName",
                key: "secondName",
                dataIndex: "secondName",
                render: (text: string, record: any, index: any) => <Input onChange={(e) => changeValue(e.target.value, 'secondName', record, index)}  value={text}></Input>
            },
            {
                title: "gender",
                key: "gender",
                dataIndex: "gender",
                render: (text: string, record: any, index: any) => <Input onChange={(e) => changeValue(e.target.value, 'gender', record, index)}  value={text}></Input>
            },
            {
                title: "bloodGroup",
                key: "bloodGroup",
                dataIndex: "bloodGroup",
                render: (text: string, record: any, index: any) => <Input onChange={(e) => changeValue(e.target.value, 'bloodGroup', record, index)} value={text}></Input>
            },
            {
                title: "",
                key: "reload",
                dataIndex: "reload",
                render: (text: string, record: any) => <Button type="primary" onClick={() => reloadData(record)}>Update</Button>
            }

    ];

    useEffect(() => {
        console.log(users)
    }, [users, columns])

    useEffect(() => {
        (async () => {
            const querySnapshot = await getDocs(usersRef);
            console.log(querySnapshot)
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                const user = doc.data()
                setUsers((prevState: any) => [...prevState, user])
            });
            console.log('all')
        })()
    }, [])


    return <Table dataSource={users} columns={columns}></Table>
}
