import React from 'react';
import { observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import { useMst } from '../models';
import ProductCard from './ProductCard';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const ProductsSection = () => {
  const classes = useStyles();
  const { productStore } = useMst();
  return (
    <div className={classes.root}>
      <Grid container xs={12} spacing={3}>
        {(productStore?.products || []).map((product) => (
          <Grid item xs key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
);
}

export default observer(ProductsSection);
