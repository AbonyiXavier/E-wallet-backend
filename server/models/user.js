module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    wallet_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Transactions, {
      onDelete: 'cascade',
    });
    User.hasOne(models.Accounts, {
      onDelete: 'cascade',
    });
    User.hasOne(models.Profiles, {
      onDelete: 'cascade',
    });
  };

  return User;
};
