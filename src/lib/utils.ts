import { clsx, type ClassValue } from "clsx";
import { isValid, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";
 
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const isValidDateString = (dateString: string): boolean => {
	// Attempt to parse the string to a Date object
	const parsedDate = parseISO(dateString);

	// Check if the parsed date is valid
	return isValid(parsedDate);
};

type fileType = 'image' | 'docs';

export function isValidFileType(fileName:string, fileType:fileType) {
	const validFileExtensions:{image:string[]; docs:string[]} = { 
		image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'],
		docs: ['pdf']
	};
	
	return fileName && validFileExtensions[fileType].indexOf(String(fileName.split('.').pop())) > -1;
}
