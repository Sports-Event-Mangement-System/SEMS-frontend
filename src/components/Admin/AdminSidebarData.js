import React from 'react';
import { faTrophy, faPeopleGroup, faAddressBook } from '@fortawesome/free-solid-svg-icons'

export const AdminSideBarData = [
    {
        title: 'DASHBOARD',
        menuItems: [
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
                itemName: 'Contact',
                link: 'adminContact',
                icon: faAddressBook
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
