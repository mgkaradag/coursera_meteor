

Images = new Mongo.Collection("my_images");


if (Meteor.isClient) {

    /*
    Meteor.startup(function () {

       // Show the example modal 3 seconds after startup.
        setTimeout(function(){
            Modal.show('img_upload')
        }, 30000)
    });
*/
}


if (Meteor.isServer) {
    Meteor.startup(function () {
      // code to run on server at startup
      console.log(Images.find().count());
      if (Images.find().count() == 0) {
        for (var i = 1; i <5; i++) {
          Images.insert({
              img_src: "img"+i+".JPG",
              img_txt: "Seychelles - "+i,
             // img_ID: i
          });
          console.log(Images.find().count());
        }
      }
    });

    console.log("son rakam "+Images.find().count()); //
      
}

