module.exports = (sequelize, DataTypes) => {
  const Gift = sequelize.define('Gifts', {
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Gift.associate = (models) => {
    Gift.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false,
      },
    });
    Gift.belongsTo(models.Accounts, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Gift;
};
