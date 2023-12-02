const Joy = require("joi");

const createOrderSchema = Joy.object()
  .keys({
    userId: Joy.string().required(),
    orderItems: Joy.array()
      .items(
        Joy.object()
          .keys({
            product_variant_id: Joy.string().required(),
            quantity: Joy.number().required(),
            price: Joy.number().required(),
          })
          .unknown()
      )
      .required(),
    address: Joy.object()
      .keys({
        house_no: Joy.string().required(),
        street_name: Joy.string().required(),
        location: Joy.string().required(),
        pin_code: Joy.string().required(),
        state: Joy.string().required(),
        city: Joy.string().required(),
        country: Joy.string().required(),
      })
      .unknown()
      .required(),
  })
  .unknown();

const paymentSchema = Joy.object()
.keys({
  orderId: Joy.string().required(),
  razorpayPaymentId: Joy.string().required()
})
.unknown();

module.exports = {
  createOrderSchema,
  paymentSchema
};
