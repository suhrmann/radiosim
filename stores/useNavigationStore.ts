// /stores/useNavigationStore.ts
import type {Folder, Group, Root} from "~/types/interfaces";
import {folderData} from '@/data/folderData';

export const useNavigationStore = defineStore('navigation', {
    state: () => ({
        currentLevel: 1, // Gibt an, auf welcher Ebene wir uns befinden (0 = Root, 1 = erste Ebene, usw.)
        currentFolder: null as Folder | null,  // Der aktuelle Ordner, wenn wir tiefer als die Root-Ebene sind
        currentGroup: null as Group | null, // Die aktuelle Gruppe, wenn eine ausgewählt ist
        path: [] as string[], // Der Navigationspfad
        numberSearch: '',
    }),

    actions: {
        initialize(selectedGroup?: Group) {
            if (selectedGroup) {
                const {group, folder} = this.findGroupByNumber(selectedGroup.number) || {group: null, folder: null};

                if (folder) {
                    const path = this.getFolderPath(folder.name);
                    this.path = path;
                    this.currentFolder = folder;
                    this.currentLevel = this.path.length + 1;
                    this.currentGroup = group;
                } else {
                    console.warn("Ordner oder Gruppe nicht gefunden.");
                }
            } else {
                this.currentLevel = 1;
                this.currentFolder = folderData.folders[0];
                this.currentGroup = null;
                this.path = [];
            }
        },

        navigateUp() {
            if (this.currentLevel > 1) {
                this.currentLevel--;

                const parentFolder = this.path[this.path.length - 1]; // letzten Parent-Ordner merken

                if (this.path.length == 0) {
                    this.path.pop();
                    this.currentFolder = folderData.folders.find(f => f.name === parentFolder) || null;
                    this.currentGroup = null;
                } else {
                    this.currentFolder = this.getFolderByPath(this.path);
                    this.path.pop();
                    if (this.currentFolder.groups?.length > 0) {
                        this.currentGroup = this.currentFolder.groups[0];
                    } else {
                        this.currentGroup = null;
                    }
                }

            }
        },

        navigateDown() {
            if (this.currentFolder.subFolders?.length > 0) {
                this.currentLevel++;
                this.path.push(this.currentFolder.name);

                this.currentFolder = this.currentFolder.subFolders[0];
                if (this.currentFolder.groups?.length > 0) {
                    this.currentGroup = this.currentFolder.groups[0];
                } else {
                    this.currentGroup = null;
                }
            }
        },

        navigateVertical(direction: 'left' | 'right') {
            console.log("Navigate", direction, "on [", ...this.path, "] (", this.currentLevel, ")");

            const curParentFolder = this.getFolderByPath(this.path);

            if (!curParentFolder) { // wir sind auf Root-Level
                this.navigateThrough(folderData.folders, direction);
            } else if (curParentFolder.subFolders) { // wir sind auf einer Unterebene
                this.navigateThrough(curParentFolder.subFolders, direction);
            }


        },

        navigateThrough(folders: Folder[], direction: 'left' | 'right') {
            const currentIndex = folders.findIndex(f => f.name === this.currentFolder?.name);

            let nextIndex = 0;
            if (direction === 'right') {
                nextIndex = (currentIndex + 1) % folders.length;
            } else if (direction === 'left') {
                nextIndex = (currentIndex - 1 + folders.length) % folders.length;
            }

            switch (direction) {
                case 'left':
                    this.currentFolder = folders[nextIndex];
                    if (this.currentFolder.groups?.length > 0) {
                        this.currentGroup = this.currentFolder.groups[0];
                    } else {
                        this.currentGroup = null;
                    }
                    break;
                case 'right':
                    this.currentFolder = folders[nextIndex];
                    if (this.currentFolder.groups?.length > 0) {
                        this.currentGroup = this.currentFolder.groups[0];
                    } else {
                        this.currentGroup = null;
                    }
                    break;
                default:
                    console.log("Unkown direction!");
                    break;
            }
        },

        navigateGroup(direction: 'clockwise' | 'counterclockwise') {
            if (this.currentFolder === null || this.currentGroup === null) {
                console.warn('Navigieren nicht möglich, da kein Order oder keine Gruppe gewählt ist.');
                return;
            }

            const curFolder = this.findFolder(this.currentFolder.name, this.currentGroup.name);
            console.log(curFolder);
            if (curFolder?.groups && curFolder.groups.length > 0) {
                const currentIndex = curFolder.groups.findIndex(g => g.name === this.currentGroup?.name);
                console.log("Current: ", currentIndex);

                let nextIndex = currentIndex;
                if (direction === 'clockwise') {
                    nextIndex = (currentIndex + 1) % curFolder.groups.length;
                } else if (direction === 'counterclockwise') {
                    nextIndex = (currentIndex - 1 + curFolder.groups.length) % curFolder.groups.length;
                }
                console.log("Next: ", nextIndex);

                this.currentGroup = curFolder?.groups[nextIndex];
            }

        },

        navigateByNumber(groupNumber: string) {
            this.currentFolder = null;
            this.currentGroup = null;

            this.numberSearch += groupNumber;

            console.log('Searching with group ', this.numberSearch);
            const {group, folder} = this.findGroupByNumber(this.numberSearch) ?? {};

            if (group && folder) {
                console.log('Found ', group.name, ' and ', folder.name);
                this.currentGroup = group;
                this.currentFolder = folder;
                this.path = this.getFolderPath(folder.name);
                this.currentLevel = this.path.length + 1;
                this.numberSearch = '';
                return;
            }

            console.warn('Did not find group for', this.numberSearch);
        },

        findFolder(folder: string, groupName: string) {
            function searchRoot(root: Root): Folder | null {
                for (const folder of root.folders) {
                    const found = searchFolders(folder);
                    if (found) {
                        return found;
                    }
                }

                return null;
            }

            function searchFolders(currentFolder: Folder): Folder | null {
                // Wenn der aktuelle Ordner dem gesuchten Namen entspricht
                if (currentFolder.name === folder) {
                    // Falls der Ordner Gruppen hat, suchen wir nach der passenden Gruppe
                    if (currentFolder.groups) {
                        const foundGroup = currentFolder.groups.find(
                            (group: Group) => group.name === groupName
                        );
                        if (foundGroup) {
                            return currentFolder;
                        }
                    }
                }

                // Falls der Ordner Unterordner hat, durchsuche sie rekursiv
                if (currentFolder.subFolders) {
                    for (const subFolder of currentFolder.subFolders) {
                        const result = searchFolders(subFolder);
                        if (result) {
                            return result;
                        }
                    }
                }

                // Wenn nichts gefunden wurde, gib null zurück
                return null;
            }

            return searchRoot(folderData);
        },

        getFolderPath(search: string): string[] {
            console.debug('Searching for folder', search);
            let path: string[] = [];

            for (const folder of folderData.folders) {
                const found = this.searchPath(search, folder, [folder.name]);
                if (found.length > 0) {
                    path.push(...found);
                    return path;
                }
            }

            console.debug('Found folder in', path);
            return path;
        },

        searchPath(search: string, currentFolder: Folder, currentPath: string[]): string[] {
            let path: string[] = [];

            console.debug('Searching for folder', search, 'inside', currentFolder.name);

            // Wenn der aktuelle Ordner dem gesuchten Namen entspricht
            if (currentFolder.name === search) {
                path.push(...currentPath);
                return path;
            }

            // Falls der Ordner Unterordner hat, durchsuche sie rekursiv
            if (currentFolder.subFolders) {
                for (const subFolder of currentFolder.subFolders) {
                    // wenn der Ordner bereits im currentFolder ist nicht weiter suchen
                    if (subFolder.name === search) {
                        return currentPath;
                    }

                    // ansonsten eine Ebene tiefer suchen
                    path.push(...this.searchPath(search, subFolder, [...currentPath, subFolder.name]));
                }
            }

            return path;
        },

        getFolderByPath(pathArray: string[]): Folder | null {
            console.log('getFolderByPath...');

            let root: Root = folderData;
            let currentFolder: Folder | null = null;

            for (const folderName of pathArray) {
                if (currentFolder) {
                    if (currentFolder.subFolders) {
                        const nextFolder: Folder | null = currentFolder.subFolders.find(
                            (subFolder) => subFolder.name === folderName
                        ) || null;

                        if (nextFolder) {
                            currentFolder = nextFolder;
                        } else {
                            console.warn(`Ordner "${folderName}" nicht gefunden.`);
                            return null;
                        }
                    }
                } else {
                    const nextFolder: Folder | null = root.folders.find(
                        (subFolder) => subFolder.name === folderName
                    ) || null;

                    if (nextFolder) {
                        currentFolder = nextFolder;
                    } else {
                        console.warn(`Ordner "${folderName}" nicht gefunden.`);
                    }
                }
            }

            return currentFolder;
        },

        findGroupByNumber(groupNumber: number): { group: Group; folder: Folder } | null {
            console.log('Searching for', groupNumber);

            function searchFolders(currentFolder: Folder): { group: Group; folder: Folder } | null {
                // Falls der Ordner Gruppen hat, suchen wir nach der passenden Gruppe
                if (currentFolder.groups) {
                    const foundGroup = currentFolder.groups.find(
                        (group: Group) => group.number == groupNumber
                    );
                    if (foundGroup) {
                        return {group: foundGroup, folder: currentFolder};
                    }
                }

                // Falls der Ordner Unterordner hat, durchsuche sie rekursiv
                if (currentFolder.subFolders) {
                    for (const subFolder of currentFolder.subFolders) {
                        const result = searchFolders(subFolder);
                        if (result) {
                            return result;
                        }
                    }
                }

                // Wenn nichts gefunden wurde, gib null zurück
                return null;
            }

            for (const folder of folderData.folders) {
                const found = searchFolders(folder);
                if (found) {
                    return found;
                }
            }
            return null;
        },

    },
});
