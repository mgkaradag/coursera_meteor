
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo'
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import './templates.html';
import '../startup/startup.js'; 



//Template.images.helpers({images:img}); // Basically, Template helpers perform "compile, data creation and HTML creation" operations of "Handlebars". 
// HELPERS
let scrollPos = null;

Template.images.onCreated(function helloOnCreated() {
    // deleted = false
    this.deleted = new ReactiveVar(false);
    this.lastID = new ReactiveVar (null);
    this.dummyField = new ReactiveVar (0); // you can carry whaetever info you need within a template
});

Template.images.onRendered(function () {
    templateInstance = this;
});


Template.images.helpers({
    images() {
        return Images.find({}, {sort: {created: -1, rate: -1}})
    },
    deleted() {
        return Template.instance().deleted.get();
    },
    dummyField () {
        return null; // you can carry whaetever info you need within a template
    }
});


// EVENTS
/*
Template.images.events({
  'click js-image' (event) {
    console.log("dsdd");
    $(event.target).css("width", "50px");
  }
}) ;
*/


Template.images.events({
  'click .js-image'(event){
    $(event.target).css("width", "50px");
    },

  'click .js-delete-image': function(event, instance){
         ID = this._id;
          new Confirmation({
              message: "Are you sure ?",
              title: "Confirmation",
              cancelText: "Cancel",
              okText: "Ok",
              success: true, // whether the button should be green or red
              focus: "cancel" // which button to autofocus, "cancel" (default) or "ok", or "none"
          }, function (ok) {
                  // ok is true if the user clicked on "ok", false otherwise
                if (ok) {

                    //  var id= Images.findOne({"_id":ID}).img_ID;
                    scrollPos =  $('#'+ID).offset().top; // set the scroll position
                    templateInstance.$('#'+ID).hide('slow', function () {});
                    instance.deleted.set(true); // set delete undo to "true"
                    instance.lastID.set(ID);
                    console.log("ID: "+ID);
                    console.log("this._id="+this._id); //Burada "this" değişmiş!!!
                    console.log("deleted="+instance.deleted);
                    //   Images.remove({"_id":ID});
            }
      });
    },

    'click .js-img-rating': function (event) {
        var rated = $(event.currentTarget).data('userrating');
        var ID =this.ID;
        console.log("Rate= "+rated);
        console.log("this.ID="+this.ID);
        Images.update({_id:ID}, {$set: {rate:rated}});

        /*
        console.log("This data"+$(this).data("ID"));
        console.log("$(event.currentTarget).attr('ID')="+$(event.currentTarget).attr("ID")); // gives the standart "id" attr
        console.log("event.target.ID="+event.target.ID); //undefined
        console.log("event.currentTarget.ID="+$(event.currentTarget).data('ID')); // undefined
        console.log("$(this).attr('ID')="+$(this).attr('ID'));
        console.log("this.id= "+ID);
        console.log("this._id="+this._id);
        console.log("$(this).attr('id')="+$(this).attr('id'));
        console.log("event.target.ID.value="+event.target.ID.value);
        console.log("$(event.currentTarget).data('ID)="+$(event.currentTarget).data("ID"));
        */
    },

    'click .js-delete-undo': function(event, instance){
        var ID = instance.lastID.get();
        $(window).scrollTop(scrollPos);
       // templateInstance.$('#'+ID).next().focus();
        templateInstance.$('#'+ID).show('slow', function () {

        });

        //$("div[lastid|='selector']").appendTo(".container");
        console.log("scrollTop="+scrollPos);
        console.log("lastID="+ID);
        console.log("dummy field= "+ instance.dummyField.get());
        instance.deleted.set(false);
    }

  });





/*
Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
*/
