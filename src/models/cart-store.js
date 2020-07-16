import { types as t, getEnv, flow } from 'mobx-state-tree';
import { CartProduct } from './product';

const CartItem = t.model({
  product: CartProduct,
  quantity: t.number
});

const Cart = t.model({
  taxRate: t.maybeNull(t.number),
  items: t.maybeNull(t.array(CartItem)),
  postalCode: t.maybeNull(t.string),
  state: t.maybeNull(t.string),
  country: t.maybeNull(t.string),
  discounts: t.maybeNull(t.array(t.model({}))),
  createdOn: t.maybeNull(t.string),
  updatedOn: t.maybeNull(t.string),
  revision: t.maybeNull(t.number),
  id: t.maybeNull(t.identifier),
  totalItems: t.maybeNull(t.number),
  total: t.maybeNull(t.number),
  taxAmount: t.maybeNull(t.number),
  grandTotal: t.maybeNull(t.number),
  discountAmount: t.maybeNull(t.number),
  messages: t.maybeNull(t.array(t.model({
    message: t.string,
    productId: t.string,
  }))),
  totalWithoutReductions: t.maybeNull(t.number),
  availableShippingMethods: t.maybeNull(t.array(t.model({})), [])
}).actions((self) => {
  return {
    afterCreate() {
      self.totalWithoutReductions = 0;
      self.totalItems = 0;
      self.total = 0;
      self.availableShippingMethods = [];
    }
  }
});

export const CartStore = t.model({
  cart: t.maybeNull(Cart)
}).actions((self) => {
  const { apiClient } = getEnv(self);

  const createCart = () => apiClient.post('/carts');

  const addItemToCart = flow(function* (product, quantity = 1) {
    const productToAdd = product.toJSON();
    if (!self.cart) {
      const { data } = yield createCart();
      self.cart = Cart.create(data);
    }
    self.cart.items.push({
      product: {
        id: productToAdd.id,
        name: productToAdd.name,
        productVariantId: productToAdd.productVariants.id,
        images: productToAdd.images,
        state: productToAdd.state,
        price:  productToAdd.price,
        seoFriendlyName: productToAdd.seo.friendlyName,
        sku: productToAdd.sku,
      },
      quantity
    });
    self.cart.totalItems = (self.cart.totalItems ?? 0) + 1;
    const response = yield apiClient.put(`/carts/${self.cart.id}`, self.cart);
    self.cart = response.data;
    return self.cart;
  });

  return {    
    addItemToCart
  };
});
