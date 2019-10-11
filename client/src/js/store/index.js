import {
    createStore,
    applyMiddleware,
    compose
} from "redux";
import rootReducer from "../reducers/index";
import thunk from "redux-thunk";
import axios from "axios";
import cookie from "js-cookie";
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';


axios.interceptors.request.use((config) => {
    const token = cookie.get('token');
    if (token) {
        config.headers.Authorization = `JWT ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
        return response
    },
    error => {
        return Promise.reject(error)
    })

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer = storage.reducer(rootReducer);
const engine = createEngine('current-session-key');
const middleware = storage.createMiddleware(engine);
const store = createStore(reducer, storeEnhancers(applyMiddleware(thunk, middleware)));
const load = storage.createLoader(engine);
load(store).then(newState =>
    console.log("Loaded state:", newState))
    .catch(() => console.log("Failed to load previous state"))
export default store;