import { AuthProvider } from 'react-auth-kit';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';

import { useTheme } from './store';
import { useCreateRouter } from './hooks';

function App() {
  const router = useCreateRouter();
  const { isDarkMode } = useTheme();
  const { defaultAlgorithm, darkAlgorithm } = theme;

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <AuthProvider authType={'localstorage'} authName={'_auth'}>
        <RouterProvider router={router} />
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
