import React, { Fragment } from 'react';
import { observer } from 'mobx-react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useMst } from '../models';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const CartSection = () => {
  const { cartStore } = useMst();
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {(cartStore.cart?.items ||[]).map((cartItem) => (
        <Fragment key={cartItem.product.id}>
          <ListItem key={cartItem.product.id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={cartItem.product.name} src={cartItem.product.displayImageUrl} />
            </ListItemAvatar>
            <ListItemText
              primary={cartItem.product.name}
              secondary={cartItem.quantity}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </Fragment>
      ))}
    </List>
  )
};

export default observer(CartSection);
