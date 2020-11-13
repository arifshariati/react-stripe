import React from "react";
import Axios from "axios";
import "./ProductCard.css";
import StripeCheckout from "react-stripe-checkout";

//firebase
import db from "../../firebase";

//mui
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  CardActions,
  Typography,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: "0.5rem",
  },
  cardTop: {
    minHeight: "90%",
  },
  cardImage: {
    padding: "1rem",
  },
  button: {
    borderRadius: "30px",
  },
});

function ProductCard({ product }) {
  const classes = useStyles();

  const processPayment = async (token) => {
    return await Axios.post("http://localhost:4000/payment", {
      token,
      product,
    })
      .then((response) => {
        console.log(response);
        let purchaseData = {
          transaction: response.data.balance_transaction,
          amount: response.data.amount / 100,
          currency: response.data.currency,
          method: response.data.payment_method_details.type,
          name: response.data.billing_details.name,
          email: response.data.receipt_email,
          description: response.data.description,
          country: response.data.billing_details.address.country,
          city: response.data.billing_details.address.city,
          address: response.data.billing_details.address.line1,
        };
        db.collection("purchase")
          .add(purchaseData)
          .then((res) => {
            return db.doc(`purchase/${res.id}`).update({ id: res.id });
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => console.log(error));
  };

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.cardTop}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          width="100%"
          image={product.image}
          title="Contemplative Reptile"
          className={classes.cardImage}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {product.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {product.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        style={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <Button
          variant="contained"
          color="secondary"
          style={{ borderRadius: "30px" }}
        >
          {product.price + " USD"}
        </Button>
        <StripeCheckout
          stripeKey={process.env.REACT_APP_PUBLISHABLE_KEY}
          token={processPayment}
          name={product.name}
          description={product.description}
          image={product.image}
          shippingAddress
          billingAddress={false}
        >
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            BUY
          </Button>
        </StripeCheckout>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
