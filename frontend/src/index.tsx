import './index.css';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from "@vercel/analytics/react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppRedirect } from './components/pages/AppRedirect';
import { MainPage } from './components/pages/MainPage';

const queryClient = new QueryClient();

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <QueryClientProvider client={queryClient}>
    <Analytics />
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/online-appen" element={<AppRedirect />} />
      </Routes>
    </Router>
  </QueryClientProvider>
);
