const orderModel = (sequelize, type) => {
    return sequelize.define('order', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: type.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        restaurant_id: {
            type: type.INTEGER,
            references: {
                model: 'restaurants',
                key: 'id'
            }
        },
        amount: type.INTEGER,
        status: type.STRING
    }, {
        underscored: true
    });
};

export default orderModel;