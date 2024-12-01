import React from 'react';
import { faTrophy, faPeopleGroup, faAddressBook, faClock, faMale, faTachometer, faCog } from '@fortawesome/free-solid-svg-icons'
import VersusIcon from '../../../public/svg/versus-icon.svg';


export const AdminSideBarData = [
    {
        title: 'DASHBOARD',
        menuItems: [
            {
                itemName: 'Dashboard',
                link: 'dashboardManagment',
                icon: faTachometer
            },
            {
                itemName: 'Tournament',
                link: 'tournamentManagement',
                icon: faTrophy
            },
            {
                itemName: 'Team',
                link: 'teamManagement',
                icon: faPeopleGroup
            },
            {
                itemName: 'Player',
                link: 'playerManagement',
                icon:  faMale

            },
            {
                itemName: 'Match',
                link: 'matchManagment',
                icon: VersusIcon 
            },
            {
                itemName: 'Schedule',
                link: 'scheduleManagment',
                icon: faClock 
            },
            {
                itemName: 'Contact',
                link: 'adminContact',
                icon: faAddressBook
            },
            {
                itemName: 'Settings',
                link: 'settings',
                icon: faCog
            },
            
        ]
    },
//     {
//         title2: 'PAGES',
//         pagesItems: [
//             {
//                 itemName: 'Authentication',
//                 link: 'authentication'
//             },
//             {
//                 itemName: 'Pages',
//                 link: 'pages'
//             },
//             {
//                 itemName: 'Landing',
//                 link: 'landing'
//             }
//         ]
//     }
];
