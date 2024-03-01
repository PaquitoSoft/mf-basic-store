import {
  Button,
  ProductCard,
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from '@mf-basic-store/shared-ui';
import type { TShopCartItem } from '@mf-basic-store/types';
import { SelectItem } from '@radix-ui/react-select';

type Props = {
  item: TShopCartItem;
  onQuantityChange: (itemId: number, quantity: number) => void;
  onRemove: (itemId: number) => void;
};

function ShopCartItem({ item, onQuantityChange, onRemove }: Props) {
  return (
    <ProductCard product={item.product}>
      <div className="flex flex-row items-center py-4">
        <p className="mr-2 text-lg font-medium text-gray-900">
          {item.amount} EUR
        </p>
        <p className="text-xs">
          (<span>{item.quantity}</span> x{' '}
          <span className="text-sm">{item.product.price.toFixed(2)}</span>)
        </p>
      </div>
      <div className="flex justify-between w-full">
        <Select
          value={`${item.quantity}`}
          onValueChange={(newValue) => {
            onQuantityChange(item.id, parseInt(newValue));
          }}
        >
          <SelectTrigger className="w-[80px]">
            <SelectValue>{item.quantity}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Array(5)
                .fill('')
                .map((_, index) => (
                  <SelectItem value={`${index + 1}`}>{index + 1}</SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button variant="destructive" onClick={() => onRemove(item.id)}>
          Remove
        </Button>
      </div>
    </ProductCard>
  );
}

export default ShopCartItem;
