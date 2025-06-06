import { Employee } from "@/types/employees";
import axiosInstance from "./axiosInstance";

export const createEmployee = async (employeeData: Employee): Promise<any> => {
    return await axiosInstance.post("employee", employeeData);
};

export const deleteEmployee = async (employeeData: Employee): Promise<any> => {
    return await axiosInstance.delete(`employee/${employeeData.id}`);
};

export const createNewAccessCode = async (phone: string): Promise<any> => {
    return await axiosInstance.post("createNewAccessCode", { phone });
};

export const validateAccessCode = async (
    phone: string,
    accessCode: string,
): Promise<any> => {
    return await axiosInstance.post("validateAccessCode", {
        phone,
        accessCode,
    });
};

export const fetcher = <T>(path: string): Promise<T> => {
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };

    return fetch(`http://localhost:8000/${path}`, {
        headers,
    }).then((res) => res.json() as Promise<T>);
};
