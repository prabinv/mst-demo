import { types as t } from 'mobx-state-tree';

export const Image = t.model({
  imageLink: t.model({
    createdOn: t.string,
    updatedOn: t.string,
    revision: t.number,
    tags: t.array(t.string),
    tenant: t.string,
    height: t.null,
    width: t.null,
    id: t.string,
    fullUri: t.string,
    uriBase: t.string,
    imagePath: t.string
  }),
  title: t.string,
  description: t.string,
  altText: t.string,
  position: t.number
});
