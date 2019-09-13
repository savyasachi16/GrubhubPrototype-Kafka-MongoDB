//import resolve from "url";

const calculate = (expr) => {
    return new Promise((resolve, reject) => {
        try {
            resolve(eval(expr));
        } catch (err) {
            reject(err);
        }
    })
}

module.exports = {
    calculate
}