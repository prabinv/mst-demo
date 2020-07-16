import { types as t } from 'mobx-state-tree';
import { ProductVariant } from './product-variant';
import { Image } from './image';

export const Product = t.model({
  name: t.string,
  tenant: t.string,
  price: t.number,
  createdOn: t.string,
  updatedOn: t.string,
  revision: t.number,
  fulfillmentData: t.model({}),
  variantOptions: t.array(t.model({})),
  productVariants: t.array(ProductVariant),
  availability: t.model({
    preOrder: t.model({
      enabled: t.boolean
    })
  }),
  images: t.array(Image),
  descriptions: t.model({
    short: t.maybeNull(t.string),
    long: t.maybeNull(t.string),
    extended: t.maybeNull(t.string),
  }),
  categoryIds: t.array(t.string),
  relatedProductIds: t.array(t.string),
  seo: t.model({
    title: t.string,
    metaDescription: t.string,
    friendlyName: t.string
  }),
  state: t.string,
  isTaxable: t.boolean,
  requiresShipping: t.boolean,
  weight: t.number,
  id: t.identifier,
  msrp: t.number,
  pricing: t.model({
    listPrice: t.maybeNull(t.number),
    salePrice: t.maybeNull(t.number)
  }),
  sku: t.string
}).views((self) => ({
  get displayImageUrl() {
    if (!self.images?.[0]?.imageLink) {
      return null;
    }
    const transform = 'w_250,h_250,c_fit,f_auto,q_auto/'
    return `${self.images[0].imageLink.uriBase}${transform}${self.images[0].imageLink.imagePath}`;
  }
}));

export const CartProduct = t.model({
  id: t.identifier,
  imageMetadata: t.frozen(),
  msrp: t.maybeNull(t.number),
  name: t.maybeNull(t.string),
  price: t.maybeNull(t.number),
  sku: t.maybeNull(t.string),
  productVariantId: t.maybeNull(t.string),
  productVariants: t.maybeNull(t.array(ProductVariant)),
  seoFriendlyName: t.maybeNull(t.string),
  state: t.maybeNull(t.string),
  usuallyShipsInDays: t.maybeNull(t.number),
  weight: t.maybeNull(t.number),
  images: t.maybeNull(t.array(Image)),
  requiresShipping: t.maybeNull(t.boolean),
  isTaxable: t.maybeNull(t.boolean),
});
