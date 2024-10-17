import './index.css';
import App from './App';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
    );


