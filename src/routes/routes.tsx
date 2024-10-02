import { roleObject } from "@/constants/roles";
import { IBaseRoutes } from "@/interfaces/routes.interface";
import MainLayout from "@/layout/MainLayout";
import React from "react";

export const routes: IBaseRoutes[] = [
    {
        path: "/",
        component: React.lazy(() => import("@/views/Authentication/Home")),
    },
    {
        path: "/signin",
        component: React.lazy(() => import("@/views/Authentication/SignIn")),
    },
    {
        path: "/forgot-password",
        component: React.lazy(() => import("@/views/Authentication/ForgotPassword")),
    },
    {
        path: "/admin/dashboard",
        component: React.lazy(() => import("@/views/Admin/Dashboard")),
        allowedRoles: [ roleObject.SUPERADMIN, roleObject.ADMIN ],
        layout: MainLayout,
        isAuthenticated: true
    },
    {
        path: "/admin/users/*",
        component: React.lazy(() => import("@/routes/UserMgtRoutes")),
        allowedRoles: [ roleObject.SUPERADMIN, roleObject.ADMIN ],
        layout: MainLayout,
        isAuthenticated: true,
    },
    {
        path: "/admin/jobs/*",
        component: React.lazy(() => import("@/routes/JobMgtRoutes")),
        allowedRoles: [ roleObject.SUPERADMIN, roleObject.ADMIN ],
        layout: MainLayout,
        isAuthenticated: true,
    },
    {
        path: "/admin/packages/*",
        component: React.lazy(() => import("@/routes/PackageRoutes")),
        allowedRoles: [ roleObject.SUPERADMIN, roleObject.ADMIN ],
        layout: MainLayout,
        isAuthenticated: true,
    },
    {
        path: "/admin/blog/*",
        component: React.lazy(() => import("@/routes/BlogRoutes")),
        allowedRoles: [ roleObject.SUPERADMIN, roleObject.ADMIN ],
        layout: MainLayout,
        isAuthenticated: true,
    },
    {
        path: "/admin/messages",
        component: React.lazy(() => import("@/views/Admin/Messages")),
        allowedRoles: [ roleObject.SUPERADMIN, roleObject.ADMIN ],
        layout: MainLayout,
        isAuthenticated: true
    },
    {
        path: "/admin/mailing-list",
        component: React.lazy(() => import("@/views/Admin/MailingList")),
        allowedRoles: [ roleObject.SUPERADMIN, roleObject.ADMIN ],
        layout: MainLayout,
        isAuthenticated: true
    },
    {
        path: "/admin/settings/*",
        component: React.lazy(() => import("@/routes/SettingsRoutes")),
        allowedRoles: [ roleObject.SUPERADMIN, roleObject.ADMIN ],
        layout: MainLayout,
        isAuthenticated: true,
    },
]