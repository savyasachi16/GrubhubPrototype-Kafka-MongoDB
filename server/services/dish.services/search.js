import Restaurants from "../../models/restaurant";
import Dishes from "../../models/dish"
import _ from "lodash";
import Promise from "bluebird"

const handle_request = (search_key, callback) => {
    return Dishes.aggregate([{
        $match: {
            name: {
                $regex: search_key,
                $options: 'i'
            }
        }
    }]).then(searchDishes => {
        return Promise.map(searchDishes, dish => {
            return Restaurants.findOne({
                dishes: dish._id
            })
        }).then(restaurants => {
            let results = _.chain(restaurants).compact().uniqBy('_id').value()
            callback(null, {
                search_results: results
            });
        })
    })

}
export {
    handle_request
}