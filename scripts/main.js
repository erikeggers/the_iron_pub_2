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
    this.menuListView = new MenuListView({collection: this.items});
    this.menuItemView = new MenuItemView({collection: this.items});

    this.orderList = new OrderCollection();
  },

  foodCategories: function(){
    return this.items.groupBy(function(model){
      return model.get('itemCategory');

  });


  },

  index: function(){

    console.log('This thing is working!');

    var orderTemplate = _.template( $('#order-detail-template').text() );
    $('.order-container').html(orderTemplate);
  },

  category: function(category){
    var self = this;
    this.items.fetch().done(function (){
    var organizedFood = self.foodCategories()[category];
      console.log(organizedFood);

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
