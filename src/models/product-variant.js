import { types as t } from 'mobx-state-tree';

export const ProductVariant = t.model({
  id: t.identifier,
  sku: t.string,
  variants: t.array(t.model({})),
  isInventoryTracked: t.boolean,
  quantity: t.number,
  imageLinkIds: t.array(t.string),
  skuImageLinkIds: t.array(t.string),
  price: t.number
});
