import { Link } from 'react-router-dom';
import type { TShopCart } from '@mf-basic-store/types';

type TAppHeaderProps = {
  shopCart: TShopCart;
};

function AppHeader(props: TAppHeaderProps) {
  return (
    <header>
      <div className="max-w-7xl mx-auto px-8 py-6 mt-4 border rounded shadow-sm text-zinc-600">
        <div className="flex min-w-0 justify-between">
          <Link to="/">
            <h1 className="text-2xl leading-7 sm:text-3xl sm:truncate">
              Basic Store
            </h1>
          </Link>
          <Link to="/shop-cart">
            <span className="text-xl leading-7 sm:text-3xl sm:truncate">
              Cart ({props.shopCart.totalItems})
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
