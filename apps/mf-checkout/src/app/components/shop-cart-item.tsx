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
      <div className="flex justify-between">
        <Select defaultValue={`${item.quantity}`}>
          <SelectTrigger className="w-[80px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Array(5)
                .fill('')
                .map((_, index) => (
                  <SelectItem
                    key={`${item.id}-${index}`}
                    value={`${(index + 1) * 1000}`}
                  >
                    {index + 1}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* <select
          name="quantity"
          className="select select-bordered select-sm"
          defaultValue={item.quantity}
          onChange={(event) =>
            onQuantityChange(item.id, parseInt(event.target.value))
          }
        >
          {Array(5)
            .fill('')
            .map((_, index) => (
              <option key={`${item.id}-${index}`} value={index + 1}>
                {index + 1}
              </option>
            ))}
        </select> */}
        <Button variant="destructive" onClick={() => onRemove(item.id)}>
          Remove
        </Button>
      </div>
    </ProductCard>
  );
}

export default ShopCartItem;
