const fs = require('fs/promises')

async function readData(path){
    const resp = await fs.readFile(path, "utf-8");
    return JSON.parse(resp);
}

module.exports = {readData}