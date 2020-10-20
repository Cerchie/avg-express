const express = require('express');

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
    }
    return result;
}
//method from stackoverflow
app.get('/mean/:fnums', function (req, res) {
    let arr = convertAndValidateNumsArray(req.params.fnums)
    console.log('consoleconsoleconsole')
    const sum = arr.reduce((acc, cur) => acc + cur);
    const average = (sum / arr.length);
    console.log(average)
    return res.json(`${average}`) //not sure why it would be json
});
// from https://www.w3resource.com/javascript-exercises/fundamental/javascript-fundamental-exercise-88.php
app.get('/median/:fnums', function (req, res) {
    let arr = convertAndValidateNumsArray(req.params.fnums)
    const mid = Math.floor(arr.length / 2),
        nums = [...arr.sort((a, b) => a - b)];
    const median = arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    return res.json(`${median}`);

});
//from https://stackoverflow.com/questions/52898456/simplest-way-of-finding-mode-in-javascript
app.get('/mode/:fnums', function (req, res) {
    let a = convertAndValidateNumsArray(req.params.fnums)
    let mode = Object.values(
        a.reduce((count, e) => {
            if (!(e in count)) {
                count[e] = [0, e];
            }
            count[e][0]++;
            return count;
        }, {})
    ).reduce((a, v) => v[0] < a[0] ? a : v, [0, null])[1];
    return res.json(`${mode}`)
});



app.listen(3000, function () {
    console.log('App on port 3000');
})