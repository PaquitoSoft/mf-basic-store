import { BrowserRouter } from 'react-router-dom';
import { AppHeader, type TShopCart } from '@mf-basic-store/shared-ui';

const dummyShopCart: TShopCart = {
  id: 0,
  items: [],
  totalItems: 0,
  totalAmount: 0,
};

function App() {
  return (
    <BrowserRouter>
      <AppHeader shopCart={dummyShopCart} />

      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-2xl">Here will be the content</h1>
      </div>
    </BrowserRouter>
  );
}

export default App;
