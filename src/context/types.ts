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

export interface IRole {
    "id": number;
    "roleName": string;
    "roleType": string;
    "assignmentRef": number;
    "organisationUnitId": string,
    "organisationUnitName": string,
}

export interface IRoleItem {
    "id": number,
    "roleName": string,
    "roleType": string,
    "roleSubType": string,
    "aggregatedRole": boolean,
    "organisationUnitId": string,
    "organisationUnitName": string,
}

export interface IRolePage {
    totalItems: number;
    totalPages: number | any;
    currentPage: number;
    roles: IRoleItem[];
}

export interface IUserItem {
    "id": number;
    "fullName": string;
    "organisationUnitName": string;
    "organisationUnitId": string;
    "userType": string;
}

export interface IUser {
    "id": number;
    "firstName": string;
    "lastName": string;
    "userType": string;
    "assignmentRef": number;
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
    totalItems: number;
    totalPages: number | any;
    currentPage: number;
    resources: IResource[];
}

export interface IOrgUnit {
    "id": number;
    "name": string;
    "organisationUnitId": string;
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
    organisationUnitId: string;
    parentRef: number;
    childrenRef: number[];
}

export interface IUnitTree {
    totalItems: number;
    totalPages: number | any;
    currentPage: number;
    orgUnits: IUnitItem[];
}

export interface IAssignment {
    id: number;
    resourceRef: number;
    resourceName: string;
    userRef: number;
    userDisplayname: string;
    userUsername: string;
    userType: string;
    assignerRef: number;
    assignerDisplayname: string;
    assignerUsername: string;
    roleRef: number;
    organizationUnitId: string;
}

/*export interface IAssignmentPage {
    totalItems: number;
    totalPages: number | any;
    currentPage: number;
    assignments: IAssignment[];
}*/

export interface IAssignedUsersPage {
    totalItems: number;
    totalPages: number | any;
    currentPage: number;
    users: IUser[];
}

export interface IAssignedRolesPage {
    totalItems: number;
    totalPages: number | any;
    currentPage: number;
    roles: IRole[];
}

export interface ICreateUserAssignment {
    id: number;
    resourceRef: number;
    userRef: number;
    organizationUnitId: string;
}

export interface ICreateRoleAssignment {
    id: number;
    resourceRef: number;
    roleRef: number;
    organizationUnitId: string;
}

export type ResourceContextState = {
    searchString: string;
    searchValue: (searchString: string) => void;

    orgUnits: IOrgUnit[];
    orgName: string;
    orgUnitPage: IOrgUnitPage | null;
    organisationUnitId: string;
    unitTree: IUnitTree | null;
    selected: string[];
    setSelected: (selected: string[]) => void;
    getOrgName: (orgName: string) => void;
    updateOrganisationUnitId: (id: string) => void;
    selectedOrgUnits: IUnitItem[];
    setSelectedOrgUnits: (selectedOrgUnits: IUnitItem[]) => void;

    resourceItem: IResourceItem | null;
    resourceDetails: IResource | null;
    resourcePage: IResourcePage | null;
    resourceSize: number;
    setResourceSize: (resourceSize: number) => void;
    currentResourcePage: number;
    updateCurrentResourcePage: (currentResourcePage: number) => void;
    getResourceById: (id: number) => void;
    // validForOrgUnits: IResourceItem[] | null;

    users: IUserItem[];
    userType: string;
    updateUserType: (userType: string) => void;
    user: IUser | null;
    page: IUserPage | null;
    currentUserPage: number;
    size: number;
    setSize: (size: number) => void;
    updateCurrentUserPage: (currentUserPage: number) => void;

    currentAssignmentPage: number;
    updateCurrentAssignmentPage: (currentAssignmentPage: number) => void;
    assignmentSize: number;
    setAssignmentSize: (assignmentSize: number) => void;
    assignedUsersPage: IAssignedUsersPage | null;
    getAssignedUsersPage: (id: number) => void;

    rolePage: IRolePage | null;
    roleType: string;
    updateRoleType: (roleType: string) => void;
    roleSize: number;
    setRoleSize: (roleSize: number) => void;
    currentRolePage: number;
    updateCurrentRolePage: (currentRolePage: number) => void;

    getAssignedRolesPage: (id: number) => void;
    assignedRolesPage: IAssignedRolesPage | null;
    assignedRoleSize: number;
    setAssignedRoleSize: (assignedRoleSize: number) => void;
    currentAssignedRolePage: number;
    updateCurrentAssignedRolePage: (currentAssignedRolePage: number) => void;

    createUserAssignment: (resourceRef: number, userRef: number, organizationUnitId: string) => void,
    createRoleAssignment: (resourceRef: number, roleRef: number, organizationUnitId: string) => void,
    deleteAssignment: (id: number) => void,

    objectType: string;
    setObjectType: (objectType: string) => void;
};

export const contextDefaultValues: ResourceContextState = {
    searchString: "",
    searchValue: () => {
    },
    orgUnits: [],
    orgName: "",
    orgUnitPage: null,
    organisationUnitId: '',
    unitTree: null,
    selected: [],
    setSelected(selected: string[]): void {
    },
    getOrgName(): void {
    },
    updateOrganisationUnitId(): void {
    },
    selectedOrgUnits: [],
    setSelectedOrgUnits(selectedOrgUnits: IUnitItem[]): void {
    },
    resourceItem: null,
    resourceDetails: null,
    resourcePage: null,
    resourceSize: 5,
    setResourceSize(resourceSize): void {
    },
    currentResourcePage: 0,
    updateCurrentResourcePage(): void {
    },
    getResourceById(): void {
    },
    // validForOrgUnits: [],
    users: [],
    userType: "",
    updateUserType(): void {
    },
    user: null,
    page: null,
    currentUserPage: 0,
    size: 5,
    setSize(size: number): void {
    },
    updateCurrentUserPage(): void {
    },
    currentAssignmentPage: 0,
    updateCurrentAssignmentPage(): void {
    },
    assignmentSize: 5,
    setAssignmentSize(assignmentSize: number): void {
    },
    assignedUsersPage: null,
    getAssignedUsersPage(): void {
    },
    rolePage: null,
    roleType: "",
    updateRoleType(): void {
    },
    roleSize: 5,
    setRoleSize(roleSize: number): void {
    },
    currentRolePage: 0,
    updateCurrentRolePage(): void {
    },
    getAssignedRolesPage(): void {
    },
    assignedRolesPage: null,
    assignedRoleSize: 5,
    setAssignedRoleSize(assignedRoleSize: number): void {
    },
    currentAssignedRolePage: 0,
    updateCurrentAssignedRolePage(): void {
    },
    createUserAssignment(): void {
    },
    createRoleAssignment(): void {
    },
    deleteAssignment(): void {
    },
    objectType: "",
    setObjectType(objectType: string): void {
    },
};

