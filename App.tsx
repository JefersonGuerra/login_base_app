import React from 'react';
import { AuthProvider } from "./src/Context/Auth";
import Routes from './src/Routes/Routes';

function App(): JSX.Element {

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
