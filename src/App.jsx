import { useState } from 'react';

import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
// import Chat from './components/Chat';
// import Order from './components/Order';
// import Product from './components/Product';
// import Diamond from './components/Diamond';
// import Material from './components/Material';
// import Category from './components/Category';
// import Account from './components/Account';

import Sidebar from './components/Sildebar';
import RequestOrder from './orders/RequestOrder';  // Import RequestOrder
import Blogs from './blog/Blog';
import Product from './components/Products';
import Material from './components/Material';
import Category from './components/Category';

const App = () => {
  const [content, setContent] = useState('Dashboard');

  const handleChangeContent = (newContent) => {
    setContent(newContent);
  };

  const renderContent = () => {
    switch (content) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Blog':
        return <Blogs />;
      case 'Chat':
        return <Chat />;
      case 'Order':
        return <Order />;
      case 'Product':
        return <Product />;
      case 'Diamond':
        return <Diamond />;
      case 'Material':
        return <Material />;
      case 'Category':
        return <Category />;
      case 'Account':
        return <Account />;
      case 'RequestOrder':  // Add case for RequestOrder
        return <RequestOrder />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar onChangeContent={handleChangeContent} />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default App;
