import { IJobApplication, IJobApplicationChart } from "@/interfaces/mock.interface";

export const jobApplication: IJobApplication[] = Array.from({ length: 50 }, (_, index) => ({
    user_id: index + 1,
    employer_name: `Employer ${index + 1}`,
    applicant_name: `Applicant ${index + 1}`,
    position: `Position ${index + 1}`,
    status: index % 2 === 0 ? 'Open' : 'Closed',
    location: `Location ${index + 1}`,
    date: `2023-11-${index + 1}`,
}));

// Function to perform pagination
export function paginate(items: IJobApplication[], currentPage: number, itemsPerPage: number): IJobApplication[] {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
}

export const jobApplicationsChart: IJobApplicationChart[] = [
    { month: 'Jan', job_applications: 25 },
    { month: 'Feb', job_applications: 30 },
    { month: 'Mar', job_applications: 28 },
    { month: 'Apr', job_applications: 35 },
    { month: 'May', job_applications: 40 },
    { month: 'Jun', job_applications: 32 },
    { month: 'Jul', job_applications: 45 },
    { month: 'Aug', job_applications: 38 },
    { month: 'Sep', job_applications: 42 },
    { month: 'Oct', job_applications: 48 },
    { month: 'Nov', job_applications: 50 },
    { month: 'Dec', job_applications: 40 },
];