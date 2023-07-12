import React from 'react';
import Layout from  "./components/layout";
import Navbar from "./components/navbar"
import MainPage from "./components/main"
import Sidebar from "./components/sidebar"

const App = () => {
  return (
    <Layout
      navbar={<Navbar />}
      sidebar={<Sidebar />}
      main={<MainPage />}
    />
  );
};

export default App;