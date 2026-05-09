import connection from '../kafka/connection.js'
import mongoose from 'mongoose'
//topics files
import Register from '../services/user.services/register.js';
import Login from '../services/user.services/login.js';
import GetUser from '../services/user.services/get.js';
import UpdateUser from '../services/user.services/update.js';

import GetRestaurant from '../services/restaurant.services/get.js';
import GetMenu from '../services/restaurant.services/getMenu.js';
import GetRestaurantDetails from '../services/restaurant.services/getDetails.js';
import UpdateSection from '../services/restaurant.services/updateSection.js';
import DeleteSection from '../services/restaurant.services/deleteSection.js';

import AddDish from '../services/dish.services/add.js';
import DeleteDish from '../services/dish.services/delete.js';
import GetDishDetails from '../services/dish.services/getDetails.js';
import UpdateDish from '../services/dish.services/update.js';
import Search from '../services/dish.services/search.js';

import GetOrdersByRestaurant from '../services/order.services/getOrdersByRestaurant.js';
import UpdateOrder from '../services/order.services/updateOrder.js';
import GetOrderDetails from '../services/order.services/getOrderDetails.js';
import GetOrdersByBuyer from '../services/order.services/getOrdersByBuyer.js';
import ConfirmOrder from '../services/order.services/createOrder.js';
import PushMessage from '../services/order.services/updateMessages.js';

//MongoDB Connection
mongoose.connect('mongodb+srv://root:root1234@grubhubcluster-7frcc.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 2
}, (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB")
});

function handleTopicRequest(topic_name, fname) {
    var consumer = connection.getConsumer(topic_name);

    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name + " ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        fname.handle_request(data.data, (err, res) => {
            console.log('after handle' + res);
            var payloads = [{
                topic: data.replyTo,
                messages: JSON.stringify({
                    correlationId: data.correlationId,
                    data: res
                }),
                partition: 0
            }];
            producer.send(payloads, (err, data) => {
                console.log(data);
            });
            return;
        });

    });
}

// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request

//User Topics
handleTopicRequest('registerUser', Register)
handleTopicRequest('loginUser', Login)
handleTopicRequest('getUser', GetUser)
handleTopicRequest('updateUser', UpdateUser)

//Restaurant Topics
handleTopicRequest('getRestaurant', GetRestaurant)
handleTopicRequest('getMenu', GetMenu)
handleTopicRequest('getRestaurantDetails', GetRestaurantDetails)
handleTopicRequest('updateSection', UpdateSection)
handleTopicRequest('deleteSection', DeleteSection)

//Dish Topics
handleTopicRequest('addDish', AddDish)
handleTopicRequest('getDishDetails', GetDishDetails)
handleTopicRequest('updateDish', UpdateDish)
handleTopicRequest('deleteDish', DeleteDish)
handleTopicRequest('search', Search)

//Order Topics
handleTopicRequest('getOrdersByRestaurant', GetOrdersByRestaurant)
handleTopicRequest('updateOrder', UpdateOrder)
handleTopicRequest('getOrderDetails', GetOrderDetails)
handleTopicRequest('getOrdersByBuyer', GetOrdersByBuyer)
handleTopicRequest('confirmOrder', ConfirmOrder)
handleTopicRequest('pushMessage', PushMessage)