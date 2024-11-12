// /data/folderData.ts

import type {Folder} from "~/types/interfaces";
import {Mode} from "~/types/interfaces";

export const folderData: Folder = {
    name: "Root",
    subFolders: [
        {
            name: "Fw/Kats",
            subFolders: [
                {
                    name: "RLP",
                },
                {
                    name: "LK EMS",
                    groups: [
                        {name: "RP EMS", number: 2480, folder: "LK EMS", mode: Mode.TMO},
                        {name: "RP EMS K1 Fü", number: 2481, folder: "LK EMS", mode: Mode.TMO}
                    ],
                    subFolders: [
                        {
                            name: "VG Bad Ems",
                        },
                        {
                            name: "VG Diez",
                            groups: [
                                {name: "RP DIEZ F1", number: 2505, folder: "VG Diez", mode: Mode.TMO},
                                {name: "RP DIEZ F2", number: 2506, folder: "VG Diez", mode: Mode.TMO},
                                {name: "RP DIEZ F3", number: 2507, folder: "VG Diez", mode: Mode.TMO}
                            ]
                        }
                    ]
                },
                {
                    name: "LK AK",
                },
                {
                    name: "LK TR",
                }
            ]
        },
        {
            name: "RettD"
        },
        {
            name: "DMO FW",
            groups: [
                {name: "310_F*", number: 310, folder: "DMO FW", mode: Mode.DMO},
                {name: "311_F*", number: 311, folder: "DMO FW", mode: Mode.DMO}
            ],
        }
    ]
};
