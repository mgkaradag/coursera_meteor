
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo'
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import './templates.html';
import '../startup/startup.js';



Template.img_upload.events({
    'click .js-show-img-form': function (event) {
        /*Modal.show('img_upload');
         or alternatively by using jQuery; */
        $('#img_upload_modal').modal('show');
    },
    'submit .js-img-upload': function (event) {
        Modal.show('img_upload_modal');
        var img_src, img_alt;
        img_src = event.target.img_src.value;
        img_alt = event.target.img_alt.value;
        console.log("SRC: "+img_src+"-ALT: "+img_alt);
        Images.insert({
            img_src: img_src,
            img_txt: img_alt,
            created: new Date()
        });
    }
});
