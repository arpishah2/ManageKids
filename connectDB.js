var simpledb = require('simpledb')
var AWS = require('aws-sdk');
var sdb      = new simpledb.SimpleDB({keyid:'AKIAI5VP47JZQLDQW5QQ',secret:'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'})
var item1;
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
      item1 = result;
      console.log("Those are good burgers, Walter: "+JSON.stringify(item1));
      callback();
    }
  });
}





//call methods

// Create domain 'friends' and values to it 

createDom('friends',function(){

  listDom(function(){

    // Arjun and Jayu
    //Arjun and Kanav

    arr4 =  [
    { $ItemName:'f1', kid1:'k1', kid2 : 'k5'},
    { $ItemName:'f2', kid1:'k1', kid2 : 'k4'}
 	  ]

    putItemsInDom('friends',arr4,function(){
        getItemFromDom('friends','f2',function(){ console.log("hi"); })
    });
  });
});






/* Create domain 'spouse' and values to it 

createDom('spouse',function(){

  listDom(function(){

    arr3 =  [
    { $ItemName:'r1', spouse1:'p1', spouse2 : 'p2'},
    { $ItemName:'r2', spouse1:'p3', spouse2 : 'p4'},
    { $ItemName:'r3', spouse1:'p5', spouse2 : 'p6'}
 	  ]

    putItemsInDom('spouse',arr3,function(){
        getItemFromDom('spouse','r2',function(){ })
    });
  });
});

*/

/*
// kid domain

arr2 =  [
    { $ItemName:'k1', name:'Arjun', parent1: 'p1', parent2: 'p2'},
    { $ItemName:'k2', name:'Rushabh', parent1: 'p1', parent2: 'p2'},
    { $ItemName:'k3', name:'Nitya', parent1: 'p3', parent2: 'p4'},
    { $ItemName:'k4', name:'Kanav', parent1: 'p3', parent2: 'p4'},
    { $ItemName:'k5', name:'Jayu', parent1: 'p5', parent2: 'p6'},
    { $ItemName:'k6', name:'Vriti', parent1: 'p5', parent2: 'p6'}
  ]

putItemsInDom('kid',arr2,function(){
  
  console.log("Added values");

  getItemFromDom('kid','k5',function(){
    console.log("Found Item was added !!");
  })

});
*/

/*
getItemFromDom('parent','p6',function(){
  console.log(JSON.stringify(item1));
  console.log("Found Item was added !!");
})
*/


/*
//------------------------------------get one item from domain

getItemFromDom('parent','p6',function(){console.log("Found Item was added !!");})

*/
//getItemFromDom('parent','r2',function(){console.log("Found Item!!");})


//---------------------------------- put multiple items in domain
//parent domain

/*
arr1 =  [
    { $ItemName:'p2', name:'Chintan', phoneno: '123457'},
    { $ItemName:'p3', name:'Prachi', phoneno: '123458'},
    { $ItemName:'p4', name:'Chitrang', phoneno: '123459'},
    { $ItemName:'p5', name:'Ilesh', phoneno: '123460'},
    { $ItemName:'p6', name:'Grishma', phoneno: '123461'}
  ]

putItemsInDom('parent',arr1,function(){console.log("By")})

*/



/*
//----------------------------------put one item in domain

parentOb ={
    	name:'Devanshi',
      phoneno: '123456'
}
putItemInDom('parent', 'p1', parentOb, function(){console.log("Item added");} )
*/


//-----------------------------------delete domain
/*
delDom('kid', function(){
    console.log("All done");
});
*/

//create and list domains

/*------------------------------------create domain
createDom('parent',function(){
  listDom(function(){
    console.log("All done");
  });
});
*/
