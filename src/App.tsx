import './App.css';
import Home from './pages/Home';
import { ThemeProvider } from '@/components/theme-provider';

function App() {
  return (
    <div className="h-screen w-full">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Home />
      </ThemeProvider>
    </div>
  );
}

export default App;
