(function($) {
    var _App = window.App;

    var App = Ember.Application.create({
        'Models': {},
        'Views': {},
        'Controllers': {},

        /********************************************
          Routes
        ********************************************/
        Router: Ember.Router.extend({
            'root': Ember.State.extend({
                'index': Ember.State.extend({
                    'route': '/',
                    'connectOutlets': function(router) {
                        router.get('Controllers.Index').connectOutlet(App.Views.Index, App.Models.Index.load());
                    }
                }),
                'user': Ember.State.extend({
                    'route': '/~:user_username',
                    'connectOutlets': function(router, user) {
                        router.get('Controllers.User').connectOutlet(App.Views.User, user);
                    }

                    // TODO - get the list of all of the user's images
                    //'images': Ember.State.extend({
                    //    'route': '/images'
                    //})
                }),
                'character': Ember.State.extend({
                    'route': '/character/:character_id',
                    'connectOutlets': function(router, character) {
                        router.get('Controllers.Character').connectOutlet(App.Views.Character, character);
                    }
                }),
                'morph': Ember.State.extend({
                    'route': '/morph/:morph_id',
                    'connectOutlets': function(router, morph) {
                        router.get('Controllers.Morph').connectOutlet(App.Views.Morph, morph);
                    }
                }),
                'description': Ember.State.extend({
                    'route': '/description/:description_id',
                    'connectOutlets': function(router, description) {
                        router.get('Controllers.Description').connectOutlet(App.Views.Description, description);
                    }
                }),
                'image': Ember.State.extend({
                    'route': '/image/:image_id',
                    'connectOutlets': function(router, image) {
                        router.get('Controllers.Image').connectOutlet(App.Views.Image, image);
                    }
                })
            })    
        })
    });

    /********************************************
      Models
    ********************************************/
    App.Models.Index = Ember.Object.extend({
        'load': function() {
            var $t = this;
            $.getJSON('/?ajax=true', function(json) {
                $t.setProperties(json);
            });
        }
    });

    App.Models.User = Ember.Object.extend({
        'find': function(username) {
            var $t = this;
            $.getJSON('/~' + username + '?ajax=true', function(json) {
                $t.setProperties(json);
            });
        }        
    });

    App.Models.Character = Ember.Object.extend({
        'find': function(character_id) {
            var $t = this;
            $.getJSON('/character/' + character_id + '?ajax=true', function(json) {
                $t.setProperties(json);
            });
        }
    });

    App.Models.Morph = Ember.Object.extend({
        'find': function(morph_id) {
            var $t = this;
            $.getJSON('/morph/' + morph_id + '?ajax=true', function(json) {
                $t.setProperties(json);
            });
        }
    });

    App.Models.Description = Ember.Object.extend({
        'find': function(description_id) {
            var $t = this;
            $.getJSON('/description/' + description_id + '?ajax=true', function(json) {
                $t.setProperties(json);
            });
        }
    });

    App.Models.Image = Ember.Object.extend({
        'find': function(image_id) {
            var $t = this;
            $.getJSON('/image/' + image_id + '?ajax=true', function(json) {
                $t.setProperties(json);
            });
        }
    });

    /********************************************
      Controllers
    ********************************************/
    App.ApplicationController = Ember.Object.extend();
    App.Controllers.Index = Ember.Object.extend();
    App.Controllers.User = Ember.Object.extend();
    App.Controllers.Character = Ember.Object.extend();
    App.Controllers.Morph = Ember.Object.extend();
    App.Controllers.Description = Ember.Object.extend();
    App.Controllers.Image = Ember.Object.extend();

    /********************************************
      Views
    ********************************************/
    App.ApplicationView = Ember.View.extend({
        'templateName': 'application'
    });

    App.Views.Index = Ember.View.extend({
        'templateName': 'templates/index.handlebars'
    });

    App.Views.User = Ember.View.extend({
        'templateName': 'templates/user'
    });

    App.Views.Character = Ember.View.extend({
        'templateName': 'templates/character'
    });

    App.Views.Morph = Ember.View.extend({
        'templateName': 'templates/morph'
    });

    App.Views.Description = Ember.View.extend({
        'templateName': 'templates/description'
    });

    App.Views.Image = Ember.View.extend({
        'templateName': 'templates/image'
    });

    // More so I don't forget how to do this...
    App.noConflict = function() {
        window.App = _App;
        return App;
    }

    window.App = App;


})(jQuery);
