import model from '../models';
const { initializePayment, verifyPayment } = require('../helper/paystack');

export default {
  fundWallet: async (req, res) => {
    try {
      console.log('user', req.user.user.email);
      const { amount } = req.body;
      if (parseInt(amount) < 50) {
        console.log('fund your wallet with at least ₦50.');
      }
      const paystack_data = {
        amount: parseInt(amount) * 100,
        email: req.user.user.email,
      };

      let response = await initializePayment(paystack_data);

      const transation_payload = {
        UserId: req.user.user.id,
        amount: parseInt(amount),
        reference: response.data.reference,
      };

      await model.Transactions.create(transation_payload);
      if (response) console.log(response.data.authorization_url);
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
      const { balance, id: accountId } = accountDetails.dataValues;
      const newBalance = parseFloat(balance) + amount;

      await Promise.all([
        model.Transactions.update(
          {
            status,
            reference,
            amount,
          },
          {
            where: { userId },
          }
        ),
        model.Accounts.update(
          {
            balance: newBalance,
          },
          {
            where: {
              userId,
            },
          }
        ),
      ]);
    } catch (error) {
      console.log('error', error);
    }
  },
};
