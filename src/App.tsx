import { Route, Routes } from 'react-router-dom';

import { AppLayout } from './AppLauout';
import NotFoundPage from './Pages/notFoundPage/NotFoundPage';
import { Home } from './Pages/mainPage/TaskPage';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
