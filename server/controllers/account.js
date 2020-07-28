import express from 'express';
import model from '../models';

export default {
  addBalance: async (req, res) => {
    console.log('user', req.user);
    console.log('userId', req.user.user.id);
    try {
      const data = await model.Accounts.create({
        balance: parseFloat(req.body.balance),
        UserId: req.user.user.id,
      });
      console.log('data', data);
      // return res.send({
      //   data,
      //   message: 'The operation was successful',
      // });
    } catch (error) {
      console.log('error', error);
    }
  },

  getBalance: async (req, res) => {
    try {
      const data = await model.Accounts.findOne({
        where: {
          UserId: req.user.user.id,
        },
      });
      //   console.log('balance', data);
      console.log('xavier', data.dataValues.balance);
      return res.send({
        data,
        message: 'List of all Users',
      });
    } catch (error) {
      //   console.log(error);
    }
  },

  updateBalance: async (req, res) => {
    try {
      const data = await model.Accounts.findOne({
        where: {
          UserId: req.user.user.id,
        },
      });
      console.log('balance', data);
      const { balance } = req.body;
      const formatedBalance =
        parseInt(data.dataValues.balance) + parseInt(balance);
      const newBalance = formatedBalance.toFixed(2);
      console.log('object', newBalance);
      const acctData = await model.Accounts.update(
        {
          balance: newBalance,
        },
        {
          where: {
            UserId: req.user.user.id,
          },
        }
      );
      console.log('data', acctData);
      return res.send({
        data,
        message: 'The operation was successful',
      });
    } catch (error) {
      console.log('bright', error);
    }
  },
};
