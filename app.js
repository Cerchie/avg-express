const express = require('express');

const app = express();

//Tell Express to parse request bodies for either form data or JSON:
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//method from stackoverflow
app.get('/mean/:fnums', function (req, res) {
    console.log(req.params.fnums)
    const sum = req.params['fnums'].reduce((acc, cur) => acc + cur);
    const average = sum / req.params['fnums'].length;
    return res.json(`{
        fnums: Avg ${average}
    }`) //not sure why it would be json
});
// from https://www.w3resource.com/javascript-exercises/fundamental/javascript-fundamental-exercise-88.php
app.get('/median/:fnums', function (req, res) {

    arr = req.params['fnums']
    const median = arr => {
        const mid = Math.floor(arr.length / 2),
            nums = [...arr.sort((a, b) => a - b)];
        arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    };
    return res.json(`{        
        ${req.params['fnums']} : ${median}
    }`);
});
//from https://stackoverflow.com/questions/52898456/simplest-way-of-finding-mode-in-javascript
app.get('/mode/:fnums', function (req, res) {
    let a = req.params['fnums'];
    const mode = a =>
        Object.values(
            a.reduce((count, e) => {
                if (!(e in count)) {
                    count[e] = [0, e];
                }
                count[e][0]++;
                return count;
            }, {})
        ).reduce((a, v) => v[0] < a[0] ? a : v, [0, null])[1];
    return res.json(`{
        ${req.params['fnums']} : ${mode}
    }`)
});

app.listen(3000, function () {
    console.log('App on port 3000');
})