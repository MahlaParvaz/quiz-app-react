import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ShowResult from './ui/ShowResult';
import { QuizAppProvider } from './context/QuizAppProvider';
function App() {
  return (
    <div className="app-container">
      <QuizAppProvider>
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/result" element={<ShowResult />} />
        </Routes>
      </QuizAppProvider>
    </div>
  );
}

export default App;
