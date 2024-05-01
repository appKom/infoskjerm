import './index.css';
import App from './App';
import { createRoot } from 'react-dom/client';
import React from 'react';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const container = document.getElementById('root')!;
const root = createRoot(container);
const queryClient = new QueryClient();
root.render(<QueryClientProvider client={queryClient}><App /></QueryClientProvider>);

