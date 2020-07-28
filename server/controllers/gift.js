import model from '../models';

export default {
  transferFund: async (req, res) => {
    console.log('user', req.user);
    console.log('user', req.user.user.id);
    try {
      const receiver = await model.Users.findOne({
        where: {
          id: req.user.user.id,
        },
      });
      if (!receiver) {
        console.log('No user found with such account');
      }
      // Get user balance

      //   const me = await model.Transactions.findOne({
      //     where: { userId: req.user.user.id },
      //   });
      //   console.log('me', me);
      const accountDetails = await model.Accounts.findOne({
        where: { userId: req.user.user.id },
      });
      console.log('mike', accountDetails);
      const { balance } = accountDetails.dataValues;

      const amount = parseFloat(balance) >= amount;
      // check if sender has amount he wants to send
      // const checkAmount =
      const wallet = await model.Gifts.create({
        senderId: req.user.user.id,
        receiverId: req.user.user.id,
        description: req.body.description,
        amount: amount,
      });
      console.log('wallet', wallet);
    } catch (error) {
      console.log('error', error);
    }
  },
};
