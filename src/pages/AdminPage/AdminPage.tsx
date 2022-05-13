import React, {useState} from 'react';
import style from './AdminPage.module.css';
import {Users} from "./components/Users/Users";
import {Schedule} from "./components/Schedule/Schedule";
import {Call} from "./components/Call/Call";

export const AdminPage = () => {
    const [selectedTab, setTab] = useState('USERS')
    const TABS = [
        {
            title: 'USERS',
            component: <Users/>
        },
        {
            title: 'SCHEDULE',
            component: <Schedule/>
        },
        {
            title: 'CALL',
            component: <Call/>
        },
    ]


    return <div className={style.page}>
        <div className={style.tabs}>
            {TABS.map(tab => <div onClick={() => setTab(tab.title)} style={selectedTab === tab.title ? {backgroundColor: '#873df2'} : {}} className={style.tab}>{tab.title}</div>)}
        </div>
        <div className={style.content}>{TABS.find(el => el.title === selectedTab)!.component}</div>
    </div>
}