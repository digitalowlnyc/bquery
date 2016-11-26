/**
 * Creator: Bryan Mayor
 * Company: Blue Nest Digital, LLC
 * Date: 11/25/16
 * Time: 6:11 PM
 * License: (All rights reserved)
 * Description: A minimal JS library for selecting elements
 * and looping over them.
 */

function bQuery(selector) {
        return document.querySelectorAll(selector);
    }

if(typeof $ === "undefined") {
    $ = bQuery;
}

/**
 *
 * @param selector A CSS selector
 * @param callback Either a string or a function. If it is a string,
 * the global objects [document, window, console, JSON] will be inspected
 * for a property with that name that is a function.
 */
bQuery.each = function(selector, callback) {
    var passedCallbackArgument = "index";
    if(typeof callback === "string") {
        var callbackFound = null;
        var lookIn = [document, window, console, JSON];
        for(var z=0; z<lookIn.length; z++) {
            var obj = lookIn[z];
            if (obj.hasOwnProperty(callback) && typeof obj[callback] === "function") {
                callbackFound = obj[callback];
                passedCallbackArgument = "object";
                break;
            }
        }
        if(callbackFound === null) {
            throw "Could not find function based on name: " + callback;
        }
        callback = callbackFound;
    }

    var elems = document.querySelectorAll(selector);
    for (var i = 0; i < elems.length; i++) {
        if(passedCallbackArgument === "index") {
            callback.bind(elems[i])(i);
        } else {
            callback.bind(elems[i])(elems[i]);
        }
    }
};