// index.js
const axios = require('axios');
const fs = require('fs');

const downloadImage = async (url, destination) => {
  try {
    const response = await axios({
      method: 'get',
      url,
      responseType: 'stream',
    });

    response.data.pipe(fs.createWriteStream(destination));

    return new Promise((resolve, reject) => {
      response.data.on('end', () => resolve());
      response.data.on('error', (err) => reject(err));
    });
  } catch (error) {
    throw new Error(`Error downloading image: ${error.message}`);
  }
};

module.exports = downloadImage;
