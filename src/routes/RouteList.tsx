import React from 'react';
import {Route, Routes} from 'react-router-dom';
import MainContainer from "../features/main/MainContainer";
import {useBasePath} from "../context/BasePathContext";
import DetailsTempContainer from "../features/details/DetailsTempContainer";
import AssignmentTempContainer from "../features/assignment/AssignmentTempContainer";

const RouteList = () => {
    const basePath = useBasePath() || '';

    return (
        <main>
            <Routes>
                <Route path={`${basePath}/ressurser`} element={<MainContainer/>}/>
                <Route path={`${basePath}/ressurser/info/:id`} element={<DetailsTempContainer/>}/>
                <Route path={`${basePath}/ressurser/info/:id/tildeling`} element={<AssignmentTempContainer/>}/>
            </Routes>
        </main>
    )
}

export default RouteList;