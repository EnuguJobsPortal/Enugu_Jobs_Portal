export interface IJobPost {
    user_id: number;
    employer_name: string;
    position: string;
    status: string;
    location: string;
    date: string;
}

export interface IJobApplication {
    user_id: number;
    employer_name: string;
    applicant_name: string;
    position: string;
    status: string;
    location: string;
    date: string;
}

export interface IJobPostChart {
    month: string;
    job_posts: number;
}

export interface IJobApplicationChart {
    month: string;
    job_applications: number;
}

export interface IMonthlySalesChart {
    month: string;
    sales: number;
}

export interface IUsers {
    user: string;
    user_id: string;
    user_email: string;
    user_phone: string;
    location: string;
    user_type: string;
    member_since: string;
    is_active: string;
    sms_notifications: string;
    email_notifications: string;
    email_verification: string;
}

export interface IActivityLog {
    activityId: string;
    user: string;
    user_id: string;
    user_email: string;
    action: string;
    ip_address: string;
    user_agent: string;
    longitude: string;
    latitude: string;
    created_at: string;
}