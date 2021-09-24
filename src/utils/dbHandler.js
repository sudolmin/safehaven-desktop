const { docClient } = require('./secret');

async function getData(data, mode="") {
    docClient.get({
        TableName: "safeheavendb",
        Key: data,
    })
    .promise()
    .then((data) => {
        if (mode==="checkSetKey") {
            localStorage.setItem("isKeySet", data.Item!==undefined);
        }
        })
    .catch(console.error);
}

async function putdata(putdata, tablename="safeheavendb") {
    console.log(putdata);
    docClient
        .put({
            Item: putdata,
            TableName: tablename,
        })
        .promise()
        .then((data) => {
            console.log(data);
            return data.Attributes})
        .catch((err)=>{
            console.error(err);
            return err;
        });
}

export {
    putdata,
    getData
}