import { APP_ROLES } from '@/constants/roles';
import useAuth from '@/hooks/useAuth';
import { IRolesType } from '@/interfaces/general';
import { IRequiredRoles } from '@/interfaces/routes.interface';
import Auth from '@/utils/auth';
import Unauthroized from '@/views/Error/Unauthorized';
import React from 'react';
import { Navigate } from 'react-router-dom';

const RequiredRoles: React.FC<IRequiredRoles> = ({ children, allowedRoles }) => {
    // Check if the user is authenticated and has the required role
    const { isAuthenticated } = Auth;
    const { role } = useAuth();

    if(!isAuthenticated())
    {
        return <Navigate to="/signin" replace />;
    }

    if(!allowedRoles.includes(role) || !APP_ROLES.includes(role as unknown as IRolesType))
    {
        return <Unauthroized />;
    }

    return children;
};

export default RequiredRoles;
