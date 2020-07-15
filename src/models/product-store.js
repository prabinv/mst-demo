import { types as t, flow, getEnv } from 'mobx-state-tree';
import { Product } from './product';

export const ProductStore = t.model({
  products: t.maybeNull(t.array(Product), []),
}).actions(self => {
  const { apiClient } = getEnv(self);
  const getProducts = flow(function* () {
    const response = yield apiClient.get('/store/products');
    console.log('getProducts:flow -> response', response.data.items);
    self.products = response.data.items.map(item => Product.create(item));
  });

  return {
    getProducts
  }
});
