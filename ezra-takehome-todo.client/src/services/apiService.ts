/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth0 } from '@auth0/auth0-react';

const API_BASE = "https://localhost:7038/api";

// Custom hook for authenticated API calls
export const useApiService = () => {
    const { getAccessTokenSilently, loginWithRedirect } = useAuth0();

    const getAuthHeaders = async (): Promise<HeadersInit> => {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        // Only add auth header if not in test mode
        const isTestMode = (window as any).__TEST_MODE__ || process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'testing';
        
        if (!isTestMode) {
            try {
                const token = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: "https://localhost:7038/api",
                        scope: "read:todos write:todos"
                    }
                });
                headers['Authorization'] = `Bearer ${token}`;
            } catch (error: any) {
                if (error.error === 'consent_required') {
                    // Redirect to login with consent
                    loginWithRedirect({
                        authorizationParams: {
                            audience: "https://localhost:7038/api",
                            scope: "read:todos write:todos",
                            prompt: "consent"
                        }
                    });
                    return headers; // Return empty headers for now
                }
                console.warn('Failed to get access token:', error);
            }
        }

        return headers;
    };

    const get = async <T>(endpoint: string): Promise<T> => {
        const headers = await getAuthHeaders();
        
        const response = await fetch(`${API_BASE}${endpoint}`, {
            method: 'GET',
            headers,
        });
        
        if (!response.ok) {
            throw new Error(`GET ${endpoint} failed: ${response.status} ${response.statusText}`);
        }

        return response.json();
    };

    const post = async <T>(endpoint: string, data: any): Promise<T> => {
        const headers = await getAuthHeaders();
        const response = await fetch(`${API_BASE}${endpoint}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`POST ${endpoint} failed: ${response.status} ${response.statusText}`);
        }

        return response.json();
    };

    const put = async <T>(endpoint: string, data?: any): Promise<T> => {
        const headers = await getAuthHeaders();
        const response = await fetch(`${API_BASE}${endpoint}`, {
            method: 'PUT',
            headers,
            body: data ? JSON.stringify(data) : undefined,
        });

        if (!response.ok) {
            throw new Error(`PUT ${endpoint} failed: ${response.status} ${response.statusText}`);
        }

        return response.json();
    };

    const del = async <T>(endpoint: string): Promise<T> => {
        const headers = await getAuthHeaders();
        const response = await fetch(`${API_BASE}${endpoint}`, {
            method: 'DELETE',
            headers,
        });

        if (!response.ok) {
            throw new Error(`DELETE ${endpoint} failed: ${response.status} ${response.statusText}`);
        }

        return response.json();
    };

    return { get, post, put, delete: del };
};
