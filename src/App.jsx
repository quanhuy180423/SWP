import { useState } from 'react';

import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Sidebar from './components/Sildebar';// Import RequestOrder
import Blogs from './blog/Blog';
import Product from './components/Products';
import Material from './components/Material';
import Category from './components/Category'
import Diamond from './diamond/Diamond';
import Account from './components/Account';
// import OrderForm from './order/pages/OrderForm';
import RequestOrder from './orders/RequestOrder';
import Order from './orders/Order';
import { OrderProvider } from './orders/OrderContext';

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
      case 'RequestOrder':
        return <RequestOrder />;
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
      default:
        return <Dashboard />;
    }
  };

  return (
    <OrderProvider>
      <div className="flex h-screen">
        <Sidebar onChangeContent={handleChangeContent} />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <div className="flex-1 p-6 overflow-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </OrderProvider>
  );
};

export default App;
