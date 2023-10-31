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
    "assignmentRef":number;
}

export interface IRolePage {
    totalItems: number;
    totalPages: number | any;
    currentPage: number;
    roles: IRole[];
}

export interface IUserItem {
    "id": number;
    "fullName": string;
    "organisationUnitName": string;
    "organisationUnitId": number;
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

export interface IAssignmentPage {
    totalItems: number;
    totalPages: number | any;
    currentPage: number;
    assignments: IAssignment[];
}

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
    createUserAssignment: (resourceRef: number, userRef: number, organizationUnitId: string) => void,
    createRoleAssignment: (resourceRef: number, roleRef: number, organizationUnitId: string) => void,
    deleteAssignment: (id: number) => void,
    basePath: string;
   // validForOrgUnits: IResourceItem[] | null;
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
    resourceSize: number;
    setResourceSize: (resourceSize: number) => void;
    currentResourcePage: number;
    updateCurrentResourcePage: (currentResourcePage: number) => void;
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
    updateRoleType: (roleType: string) => void;
    updateCurrentUserPage: (currentUserPage: number) => void;
    currentAssignmentPage: number;
    updateCurrentAssignmentPage: (currentAssignmentPage: number) => void;
    assignmentSize: number;
    setAssignmentSize: (assignmentSize: number) => void;
    assignedUsersPage: IAssignedUsersPage | null;
    getAssignmentsPage: (id: number) => void;
    user: IUser | null;
    getAssignedRolesPage: (id: number) => void;
    assignedRolesPage: IAssignedRolesPage | null;
    assignedRoleSize: number;
    setAssignedRoleSize: (assignedRoleSize: number) => void;
    currentAssignedRolePage: number;
    updateCurrentAssignedRolePage: (currentAssignedRolePage: number) => void;
    rolePage: IRolePage | null;
    roleType: string;
    roleSize: number;
    setRoleSize: (roleSize: number) => void;
    currentRolePage: number;
    updateCurrentRolePage: (currentRolePage: number) => void;
    objectType: string;
    setObjectType: (objectType: string) => void;
};

export const contextDefaultValues: ResourceContextState = {
    basePath: "/",
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
   // validForOrgUnits: [],
    resourceDetails: null,
    resourceItem: null,
    resourcePage: null,
    resourceSize: 5,
    setResourceSize(resourceSize): void {},
    currentResourcePage: 0,
    updateCurrentResourcePage(): void {
    },
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
    updateRoleType(): void {},
    updateCurrentUserPage(): void {
    },
    createUserAssignment(): void {
    },
    createRoleAssignment(): void {
    },
    deleteAssignment(): void {
    },
    currentAssignmentPage: 0,
    updateCurrentAssignmentPage(): void {
    },
    assignmentSize: 5,
    setAssignmentSize(assignmentSize: number): void {
    },
    assignedUsersPage: null,
    getAssignmentsPage(): void {
    },
    user: null,
    assignedRolesPage: null,
    assignedRoleSize: 5,
    setAssignedRoleSize(assignedRoleSize: number): void {},
    currentAssignedRolePage: 0,
    updateCurrentAssignedRolePage(): void {},
    rolePage: null,
    roleType: "",
    roleSize: 5,
    setRoleSize(roleSize: number): void {},
    currentRolePage: 0,
    updateCurrentRolePage(): void {},
    getAssignedRolesPage(): void {
    },
    objectType: "",
    setObjectType(objectType: string): void{},
};

