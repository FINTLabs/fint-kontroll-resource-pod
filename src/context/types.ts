export interface IResource {
    id: number;
    resourceId: string;
    resourceName: string;
    resourceType: string;
    resourceLimit: number;
    applicationAccessType: string;
    applicationAccessRole: string;
    accessType: string;
    "platform": [],
    "resourceOwnerOrgUnitId": string,
    "resourceOwnerOrgUnitName": string,
    validForOrgUnits: IResourceItem[];
    validForRoles: string;
}

export interface IUserItem {
    "id": number;
    "fullName": string;
    "organisationUnitName": string;
    "organisationUnitId": number;
    "userType": string;
}

export interface IUserPage {
    totalItems: number;
    totalPages: number | any;
    currentPage: number;
    users: IUserItem[];
}

export interface IResourceItem {
    id: number;
    resourceId: string;
    orgunitId: string;
    orgUnitName: string;
    resourceLimit: number;

}

export interface IResourcePage {
    totalPages: number | any;
    currentPage: number;
    resources: IResource[];
}

export interface IOrgUnit {
    "id": number;
    "name": string;
    "organisationUnitId": number;
}

export interface IOrgUnitPage {
    orgUnits: IOrgUnit[];
    totalItems: number;
    totalPages: number | any;
    currentPage: number;
}

export interface IUnitItem {
    id: number;
    resourceId: string;
    name: string;
    organisationUnitId: number;
    parentRef: number;
    childrenRef: number[];
}

export interface IUnitTree {
    totalItems: number;
    totalPages: number | any;
    currentPage: number;
    orgUnits: IUnitItem[];
}

export interface ICreateAssignment {
    id: number;
    resourceRef: string;
    userRef: string;
    organizationUnitId: string;
}

export type ResourceContextState = {
    createAssignment: (resourceRef: string, userRef: string, organizationUnitId: string) => void,
    deleteAssignment: (id: number) => void,
    basePath: string;
    resources: IResource[] | null;
    validForOrgUnits: IResourceItem[] | null;
    orgUnits: IOrgUnit[];
    orgName: string;
    orgUnitPage: IOrgUnitPage | null;
    getOrgName: (orgName: string) => void;
    organisationUnitId: number;
    updateOrganisationUnitId: (id: number) => void;
    unitTree: IUnitTree | null;
    selected: number[];
    setSelected: (selected: number[]) => void;
    resourceDetails: IResource | null;
    resourceItem: IResourceItem | null;
    resourcePage: IResourcePage | null;
    currentPage: number;
    searchString: string;
    getResourceById: (id: string) => void;
    searchValue: (searchString: string) => void;
    users: IUserItem[];
    userType: string;
    page: IUserPage | null;
    currentUserPage: number;
    size: number;
    setSize: (size: number) => void;
    updateUserType: (userType: string) => void;
    updateCurrentUserPage: (currentUserPage: number) => void;
    isAggregate: boolean;
    setIsAggregate: (isAggregate: boolean) => void;
};

export const contextDefaultValues: ResourceContextState = {
        basePath: "/",
        resources: [],
        orgUnits: [],
        orgName: "",
        orgUnitPage: null,
        organisationUnitId: 0,
        getOrgName(): void {
        },
        updateOrganisationUnitId(): void {
        },
        unitTree: null,
        selected: [],
        setSelected(selected: number[]): void {
        },
        validForOrgUnits: [],
        resourceDetails: null,
        resourceItem: null,
        resourcePage: null,
        currentPage: 0,
        searchString: "",
        getResourceById(): void {
        },
        searchValue: () => {
        },
        users: [],
        userType: "",
        page: null,
        currentUserPage: 0,
        size: 5,
        setSize(size: number): void {
        },
        updateUserType(): void {
        },
        updateCurrentUserPage(): void {
        },
        createAssignment(): void {
        },
        deleteAssignment(): void {
        },
        isAggregate: false,
        setIsAggregate(isAggregate: boolean): void {
        },
    }
;
