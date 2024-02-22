import { ProductCard, type TProduct } from '@mf-basic-store/shared-ui';

type Props = {
  product: TProduct;
  onAddToCart: (product: TProduct) => void;
};

function ProductListingItem({ product, onAddToCart }: Props) {
  return (
    <ProductCard product={product}>
      <p className="mt-1 text-lg font-medium text-gray-900">
        {product.price} EUR
      </p>
      <button
        className="mt-4 px-4 py-2 w-full border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-500 hover:bg-slate-600 focus:outline-none"
        onClick={() => onAddToCart(product)}
      >
        Add to cart
      </button>
    </ProductCard>
  );
}

export default ProductListingItem;
