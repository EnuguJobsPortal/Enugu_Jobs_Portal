import React, { ReactNode } from "react";
import { ToastOptions } from "react-toastify";
import { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

/* NAVTITLE CONTEXTS */
export interface INavTitle {
	title: string;
}

export interface INavTitleContext {
	title?: INavTitle;
	setTitle?: React.Dispatch<React.SetStateAction<INavTitle>>;
}

/* SIDEBAR CONTEXTS */
export interface ISidebarContextProps {
    isExpanded: boolean;
    setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
    activeDropdownIndex: string | null;
    setActiveDropdownIndex: React.Dispatch<React.SetStateAction<string | null>>;
    scrollbarVisible: boolean; 
    setScrollbarVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

/* BREADCRUMB CONTEXTS */
export type ILinkType = {
    label: string;
    value: string;
};

export type IBreadCrumbState = {
    current: string;
    links?: ILinkType[];
    isBack?: boolean;
    isVisible?: boolean;
};
  
export type IBreadCrumbContext = {
    breadCrumb?: IBreadCrumbState;
    setBreadCrumb?: React.Dispatch<React.SetStateAction<IBreadCrumbState>>;
};
  
export type IBreadCrumbProvider = {
    children: React.ReactNode;
};

/* ACTION BUTTOM CONTEXT */
export interface ActionButtonState {
    btntext?: string;
    btnOnAction?: () => void;
    isVisible?: boolean;
}
  
export type ActionButtonContextProps = {
    actionBtn?: ActionButtonState[];
    setActionBtn?: React.Dispatch<React.SetStateAction<ActionButtonState[]>>;
};

export interface SweetAlertContextProps {
    showError: (title: string, text?: string) => void;
    showInfo: (title: string, text?: string) => void;
    showSuccess: (title: string, text?: string) => void;
    showConfirm: (
      title: string,
      text?: string,
      confirmButtonText?: string,
      showCancelButton?: boolean
    ) => Promise<SweetAlertResult<SweetAlertOptions>>;
}

export interface SweetAlertProviderProps {
    children: React.ReactNode;
}

export interface LoadingContextProps {
    children: React.ReactNode;
}
  
export interface LoadingContextType {
    isLoading: boolean;
    showLoading: () => void;
    hideLoading: () => void;
}

// Notification context type
export type NotificationContextType = {
    notify: (message: string, options?: ToastOptions) => void;
};

export type NotificationProviderProps = {
    children: ReactNode;
};

export interface IMobileSidebarContextProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    activeDropdownIndex: string | null;
    setActiveDropdownIndex: React.Dispatch<React.SetStateAction<string | null>>;
    scrollbarVisible: boolean; 
    setScrollbarVisible: React.Dispatch<React.SetStateAction<boolean>>;
}