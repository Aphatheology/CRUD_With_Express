// write your code here

const express = require('express');
const { data } = require('./data');

const app = express();
const PORT = 3000;

app.use(express.json());

// fetch all data 
app.get('/', (req, res) => {
    res.send(data);
})


// fetch specific data with its ID
app.get('/:id', (req, res) => {
    const dataId = req.params.id;
    // Check if the data with id exists
    const specificData = data.find(eachData => eachData.id === parseInt(dataId))

    // If data with id does not exists
    if(!specificData) return res.status(404).send("No item with id " + dataId)

    // If data with id exists
    res.send(specificData)
})


// Add new data
app.post('/', (req, res) => {
    // Get new data
    let newDataBody = req.body;

    // If no data was passed in the body
    if(Object.keys(newDataBody).length === 0 || !newDataBody) return res.status(404).send("No item was added to the request body");

    // Set id of new data and add the body of the data
    let newData = {
        id: data[data.length - 1].id + 1,
        ...newDataBody
    }

    // push new data to the array
    data.push(newData);

    // return the new data added
    res.send(newData);
})

// update data with id
app.put('/:id', (req, res) => {
    let dataId = req.params.id;

    // Get the index of the data with the given id
    const dataIndex = data.findIndex(eachData => eachData.id == dataId)

    // If data with id does not exists
    if(dataIndex == -1) return res.status(404).send("item with id " + req.params.id + " does not exist");

    // Get new data
    let newDataBody = req.body;

    // If no data was passed
    if(Object.keys(newDataBody).length === 0 || !newDataBody) return res.status(404).send("No item was added to the request body");

    data[dataIndex].status = newDataBody.status;
    res.send(data)
})


// delete data with id
app.delete('/:id', (req, res) => {
    let dataId = req.params.id;

    // Get the index of the data with the given id
    const dataIndex = data.findIndex(eachData => eachData.id == dataId)

    // If data with id does not exists
    if(dataIndex == -1) return res.status(404).send("item with id " + req.params.id + " does not exist");

    // Remove data with id
    data.splice(dataIndex, 1);

    res.send("item with id " + req.params.id + " deleted successfully");
});


// start express server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});