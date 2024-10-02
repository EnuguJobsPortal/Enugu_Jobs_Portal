import Auth from "@/utils/auth";
import axios, { InternalAxiosRequestConfig } from "axios";

const Api = axios.create({
	baseURL: import.meta.env.VITE_ENUGU_JOBS_API_BASE_URL,
	//baseURL: 'api/v1',
	//baseURL: 'http://217.72.195.123:8081/api/v1'
});

Api.interceptors.request.use(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	(config: InternalAxiosRequestConfig<any>) => {
		if (Auth.isAuthenticated()) {
			config.headers["Authorization"] = `Bearer ${Auth.getToken()}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

Api.interceptors.response.use(
	(response) => response,
	(error) => Promise.reject(error)
);
  
export default Api;