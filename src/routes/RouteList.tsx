import React, {useContext} from 'react';
import {Route, Routes} from 'react-router-dom';
import {ResourceContext} from "../context";
import MainContainer from "../features/main/MainContainer";
import DetailsContainer from "../features/details/DetailsContainer";
import AssignmentContainer from "../features/assignment/AssignmentContainer";
import EditAssignmentForUser from "../features/assignment/EditAssignmentForUser";

const RouteList = () => {
    const {basePath} = useContext(ResourceContext);

    return (
        <Routes>
            <Route path={`${basePath}/ressurser`} element={<MainContainer/>}/>
            <Route path={`${basePath}/ressurser/info/:id`} element={<DetailsContainer/>}/>
            <Route path={`${basePath}/ressurser/info/:id/tildeling`} element={<AssignmentContainer/>}/>
            <Route path={`${basePath}/ressurser/user/:id/rediger`} element={<EditAssignmentForUser/>}/>
        </Routes>
    )
}

export default RouteList;