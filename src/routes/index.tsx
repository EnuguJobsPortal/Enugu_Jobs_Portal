import { routes } from "@/routes/routes";
import { renderRoutes } from "@/utils/RouteUtils";
import NotFoundPage from "@/views/Error/404";
import Unauthorized from "@/views/Error/Unauthorized";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
    
    return (
        <Routes>
            { routes.map(( route ) => renderRoutes(route)) }
            <Route path="404" element={<NotFoundPage/>} />
            <Route path="/unauthorized" element={<Unauthorized/>} />
            <Route path="*" element={<NotFoundPage/>} />
        </Routes>
    )
}

export default AppRoutes;
