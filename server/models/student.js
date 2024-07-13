module.exports = (sequelize, DataTypes) => {
  const Students = sequelize.define("Students", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Students;
};
