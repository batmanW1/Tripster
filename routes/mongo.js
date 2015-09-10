var MongoClient = require('mongodb').MongoClient;
var Db = require('mongodb').Db,
Server = require('mongodb').Server,
ReplSetServers = require('mongodb').ReplSetServers,
ObjectID = require('mongodb').ObjectID,
Binary = require('mongodb').Binary,
GridStore = require('mongodb').GridStore,
Grid = require('mongodb').Grid,
Code = require('mongodb').Code,
BSON = require('mongodb').pure().BSON,
assert = require('assert');
var MongoDB = require('mongodb');
var fs = require('fs');

var request = require('request');
var http = require('http');


exports.do_work = function(req, res, url, path){
	// var url = 'http://minionslovebananas.com/images/check-in-minion.jpg';
	MongoClient.connect('mongodb://juntao:Wjt8566176@ds063170.mongolab.com:63170/tripster', function(err, db) {
		  if(!err) {
		    console.log("We are connected");
		  }

		  var fileId = 'ourexamplefiletowrite.txt';
		  // Create a new instance of the gridstore
		  var gridStore = new GridStore(db, 'ourexamplefiletowrite.txt', 'w');
		// Open the file
		  gridStore.open(function(err, gridStore) {

          http.get(url, function (response) {
        	  
        	  		response.setEncoding('binary');
        	  		
        	  		var image2 = '';
              	  
        	  		console.log('reading data in chunks first');
        	  		response.on('data', function(chunk){
        	  	        image2 += chunk;
            	  		console.log('reading data');
        	  	    });
        	  		
        	  		response.on('end', function() {
	        	  		console.log('done reading data');
	
	                    image = new Buffer(image2,"binary");
	                    
	                    // Write some data to the file
	                    gridStore.write(image, function(err, gridStore) {
	                      assert.equal(null, err);
	
	                      // Close (Flushes the data to MongoDB)
	                      gridStore.close(function(err, result) {
	                        assert.equal(null, err);
	
	                            GridStore.read(db, fileId, function(err, fileData) {
	                            // assert.equal(image.toString('base64'), fileData.toString('base64'));
	                            
	                            console.log('Done, writing local images for testing purposes');
	                            
	                            var fd =  fs.openSync(path, 'w');
	
	                            fs.write(fd, image, 0, image.length, 0, function(err,written){
	
	                            });
	                            
	                            // res.writeHead(200, {
	                            //     'Content-Type': 'image/jpeg',
	                            //     'Content-Length':fileData.length});

	                            console.log("File length is " +fileData.length);
	                            res.write(fileData, "binary");
	                            res.end(fileData,"binary");
	                            console.log('Really done');
	
			                      });
	                      });
		                    });
                    		});

		                });
		  });
		  
		  

		});
	
	
	
}