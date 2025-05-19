const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async function(event, context) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://deine-site.netlify.app/success ",
    cancel_url: "https://deine-site.netlify.app/cancel ",
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ url: session.url }),
  };
};