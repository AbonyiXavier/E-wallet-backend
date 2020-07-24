module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Accounts', {
    balance: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  });

  Account.associate = (models) => {
    Account.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Account;
};
