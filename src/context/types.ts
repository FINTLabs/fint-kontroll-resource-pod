export interface IResource {
    id: number;
    resourceName: string;
    resourceType: string;
    resourceLimit: number;
    resourceId: string;
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

export type ResourceContextState = {
    basePath: string;
    resources: IResource[] | null;
    orgUnits: IOrgUnit[];
    orgName: string;
    orgUnitPage: IOrgUnitPage | null;
    getOrgName: (orgName: string) => void;
    organisationUnitId: number;
    updateOrganisationUnitId: (id: number) => void;
    unitTree: IUnitTree | null;
    selected: number[];
    setSelected: (selected: number[]) => void;
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

};
