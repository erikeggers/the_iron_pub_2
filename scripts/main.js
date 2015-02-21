(function() {
  'use strict';

  window.App = window.App || {};

// -------------
//  Models
// -------------

// -------------
// Menu Items Model
// -------------
var MenuItemModel = Backbone.Model.extend({
  idAttribute: "objectId"
});

// -------------
// Order Model
// -------------
var OrderModel = Backbone.Model.extend({
  idAttribute: "objectId"
});

// -------------
//  Collections
// -------------

// -------------
// Menu Items Collection
// -------------
var MenuItemsCollection = Backbone.Collection.extend({
  model: MenuItemModel,

  url: "https://api.parse.com/1/classes/categories",

  parse: function(response){
    console.log(response);
    return response.results;
  }
});

// -------------
// Order Collection
// -------------
var OrderCollection = Backbone.Collection.extend({
  model: OrderModel,

  url: "https://api.parse.com/1/classes/orders",

  parse: function(response){
    console.log(response);
    return response.results;
  }
});


// -------------
// Views
// -------------

// -------------
// Index View
// -------------
var IndexView = Backbone.View.extend ({

});

// -------------
// Menu List View
// -------------
var MenuListView = Backbone.View.extend ({
  template: _.template( $('#item-detail-template').text() ),

  render: function(){
    this.$el.html(this.template());
    return this;
  }
});

// -------------
// Menu Item View
// -------------
var MenuItemView = Backbone.View.extend ({
  template: _.template( $('#item-detail-template').text() ),

  render: function(){
    this.$el.empty();
    this.$el.html(this.template());
    return this;
  }
});

// -------------
// Order View
// -------------
var OrderView = Backbone.View.extend ({
  template: _.template( $('#order-detail-template').text() ),

  render: function(){
    this.$el.html(this.template());
    return this;
  }
});



// -------------
// App Router
// -------------
var AppRouter = Backbone.Router.extend ({
  routes: {
    '': 'index',
    'category/:category': 'category'
  },

  initialize: function(){
    this.items = new MenuItemsCollection();
  },

  index: function(){
    // Fetch items
    this.items.fetch();
    // Order rendered
    this.orderView = new OrderView();
    this.orderView.render();
    $('.order-container').html(this.orderView.el);
  },

  category: function(){
    //Menu Items rendered
    this.itemView = new MenuItemView();
    this.itemView.render();
    $('.items').html(this.itemView.el);
    //Order rendered
    this.orderView = new OrderView();
    this.orderView.render();
    $('.order-container').html(this.orderView.el);
  }

});

// -------------
// Configuration
// -------------
$.ajaxSetup({
  headers: {
    "X-Parse-Application-Id": "8xTeXxUlT0r4y1QT8FcBdKXFGxhkodnSrpGcr8PT",
    "X-Parse-REST-API-Key": "5TmJbVKOSKszxfByeRPe2s2BRvrkkmD3JwRegzk6"
  }
});

// -------------
// Glue Code
// -------------
$(document).ready(function(){
  App.router = new AppRouter();
  Backbone.history.start();
});

})();
