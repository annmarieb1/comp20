// Ann Marie Burke
// COMP 20
// Fall 2020
// node.js

const MongoClient = require('mongodb').MongoClient;
const dburl = "mongodb+srv://dbAnnMarie:DSZAbxa7c5P6BkB2@cluster0.4ofck.mongodb.net/?retryWrites=true&w=majority";
var http = require('http');
var url = require('url');

// Insert company and stock tickers into db
// Assume companies in companies-1.csv
function companiesInsert() 
{
    MongoClient.connect(dburl, { useUnifiedTopology: true }, function(err, db) {
        if (err) {
            return console.log(err);
        }
      
        var dbo = db.db("hw12");
        var collection = dbo.collection("companies");

        var readline = require('readline');
        var fs = require('fs');

        var myFile = readline.createInterface({
          input: fs.createReadStream("companies-1.csv")
        });

        myFile.on('line', function (line) {
            str = line;
            info = str.split(',');
            companyName = info[0];
            stockTickerCode = info[1];

            var newData = {
                "company" : companyName,
                "code"    : stockTickerCode,
            };

            if (newData["company"] == "Company" && newData["code"] == "Ticker") {
                console.log("Skipping first line");
            } else {
                collection.insertOne(newData, function(err, res) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("New company inserted");
                    }
                });
            }
            

            console.log(info);
        });
        
        console.log("Success!");
    });
}

// Search db for query
async function search_query(querytxt, qval) {
    try {
        await client.connect();

        var dbo = client.db("hw12");
        var collection = dbo.collection("companies");
        var query;
        var finalRes = "";

        if (qval == "company") {
            query = { company : querytxt }
        } else {
            query = { code : querytxt }
        }

        const result = collection.find(query);

        // print a message if no documents were found
        if ((await result.count()) === 0) {
            console.log("No matches found!");
        }
      
        await result.forEach(function(item) {
            finalRes += "Company: " + item.company + ", stock ticker name: " + item.code + " &nbsp;";
        });
    } catch(err) {
        console.log("Database error: " + err);
    } finally {
        client.close();
    }

    return finalRes;
}

async function doEverything(querytxt, qval, res) {
    await companiesInsert();

    db.close();

    client = new MongoClient(dburl, { useUnifiedTopology: true });

    var result = await search_query(querytxt, qval);

    res.write(result);

    res.end();
}


// Get query from index
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});

    var qobj = url.parse(req.url, true).query;
    var querytxt  = qobj.name;
    var qval = qobj.co_or_sto;

    doEverything(querytxt, qval, res);

}).listen(8080);



