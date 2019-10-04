const dishModel = (sequelize, type) => {
    return sequelize.define('dish', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        price: type.FLOAT,
        description: type.STRING,
        image: type.STRING,
        section: type.STRING
    }, {
        userscored: true
    })
}

const dishRestaurantModel = (sequelize, type) => {
    return sequelize.define('restaurant_dish', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        dish_id: {
            type: type.INTEGER,
            references: {
                model: 'dishes',
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
        quantity: type.INTEGER
    }, {
        underscored: true
    });
}

const dishOrderModel = (sequelize, type) => {
    return sequelize.define('order_dish', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        dish_id: {
            type: type.INTEGER,
            references: {
                model: 'items',
                key: 'id'
            }
        },
        order_id: {
            type: type.INTEGER,
            references: {
                model: 'orders',
                key: 'id'
            }
        },
        quantity: type.INTEGER
    }, {
        underscored: true
    })
}

export {
    dishModel,
    dishRestaurantModel,
    dishOrderModel
};