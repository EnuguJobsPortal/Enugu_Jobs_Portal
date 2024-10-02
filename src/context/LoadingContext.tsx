import AppLoader from '@/components/AppLoader';
import { LoadingContextProps, LoadingContextType } from '@/interfaces/context.interface';
import React, { createContext, useContext, useEffect, useState } from 'react';

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

const LoadingProvider: React.FC<LoadingContextProps> = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);

	const showLoading = () => {
		setIsLoading(true);
	};

	const hideLoading = () => {
		setIsLoading(false);
	};

	// Ensure that the loading modal is hidden when the component is unmounted
	useEffect(() => {
		return () => {
			setIsLoading(false);
		};
	}, []);

	return (
		<LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
			{children}
			<AppLoader open={isLoading} />
		</LoadingContext.Provider>
	);
};

const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
	throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export { LoadingProvider, useLoading };
