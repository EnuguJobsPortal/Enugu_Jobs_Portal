import { IJobPost, IJobPostChart } from "@/interfaces/mock.interface";

export const jobPosts: IJobPost[] = Array.from({ length: 50 }, (_, index) => ({
    user_id: index + 1,
    employer_name: `Employer ${index + 1}`,
    position: `Position ${index + 1}`,
    status: index % 2 === 0 ? 'Open' : 'Closed',
    location: `Location ${index + 1}`,
    date: `2023-11-${index + 1}`,
}));

// Function to perform pagination
export function paginate(items: IJobPost[], currentPage: number, itemsPerPage: number): IJobPost[] {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
}

export const jobPostChart: IJobPostChart[] = [
    { month: 'Jan', job_posts: 30 },
    { month: 'Feb', job_posts: 28 },
    { month: 'Mar', job_posts: 35 },
    { month: 'Apr', job_posts: 40 },
    { month: 'May', job_posts: 32 },
    { month: 'Jun', job_posts: 45 },
    { month: 'Jul', job_posts: 38 },
    { month: 'Aug', job_posts: 42 },
    { month: 'Sep', job_posts: 48 },
    { month: 'Oct', job_posts: 50 },
    { month: 'Nov', job_posts: 40 },
    { month: 'Dec', job_posts: 33 },
];