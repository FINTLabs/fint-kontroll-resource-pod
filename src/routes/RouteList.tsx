import React, {useContext} from 'react';
import {Route, Routes} from 'react-router-dom';
import {ResourceContext} from "../context";
import MainContainer from "../features/main/MainContainer";
import DetailsContainer from "../features/details/DetailsContainer";
import AssignmentContainer from "../features/assignment/AssignmentContainer";

const RouteList = () => {
    const {basePath} = useContext(ResourceContext);

    return (
        <Routes>
            <Route path={`${basePath}/ressurser`} element={<MainContainer/>}/>
            <Route path={`${basePath}/ressurser/info/:id`} element={<DetailsContainer/>}/>
            <Route path={`${basePath}/ressurser/info/:id/tildeling`} element={<AssignmentContainer/>}/>
        </Routes>
    )
}

export default RouteList;