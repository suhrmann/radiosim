export interface Folder {
    name: string;
    groups?: Group[]; // Optional: Kann Gruppen enthalten
    subFolders?: Folder[]; // Optional: Kann Unterordner enthalten
}

export interface Group {
    name: string;
    number: number;
    folder: string;
    mode: Mode;
}

export interface Contexts {
    left: string | null;
    middle: string | null;
    right: string | null;
}

export enum Mode {
    DMO = "DMO",
    TMO = "TMO",
}