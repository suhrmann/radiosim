// /stores/useNavigationStore.ts
import {defineStore} from 'pinia';
import type {Folder, Group} from "~/types/interfaces";
import {folderData} from '@/data/folderData';

export const useNavigationStore = defineStore('navigation', {
    state: () => ({
        currentLevel: 1, // Gibt an, auf welcher Ebene wir uns befinden (0 = Root, 1 = erste Ebene, usw.)
        currentFolder: folderData as Folder,  // Der aktuelle Ordner, wenn wir tiefer als die Root-Ebene sind
        currentGroup: undefined as Group | undefined, // Die aktuelle Gruppe, wenn eine ausgewählt ist
        path: [] as string[], // Der Navigationspfad
        numberSearch: '',
    }),

    actions: {
        initialize(group: Group) {
            const foundFolder = this.find(group.folder, group.name);
            if (foundFolder) {
                const path = this.getFolderPath(foundFolder.name);
                path.pop();

                this.path = path;
                this.currentFolder = foundFolder;
                this.currentLevel = this.path.length + 1;
                this.currentGroup = group;
            } else {
                console.warn("Ordner oder Gruppe nicht gefunden.");
            }
        },

        navigateUp() {
            if (this.currentLevel > 1) {
                console.log(this.path)
                this.currentLevel--;
                this.path.pop();

                const folderByPath = this.getFolderByPath(this.path);
                this.currentFolder = folderByPath?.subFolders[0];
                if (this.currentFolder.groups?.length > 0) {
                    this.currentGroup = this.currentFolder.groups[0];
                } else {
                    this.currentGroup = undefined;
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
                    this.currentGroup = undefined;
                }
            }
        },

        navigateVertical(direction: 'left' | 'right') {
            console.log(this.path)
            const searchPath = this.path;
            if (this.currentLevel === 1) {
                searchPath.pop();
            }

            const curParentFolder = this.getFolderByPath(searchPath);

            if (curParentFolder?.subFolders && curParentFolder.subFolders.length > 0) {
                const currentIndex = curParentFolder.subFolders.findIndex(f => f.name === this.currentFolder.name);

                let nextIndex = 0;
                if (direction === 'right') {
                    nextIndex = (currentIndex + 1) % curParentFolder.subFolders.length;
                } else if (direction === 'left') {
                    nextIndex = (currentIndex - 1 + curParentFolder.subFolders.length) % curParentFolder.subFolders.length;
                }

                switch (direction) {
                    case 'left':
                        this.currentFolder = curParentFolder?.subFolders[nextIndex];
                        if (this.currentFolder.groups?.length > 0) {
                            this.currentGroup = this.currentFolder.groups[0];
                        } else {
                            this.currentGroup = undefined;
                        }
                        break;
                    case 'right':
                        this.currentFolder = curParentFolder?.subFolders[nextIndex];
                        if (this.currentFolder.groups?.length > 0) {
                            this.currentGroup = this.currentFolder.groups[0];
                        } else {
                            this.currentGroup = undefined;
                        }
                        break;
                    default:
                        console.log("Unkown direction!");
                        break;
                }
            }

        },

        navigateGroup(direction: 'clockwise' | 'counterclockwise') {
            const curFolder = this.find(this.currentFolder.name, this.currentGroup.name);
            console.log(curFolder);
            if (curFolder?.groups && curFolder.groups.length > 0) {
                const currentIndex = curFolder.groups.findIndex(g => g.name === this.currentGroup.name);
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
            console.log('Found ', group, ' and ', folder);

            if (group && folder) {
                this.currentGroup = group;
                this.currentFolder = folder;
            }
        },

        find(folder: string, groupName: string) {
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

            return searchFolders(folderData);
        },

        getFolderPath(folder: string): string[] {
            const path: string[] = [];

            function searchPath(currentFolder: Folder, currentPath: string[]): boolean {
                // Wenn der aktuelle Ordner dem gesuchten Namen entspricht
                if (currentFolder.name === folder) {
                    path.push(...currentPath);
                }

                // Falls der Ordner Unterordner hat, durchsuche sie rekursiv
                if (currentFolder.subFolders) {
                    for (const subFolder of currentFolder.subFolders) {
                        if (searchPath(subFolder, [...currentPath, subFolder.name])) {
                            return true;
                        }
                    }
                }

                return false;
            }

            searchPath(folderData, []);
            return path;
        },

        getFolderByPath(pathArray: string[]): Folder | null {
            let currentFolder: Folder | null = folderData;

            for (const folderName of pathArray) {
                if (currentFolder.subFolders) {
                    const nextFolder = currentFolder.subFolders.find(
                        (subFolder) => subFolder.name === folderName
                    );
                    if (nextFolder) {
                        currentFolder = nextFolder;
                    } else {
                        console.warn(`Ordner "${folderName}" nicht gefunden.`);
                        return null;
                    }
                } else {
                    console.warn("Keine Unterordner vorhanden.");
                    return null;
                }
            }

            return currentFolder;
        },

        findGroupByNumber(groupNumber: string): { group: Group; folder: Folder } | null {
            function searchFolders(currentFolder: Folder): { group: Group; folder: Folder } | null {
                // Falls der Ordner Gruppen hat, suchen wir nach der passenden Gruppe
                if (currentFolder.groups) {
                    const foundGroup = currentFolder.groups.find(
                        (group: Group) => group.number.toString() === groupNumber
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

            return searchFolders(folderData);
        },

    }
});
