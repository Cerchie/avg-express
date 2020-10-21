const express = require('express');
const ExpressError = require("./error")
const app = express();

//Tell Express to parse request bodies for either form data or JSON:
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

function convertAndValidateNumsArray(numsAsStrings) {
    let result = [];

    for (let i = 0; i < numsAsStrings.length; i++) {
        let valToNumber = Number(numsAsStrings[i]);

        if (Number.isNaN(valToNumber)) {
            return new Error(
                `The value '${numsAsStrings[i]}' at index ${i} is not a valid number.`
            );
        }
        result.push(valToNumber);
        let strArr = result.split(',');
        let intArr = [];
        for (i = 0; i < strArr.length; i++)
            intArr.push(parseInt(strArr[i]));
    }
    return result;

}

function mean(arr) {
    const sum = arr.reduce((acc, cur) => acc + cur);
    const average = (sum / arr.length);
    return average
}
//method from stackoverflow
app.get('/mean', function mean(req, res, next) {
    if (!req.query.nums) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
    }
    console.log(req.query.nums)
    let arr = convertAndValidateNumsArray(req.query.nums);
    console.log(arr)
    let averager = mean(arr);

    return (`response: operation: "mean", value: ${averager}`)
});

function median(arr) {
    const mid = Math.floor(arr.length / 2),
        nums = [...arr.sort((a, b) => a - b)];
    const median = arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}
// from https://www.w3resource.com/javascript-exercises/fundamental/javascript-fundamental-exercise-88.php
app.get('/median', function median(req, res, next) {
    if (!req.query.nums) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
    }
    let arr = convertAndValidateNumsArray(req.query.nums)
    let medianr = median(arr)
    return (`response: operation: "median", value:${medianr}`);

});

function mode(a) {
    let mode = Object.values(
        a.reduce((count, e) => {
            if (!(e in count)) {
                count[e] = [0, e];
            }
            count[e][0]++;
            return count;
        }, {})
    ).reduce((a, v) => v[0] < a[0] ? a : v, [0, null])[1];
    return mode;
}
//from https://stackoverflow.com/questions/52898456/simplest-way-of-finding-mode-in-javascript
app.get('/mode', function mode(req, res, next) {
    if (!req.query.nums) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
    }
    let a = convertAndValidateNumsArray(req.query.nums)
    let moder = mode(a);
    return (`response: operation: "median", value:${moder}`)
});

app.use(function (req, res, next) {
    const notFoundError = new ExpressError("Not Found", 404);
    return next(notFoundError)
});

// generic error handler
app.use(function (err, req, res, next) {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.message;

    // set the status and alert the user
    return res.status(status).json({
        error: {
            message,
            status
        }
    });
});

module.exports.helpers = {
    mean,
    median,
    mode
}

app.listen(3000, function () {
    console.log('App on port 3000');
})