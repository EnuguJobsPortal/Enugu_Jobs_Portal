import { roleObject } from "@/constants/roles";
import { ISidebarData } from "@/interfaces/layout.interface";

export const DASHBOARD_SIDEBAR_DATA: ISidebarData[] = [
    {
        section: 'Manage',
        links: [
            {
                key: "dashboard",
                label: "Dashboard",
                path: '/admin/dashboard',
                icon: 'Home',
                allowedRoles: [ roleObject.ADMIN, roleObject.SUPERADMIN ]
            },
            {
                key: "users",
                label: "Users",
                path: '/admin/users',
                icon: 'Users2',
                allowedRoles: [ roleObject.ADMIN, roleObject.SUPERADMIN ],
                isDropdown: true,
                isDropdownOpen: false,
                dropdownItems: [
                    {
                        label: "User Management",
                        path: '/admin/users/user-management',
                        icon: 'UserCheck2',
                        allowedRoles: [ roleObject.ADMIN, roleObject.SUPERADMIN ],
                    },
                    {
                        label: "User Activity Log",
                        path: '/admin/users/activity-log',
                        icon: 'Contact',
                        allowedRoles: [ roleObject.ADMIN, roleObject.SUPERADMIN ],
                    },
                    {
                        label: "User Testimonials",
                        path: '/admin/users/testimonials',
                        icon: 'UserPlus',
                        allowedRoles: [ roleObject.ADMIN, roleObject.SUPERADMIN ],
                    }
                ]
            },
            {
                key: "jobs",
                label: "Jobs",
                path: '/admin/jobs',
                icon: 'ShoppingBag',
                allowedRoles: [ roleObject.ADMIN, roleObject.SUPERADMIN ],
                isDropdown: true,
                isDropdownOpen: false,
                dropdownItems: [
                    /* {
                        label: "Job Management",
                        path: '/admin/jobs/job-management',
                        icon: 'Folders',
                    }, */
                    {
                        label: "New Job Post",
                        path: '/admin/jobs/new-job-post',
                        icon: 'FilePlus2',
                        allowedRoles: [ roleObject.ADMIN, roleObject.SUPERADMIN ],
                    },
                    {
                        label: "Job Posts",
                        path: '/admin/jobs/job-posts',
                        icon: 'ScrollText',
                        allowedRoles: [ roleObject.ADMIN, roleObject.SUPERADMIN ],
                    },
                    {
                        label: "Approvals",
                        path: '/admin/jobs/approvals',
                        icon: 'CheckSquare',
                        allowedRoles: [ roleObject.SUPERADMIN ]
                    },
                    {
                        label: "Applications",
                        path: '/admin/jobs/applications',
                        icon: 'BookOpenCheck',
                        allowedRoles: [ roleObject.ADMIN, roleObject.SUPERADMIN ],
                    }
                ]
            },
            {
                key: "admin-packages",
                label: "Packages",
                path: '/admin/packages',
                icon: 'FolderClosed',
                allowedRoles: [ roleObject.ADMIN, roleObject.SUPERADMIN ],
                isDropdown: true,
                isDropdownOpen: false,
                dropdownItems: [
                    {
                        label: "Employer Packages",
                        path: '/admin/packages/employer-packages',
                        icon: 'Building2',
                        allowedRoles: [ roleObject.ADMIN, roleObject.SUPERADMIN ],
                    },
                    {
                        label: "Seeker Packages",
                        path: '/admin/packages/seeker-packages',
                        icon: 'Keyboard',
                        allowedRoles: [ roleObject.ADMIN, roleObject.SUPERADMIN ],
                    },
                    {
                        label: "Seeker Subscriptions",
                        path: '/admin/packages/seeker-package-subscriptions',
                        icon: 'UserCheck',
                        allowedRoles: [ roleObject.ADMIN, roleObject.SUPERADMIN ],
                    }
                ]
            },
        ]
    },
    {
        section: 'Analyze',
        links: [
            {
                key: "blog",
                label: "Blog",
                path: '/admin/blog',
                icon: 'Send',
                allowedRoles: [ roleObject.ADMIN, roleObject.SUPERADMIN ],
                isDropdown: true,
                isDropdownOpen: false,
                dropdownItems: [
                    {
                        label: "Blog Categories",
                        path: '/admin/blog/categories',
                        icon: 'SlidersHorizontal',
                        allowedRoles: [ roleObject.ADMIN, roleObject.SUPERADMIN ],
                    },
                    {
                        label: "Blog Posts",
                        path: '/admin/blog/posts',
                        icon: 'SquareStack',
                        allowedRoles: [ roleObject.ADMIN, roleObject.SUPERADMIN ],
                    },
                    {
                        label: "Blog Comments",
                        path: '/admin/blog/comments',
                        icon: 'FileEdit',
                        allowedRoles: [ roleObject.ADMIN, roleObject.SUPERADMIN ],
                    }
                ]
            },
            {
                key: "messages",
                label: "Messages",
                path: '/admin/messages',
                icon: 'MessageCircle',
                allowedRoles: [ roleObject.ADMIN, roleObject.SUPERADMIN ]
            },
            {
                key: "mailing-list",
                label: "Mailing List",
                path: '/admin/mailing-list',
                icon: 'ScrollText',
                allowedRoles: [ roleObject.ADMIN, roleObject.SUPERADMIN ],
            }
        ]
    },
    {
        section: 'My Account',
        links: [
            {
                key: "settings",
                label: "Settings",
                path: '/admin/settings/account',
                icon: 'Settings',
                allowedRoles: [ roleObject.ADMIN, roleObject.SUPERADMIN ]
            }
        ]
    }
]