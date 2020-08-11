import model from '../models';

export default {
  transferFund: async (req, res) => {
    try {
      const { accountId } = req.params;
      const { id: userId } = req.user.user;
      const user = await model.Users.findOne({
        where: {
          id: req.user.user.id,
        },
      });
      if (!user) {
        console.log('No user found');
      }
      // Get user balance
      const accountDetails = await model.Accounts.findOne({
        where: { userId: req.user.user.id },
      });
      console.log('mike', accountDetails);
      const { balance } = accountDetails.dataValues;

      const amt = parseFloat(balance);
      console.log('amount', amt);
      const { amount, description } = req.body;
      if (amt < amount) {
        return res.status(403).json({
          messege: 'ooppss! Oga your balance is low',
        });
      }

      const newBalance = amt - parseFloat(amount);
      console.log('amt', amt);
      console.log('amount', amount);
      console.log('newBalanc', newBalance);
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
      console.log('name', azeez);

      const reciever = await model.Users.findOne({
        where: {
          id: accountId,
        },
      });

      console.log('reciever', reciever);

      const account = await model.Accounts.findOne({
        where: { userId: accountId },
      });
      console.log('you', account);
      const { balance: bal } = account.dataValues;

      const money = parseFloat(bal);
      console.log('amount', money);

      const newBal = money + parseFloat(amount);
      console.log('amt', money);
      console.log('amount', amount);
      console.log('newBal', newBal);
      await model.Accounts.update(
        {
          balance: newBal,
        },
        {
          where: {
            userId: accountId,
          },
        }
      );
      const data = {
        UserId: userId,
        AccountId: +accountId,
        amount: +amount,
        description,
      };
      console.log('data', data);
      await model.Gifts.create(data);
    } catch (error) {
      console.log('error', error);
    }
  },
};
