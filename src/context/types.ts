export interface IResource {
    id: number;
    resourceName: string;
    resourceType: string;
    resourceLimit: number;
    resourceId: string;
}

export type ResourceContextState = {
    basePath: string;
    resources: IResource[] | null;
};

export const contextDefaultValues: ResourceContextState = {
    basePath: "/",
    resources: [],
};
