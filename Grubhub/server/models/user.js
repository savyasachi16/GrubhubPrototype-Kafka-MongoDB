const userModel = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: type.STRING,
        last_name: type.STRING,
        email: {
            type: type.STRING,
            allowNull: false
        },
        password: {
            type: type.STRING,
            allowNull: false
        },
        account_type: type.STRING,
        phone: type.STRING,
        address: type.STRING,
        image: type.STRING
    });
};

export default userModel;