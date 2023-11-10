import React from 'react';
import {Route, Routes} from 'react-router-dom';
import MainContainer from "../features/main/MainContainer";
import {useBasePath} from "../context/BasePathContext";
import AssignmentContainer from "../features/assignment/AssignmentContainer";
import DetailsContainer from "../features/details/DetailsContainer";

const RouteList = () => {
    const basePath = useBasePath() || '';

    return (
        <Routes>
            <Route path={`${basePath}/ressurser`} element={<MainContainer/>}/>
            <Route path={`${basePath}/ressurser/info/:id`} element={<DetailsContainer/>}/>
            <Route path={`${basePath}/ressurser/info/:id/tildeling`} element={<AssignmentContainer/>}/>
        </Routes>
    )
}

export default RouteList;