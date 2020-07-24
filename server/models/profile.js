module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profiles', {
    image: {
      type: DataTypes.STRING,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Profile.associate = (models) => {
    Profile.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Profile;
};
