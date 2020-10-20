const express = require('express');

const app = express();

//Tell Express to parse request bodies for either form data or JSON:
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.get('/mean/:fnums', function (req, res) {
    console.log(req.params['fnums'])
    const sum = req.params['fnums'].reduce((acc, cur) => acc + cur);
    const average = sum / req.params['fnums'].length;
    return res.json({
        fnums: `Avg ${average}`
    }) //not sure why it would be json
});

app.get('/median/:fnums', function (req, res) {
    for (num of req.params['fnums']) {

    }
    return res.json({
        fnums: req.params['fnums']
    })
});

app.get('/mode/:fnums', function (req, res) {
    for (num of req.params['fnums']) {

    }
    return res.json({
        fnums: req.params['fnums']
    })
});

app.listen(3000, function () {
    console.log('App on port 3000');
})