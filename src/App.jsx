import { Route, Routes } from 'react-router-dom';
import Converter from './pages/Converter';
import Template from './pages/Template';

const App = () => (
  <Routes>
    <Route path="/template" element={<Template />} />
    <Route path="*" element={<Converter />} />
  </Routes>
);

export default App;
