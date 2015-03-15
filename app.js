(function() {

  'use strict';

// ----------------------------------------------------------------------------
// 概要
// ----------------------------------------------------------------------------
// jsonファイルを取得し、extend。

  var BaseJson
  var PeopleJson
  
  $.ajax({
    type: "GET", 
    url: "/json/base.jsonp",
    dataType: 'jsonp',
    jsonpCallback: 'base',
    success: function(data){
      BaseJson = data
      console.log(BaseJson);
    },
    error: function(){
      console.log('error')
    }
  }).done(function(){
    setData()
  })

  $.ajax({
    type: "GET", 
    url: "/json/person.jsonp",
    dataType: 'jsonp',
    jsonpCallback: 'person',
    success: function(data){
      PeopleJson = data
      console.log(PeopleJson);
    },
    error: function(){
      console.log('error')
    }
  }).done(function(){
    setData()
  })

  var Person = []
  var flag = false
  
  function setData(){
    if(!flag) {
      flag = true
    }
    else {
      for (var i = 0; i < PeopleJson.length; i++) {
        var dataObj = {}
        $.extend(true, dataObj, BaseJson, PeopleJson[i])
        Person.push(dataObj)
      }
    }
  }
  
  var Box = new Vue({
    el: '#demo',

    data: {
      data: [],
    },

    created: function () {
      this.data = Person;
    }
  });

})();