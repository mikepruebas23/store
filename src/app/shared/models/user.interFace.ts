
export type Roles = 'SUSCRIPTOR' |   'EDITOR'    | 'ADMIN';
export interface User {
    uid: string;
    email: string;
    password?: string;
    emailVerified: boolean;
    firstTime?: boolean;
    role?: Roles;
    photoURL?: string;
    displayName?: string;
    tagName?: string;
    rnkPoints?: number;
    main?: string;
    secondary?: string;
    state?: string;
    switchCode?: string;
    position?: any;
}
export class smashDataList {
    uid: string;
    position: number;
    tagName: string ;
    main: string;
    points: string;
}
// Columns 1
export const SmashPlayerColumns: string[] = [
    'pos',
    'tagName',
    'main',
    'rnkPoints'
];

export interface likesCount {
    value: number;
    uidUsuarios: object;
}