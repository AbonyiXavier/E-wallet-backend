import model from '../models';
const { initializePayment, verifyPayment } = require('../helper/paystack');

export default {
  fundWallet: async (req, res) => {
    try {
      console.log('user', req.user.user.email);
      const { amount } = req.body;
      if (parseFloat(amount) < 50) {
        console.log('fund your wallet with at least ₦50.');
      }
      const paystack_data = {
        amount: parseFloat(amount) * 100,
        email: req.user.user.email,
      };

      let response = await initializePayment(paystack_data);

      const transation_payload = {
        UserId: req.user.user.id,
        amount: parseFloat(amount),
        reference: response.data.reference,
        status: 'pending',
      };

      await model.Transactions.create(transation_payload);
      if (response) {
        return res.json({
          message: response.data.authorization_url,
        });
      }
      console.log(response.data.authorization_url);
    } catch (error) {
      console.log(error);
    }
  },

  getVerifyWallet: async (req, res) => {
    const { trxref } = req.query;

    if (!trxref) {
      console.log('No transaction reference found');
    }

    try {
      const payment_status = await verifyPayment(trxref);

      let { status, reference, amount, customer } = payment_status.data.data;
      const { email } = customer;

      const user = await model.Users.findOne({ where: { email } });

      const { id: userId } = user.dataValues;

      const accountDetails = await model.Accounts.findOne({
        where: { userId },
      });
      const { balance } = accountDetails.dataValues;
      const amt = amount / 100;
      const newBalance = parseFloat(balance) + amt;

      await model.Transactions.create({
        UserId: userId,
        status,
        reference,
        amount: amt,
      });
      await model.Accounts.update(
        {
          balance: newBalance,
        },
        {
          where: {
            userId,
          },
        }
      );
      return res.json({
        message: 'Account funded successfully',
      });
    } catch (error) {
      console.log('error', error);
    }
  },
};
