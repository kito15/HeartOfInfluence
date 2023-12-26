const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/', (req, res) => {
    const { firstname, lastname, email, selectedCampaign } = req.body;

    // Log the received data
    console.log('Received Data:');
    console.log('Firstname:', firstname);
    console.log('Lastname:', lastname);
    console.log('Email:', email);
    console.log('Selected Campaign:', selectedCampaign);

    // Forward the data to Zapier
    sendToZapier(req.body)
        .then(() => {
            res.status(200).send('Data received and forwarded to Zapier successfully.');
        })
        .catch((error) => {
            console.error('Error forwarding data to Zapier:', error);
            res.status(500).send('Internal Server Error.');
        });
});

function sendToZapier(data) {
    const zapierWebhookUrl = 'https://hooks.zapier.com/hooks/catch/15640277/3a0igbf/';

    return axios.post(zapierWebhookUrl, data);
}

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
