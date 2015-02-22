(function() {

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
// Menu Items Collection
// -------------
var MenuItemsCollection = Backbone.Collection.extend({
  model: MenuItemModel,

  url: "https://api.parse.com/1/classes/categories",

  parse: function(response){
    // console.log(response);
    return response.results;
  }
});

var CategoryCollection = Backbone.Collection.extend({
  model: MenuItemModel,
});

// -------------
// Order Collection
// -------------
var OrderCollection = Backbone.Collection.extend({
  model: OrderModel,

  url: "https://api.parse.com/1/classes/orders",

});



// -------------
// Views / (Presentation / Interation)
// -------------

// -------------
// Menu List View
// -------------
var MenuListView = Backbone.View.extend({
  className: 'js-items',
  el: '.item-container',

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function(){
    var self = this;
    this.$el.empty();

    this.collection.each(function(MenuItemModel){
      var itemView = new MenuItemView({model: MenuItemModel});
      itemView.render();
      self.$el.append(itemView.el);
    });
  }

});

// -------------
// Menu Item View
// -------------
var MenuItemView = Backbone.View.extend({
  tagName: 'li',
  className: 'item',
  template: _.template( $('#item-detail-template').text() ),

  render: function(){
    this.$el.html( this.template( this.model.toJSON() ) );
  }
});


// -------------
// Router
// -------------
var AppRouter = Backbone.Router.extend({
  routes: {
  '': 'index',
  'category/:category' : 'category',
  },

  initialize: function(){
    this.items = new MenuItemsCollection();

    // this.orderList = new OrderCollection();
  },


  index: function(){

    console.log('This thing is working!');

    var orderTemplate = _.template( $('#order-detail-template').text() );
    $('.order-container').html(orderTemplate);
  },

  category: function(category){
    var self = this;
    this.items.fetch().done(function (){
      var organizedFood = self.items.where({itemCategory: category});
      var organizedCollection = new CategoryCollection(organizedFood);
      var menuListView = new MenuListView({collection: organizedCollection});
      menuListView.render();

  });

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
  window.router = new AppRouter();
  Backbone.history.start();
});

})();
