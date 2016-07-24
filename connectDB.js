var simpledb = require('simpledb')
var AWS = require('aws-sdk');
var sdb      = new simpledb.SimpleDB({keyid:'AKIAI5VP47JZQLDQW5QQ',secret:'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'})

//console.log("Here");
//console.log(sdb);

var params = {
  DomainName: "kid" /* required */
};


//create Domain 
function createDom(dname,callback){
  sdb.createDomain(dname, function(err, data) {
    if (err) {
      console.log("there is an error");
      console.log(err, err.stack);
    } // an error occurred
    else {
      console.log("created domain"); 
      console.log("List of domains:");
      callback();
    }          // successful response
  });
}


//delete domain
function delDom(dname,callback){

  sdb.deleteDomain(dname,function(err,res,meta){
    if (err) {
      console.log("there is an error");
      console.log(err, err.stack);
    }
    else{
      console.log('God made the world, but we made the field.');
      console.log('Deleted domain : '+dname);
    }
  });
}




//list domain
function listDom(callback){

  sdb.listDomains(function( error, result, meta ) {
    if( error ) {
      console.log('listDomains failed: '+error.Message )
    }
    else {
      // do stuff with result, an array of domain names
      console.log('Domains : '+JSON.stringify(result));
      callback();
    }
  });
}


//put an item in domain
function putItemInDom(dname, iname, obj, callback){

  sdb.putItem(dname,iname,obj,
  function(error){

    sdb.getItem(dname, iname, function( error, result ) {
      console.log( 'attr1 = '+result.name )
      console.log( 'attr2 = '+result.phoneno )
    });

    callback();

  });

}




//put multiple items in domain

function putItemsInDom(dname,arrOfItems,callback){

  sdb.batchPutItem(dname,arrOfItems,function(err,res,meta){

    if(err){
      console.log(err.stack);
    }
    else{
      console.log("And what was your ownership share diluted down to?"+JSON.stringify(res));
      callback();
    }
    
  });
}




//getItem from domain
function getItemFromDom(dname,iname,callback){

  sdb.getItem(dname,iname,function( error, result, meta ){

    if(error){
      console.log("there is an error");
      console.log(err, err.stack);
    }
    else{
      console.log("Those are good burgers, Walter: "+JSON.stringify(result));
    }
  });

}

//call methods




arr1 =  [
    { $ItemName:'p2', name:'Chintan', phoneno: '123457'},
    { $ItemName:'p3', name:'Prachi', phoneno: '123458'},
    { $ItemName:'p4', name:'Chitrang', phoneno: '123459'},
    { $ItemName:'p5', name:'Ilesh', phoneno: '123460'},
    { $ItemName:'p6', name:'Grishma', phoneno: '123461'}
  ]

putItemsInDom('parent',arr1,function(){console.log("By")})

//getItemFromDom('parent','p6',function(){console.log("Found Item was added !!");})

//
/*
//put one item in domain

parentOb ={
    	name:'Devanshi',
      phoneno: '123456'
}
putItemInDom('parent', 'p1', parentOb, function(){console.log("Item added");} )
*/


//delete domain
/*
delDom('kid', function(){
    console.log("All done");
});
*/

//create and list domains

/*
createDom('parent',function(){
  listDom(function(){
    console.log("All done");
  });
});
*/
