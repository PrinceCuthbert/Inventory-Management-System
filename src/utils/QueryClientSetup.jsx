// QueryClientSetup.jsx - React Query configuration and provider setup

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Time in milliseconds that unused/inactive cache data remains in memory
            staleTime: 1000 * 60 * 5, // 5 minutes
            // Time in milliseconds that the cache survives unused/inactive
            cacheTime: 1000 * 60 * 10, // 10 minutes
            // Retry failed requests 3 times
            retry: 3,
            // Don't refetch on window focus by default
            refetchOnWindowFocus: false,
            // Refetch on reconnect
            refetchOnReconnect: true,
        },
        mutations: {
            // Retry failed mutations once
            retry: 1,
        },
    },
});

// Provider component that wraps your app
export const QueryProvider = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {/* Add devtools in development */}
            {process.env.NODE_ENV === 'development' && (
                <ReactQueryDevtools initialIsOpen={false} />
            )}
        </QueryClientProvider>
    );
};

export default queryClient;