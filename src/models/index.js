import { useContext, createContext } from "react";
import { types as t } from 'mobx-state-tree';
import { ProductStore } from './product-store';
import { CartStore } from './cart-store';

const RootStore = t.model({
  productStore: t.compose(ProductStore),
  cartStore: t.compose(CartStore)
}).actions((self) => {
  return {
    afterCreate: (...args) => {
      console.log('args', args);
      self.productStore.getProducts();
    }
  }
});

export const createRootStore = (apiClient) => {
  return RootStore.create({
    productStore: {},
    cartStore: {}
  }, {
    apiClient
  })
}

const RootStoreContext = createContext(null);

export const Provider = RootStoreContext.Provider;
export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}
