import './index.css';
import { AppInsideProvider } from './components/AppInsideProvider';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient} >
      <AppInsideProvider/>
    </QueryClientProvider>
  );
}

export default App;