import connection from '../kafka/connection'
import mongoose from 'mongoose'
//topics files
const Register = require('../services/user.services/register')
const Login = require('../services/user.services/login')
const GetUser = require('../services/user.services/get')
const UpdateUser = require('../services/user.services/update')

const GetRestaurant = require('../services/restaurant.services/get')
const GetMenu = require('../services/restaurant.services/getMenu')
const GetRestaurantDetails = require('../services/restaurant.services/getDetails')
const UpdateSection = require('../services/restaurant.services/updateSection')
const DeleteSection = require('../services/restaurant.services/deleteSection')

const AddDish = require('../services/dish.services/add')
const DeleteDish = require('../services/dish.services/delete')
const GetDishDetails = require('../services/dish.services/getDetails')
const UpdateDish = require('../services/dish.services/update')
const Search = require('../services/dish.services/search')

const GetOrdersByRestaurant = require('../services/order.services/getOrdersByRestaurant')
const UpdateOrder = require('../services/order.services/updateOrder')
const GetOrderDetails = require('../services/order.services/getOrderDetails')
const GetOrdersByBuyer = require('../services/order.services/getOrdersByBuyer')
const ConfirmOrder = require('../services/order.services/createOrder')
const PushMessage = require('../services/order.services/updateMessages')

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