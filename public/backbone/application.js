(function($) {

    'use strict';

    // Our application
    var App = {
        'Models': {},
        'Collections': {},
        'Views': {}
    };

    // The routes for our application
    var Router = Backbone.Router.extend({
        'routes': {
            '': 'showIndex',
            '~:username': 'showUser',
            'character/:id': 'showCharacter',
            'morph/:id': 'showMorph',
            'description/:id': 'showDescription',
            'image/:id': 'showImage',
            ':error': 'notFound'
        }
    });
    App.Router = new Router(); // instantiate within the app NS

    // These are flatpages on which we may fall back in case of an error
    App.Flatpages = {
        'credits': {
            'title': 'Credits',
            'template': Handlebars.templates.credits
        }
    };

    /********************************************
      Controllers
    ********************************************/
    // Try getting an item from a collection; if it doesn't exist, add it and fetch it
    App.fetchOrRender = function(collection, id, modelClass, viewClass) {
        id = decodeURIComponent(id); // allows spaces, etc.
        var obj = collection.get(id);
        if (obj === undefined) {
            // this means it wasn't in the cache, best fetch it
            obj = new modelClass();
            obj.id = id;
            collection.add(obj);
            obj = collection.get(id);
            obj.fetch({data: {ajax: 'true'}}); // see note below...
            var view = new viewClass({model: obj});
        } else {
            // use the cached version
            var view = new viewClass({model: obj});
            view.render();
        }
    };
    /*
       NOTE:
       It seems that, when you click the back button, the page will reload
       the cached partial fetched via XHR, rather than the page with that
       partial loaded in it (as per the router).  The way around this is to
       use a slightly different link when fetching with XHR than when
       loading a plain URL.  Even though Django understand that the request
       came from XHR, we pass the ajax=true query string to ensure that it
       is not cached as a partial in the browser history.
    */    

    // The controllers themselves; they are mostly alike
    App.Router.on('route:showIndex', function() {
        if (App.displayMessagesFlag) {
            App.displayMessagesFlag = false;
        } else {
            $('#messages').html('');
        }
        $('#content,#footer').fadeOut('fast');
        $.getJSON('/?ajax=true', function(json) {
            App.indexModel.set(json);
            App.indexView.render();
        });
    });
    App.Router.on('route:showUser', function(username) {
        if (App.displayMessagesFlag) {
            App.displayMessagesFlag = false;
        } else {
            $('#messages').html('');
        }
        $('#content,#footer').fadeOut('fast');
        App.fetchOrRender(App.userCollection, username, App.Models.User, App.Views.User);
    });
    App.Router.on('route:showCharacter', function(characterId) {
        if (App.displayMessagesFlag) {
            App.displayMessagesFlag = false;
        } else {
            $('#messages').html('');
        }
        $('#content,#footer').fadeOut('fast');
        App.fetchOrRender(App.characterCollection, characterId, App.Models.Character, App.Views.Character);
    });
    App.Router.on('route:showMorph', function(morphId) {
        if (App.displayMessagesFlag) {
            App.displayMessagesFlag = false;
        } else {
            $('#messages').html('');
        }
        $('#content,#footer').fadeOut('fast');
        App.fetchOrRender(App.morphCollection, morphId, App.Models.Morph, App.Views.Morph);
    });
    App.Router.on('route:showDescription', function(descriptionId) {
        if (App.displayMessagesFlag) {
            App.displayMessagesFlag = false;
        } else {
            $('#messages').html('');
        }
        $('#content,#footer').fadeOut('fast');
        App.fetchOrRender(App.descriptionCollection, descriptionId, App.Models.Description, App.Views.Description);
    });
    App.Router.on('route:showImage', function(imageId) {
        if (App.displayMessagesFlag) {
            App.displayMessagesFlag = false;
        } else {
            $('#messages').html('');
        }
        $('#content,#footer').fadeOut('fast');
        App.fetchOrRender(App.imageCollection, imageId, App.Models.Image, App.Views.Image);
    });

    // Our 404 controller
    App.Router.on('route:notFound', function(error) {
        $('#content,#footer').fadeOut('fast');

        // First, attempt to fall-back on a flatpage, otherwise display a 404
        if (App.Flatpages[error] !== undefined) {
            $('#content').html(App.Flatpages[error].template());
            $('#breadcrumbs').text(App.Flatpages[error].title);
            document.title = App.Flatpages[error].title + ' - ' + App.title;
        } else {
            $('#content').html('<h2>Not found</h2>');
        }
        $('#content,#footer').fadeIn('fast');
    });

    /********************************************
      Models
    ********************************************/
    // Our very plain models - see views for more info
    App.Models.Index = Backbone.Model.extend({});
    App.Models.User = Backbone.Model.extend({});
    App.Models.Character = Backbone.Model.extend({});
    App.Models.Morph = Backbone.Model.extend({});
    App.Models.Description = Backbone.Model.extend({});
    App.Models.Image = Backbone.Model.extend({});
    App.Models.ImagesForItem = Backbone.Model.extend({});
    App.Models.ImagesToAttach = Backbone.Model.extend({});
    App.Models.Breadcrumbs = Backbone.Model.extend({});

    /********************************************
      Collections
    ********************************************/
    // These are used mostly for caching
    App.Collections.Users = Backbone.Collection.extend({
        'model': App.Models.User,
        'url': '/users'
    });
    App.Collections.Characters = Backbone.Collection.extend({
        'model': App.Models.Character,
        'url': '/character'
    });
    App.Collections.Morphs = Backbone.Collection.extend({
        'model': App.Models.Morph,
        'url': '/morph'
    });
    App.Collections.Descriptions = Backbone.Collection.extend({
        'model': App.Models.Description,
        'url': '/description'
    });
    App.Collections.Images = Backbone.Collection.extend({
        'model': App.Models.Image,
        'url': '/image'
    });

    /********************************************
      Views
    ********************************************/
    // Our views are mostly alike.
    // Some involve setting more complicated breadcrumbs,
    // some involve fetching associated images, etc.

    // Default view
    App.Views.Index = Backbone.View.extend({
        'initialize': function() {
            this.model.bind('change', this.render, this);
        },

        'render': function() {
            var result = Handlebars.templates.showIndex(this.model.toJSON());
            $('#content').html(result);
            App.breadcrumbsModel.set({
                'breadcrumbs': [ { text: 'Welcome!' } ]
            });
            document.title = App.title;
            $('#content,#footer').fadeIn('fast');
        }
    });

    // Viewing a user
    App.Views.User = Backbone.View.extend({
        'initialize': function() {
            this.model.bind('change', this.render, this);
        },

        'render': function() {
            var result = Handlebars.templates.showUser(this.model.toJSON());
            $('#content').html(result);
            App.breadcrumbsModel.set({
                'breadcrumbs': [
                    { text: '~' + this.model.id }
                ]
            });
            document.title = this.model.id + ' (user) - ' + App.title;
            $('#content,#footer').fadeIn('fast');
            $('.ntn').append($('#nnt').html()); // Ensure our nonce is available
        }
    });

    // Viewing a character
    App.Views.Character = Backbone.View.extend({
        'initialize': function() {
            this.model.bind('change', this.render, this);
        },

        'render': function() {
            var result = Handlebars.templates.showCharacter(this.model.toJSON());
            $('#content').html(result);
            $('#sc').load("/_species/");
            App.imagesForItemModel.set({
                'images': this.model.get('images'),
                'is_owner': this.model.get('is_owner')
            });
            App.imagesForItemView.render();
            App.breadcrumbsModel.set({
                'breadcrumbs': [
                    { text: '~' + this.model.get('fields').user, url: '/~' + this.model.get('fields').user },
                    { text: this.model.get('fields').name }
                ]
            });
            App.imagesToAttachModel.set({contentType: this.model.get('content_type_id'), objectId: this.model.get('fields').id});
            document.title = this.model.get('fields').name + ' (character) - ' + App.title;
            $('#content,#footer').fadeIn('fast');
        }
    });

    // Viewing a morph
    App.Views.Morph = Backbone.View.extend({
        'initialize': function() {
            this.model.bind('change', this.render, this);
        },

        'render': function() {
            var result = Handlebars.templates.showMorph(this.model.toJSON());
            $('#content').html(result);
            App.imagesForItemModel.set({
                'images': this.model.get('images'),
                'is_owner': this.model.get('is_owner')
            });
            App.imagesForItemView.render();
            App.breadcrumbsModel.set({
                'breadcrumbs': [
                    { text: '~' + this.model.get('fields').user, url: '/~' + this.model.get('fields').user },
                    { text: this.model.get('fields').character.name, url: '/character/' + this.model.get('fields').character.id },
                    { text: this.model.get('fields').name }
                ]
            });
            App.imagesToAttachModel.set({contentType: this.model.get('content_type_id'), objectId: this.model.get('fields').id});
            document.title = this.model.get('fields').name + ' (morph) - ' + App.title;
            $('#content,#footer').fadeIn('fast');
        }
    });

    // Viewing a description
    App.Views.Description = Backbone.View.extend({
        'initialize': function() {
            this.model.bind('change', this.render, this);
        },

        'render': function() {
            var result = Handlebars.templates.showDescription(this.model.toJSON());
            $('#content').html(result);
            App.imagesForItemModel.set({
                'images': this.model.get('images'),
                'is_owner': this.model.get('is_owner')
            });
            App.imagesForItemView.render();
            App.breadcrumbsModel.set({
                'breadcrumbs': [
                    { text: '~' + this.model.get('fields').user, url: '/~' + this.model.get('fields').user },
                    { text: this.model.get('character').name, url: '/character/' + this.model.get('character').id },
                    { text: this.model.get('morph').name, url: '/morph/' + this.model.get('morph').id },
                    { text: this.model.get('fields').name }
                ]
            });
            App.imagesToAttachModel.set({contentType: this.model.get('content_type_id'), objectId: this.model.get('fields').id});
            document.title = this.model.get('fields').name + ' (description) - ' + App.title;
            $('#content,#footer').fadeIn('fast');
        }
    });

    // Viewing a single image
    App.Views.Image = Backbone.View.extend({
        'initialize': function() {
            this.model.bind('change', this.render, this);
        },

        'render': function() {
            var result = Handlebars.templates.showImage(this.model.toJSON());
            $('#content').html(result);
            App.breadcrumbsModel.set({
                'breadcrumbs': [
                    { text: '~' + this.model.get('fields').user, url: '/~' + this.model.get('fields').user },
                    { text: 'Image ' + this.model.get('fields').id }
                ]
            });
            document.title = 'Image ' + this.model.get('fields').id + ' (image) - ' + App.title;
            $('#content,#footer').fadeIn('fast');
        }
    });

    // The images attached to whatever we're looking at
    App.Views.ImagesForItem = Backbone.View.extend({
        'initialize': function() {
            this.model.bind('change', this.render, this);
        },

        'render': function() {
            $('#imagesForItem').html('');
            if (this.model.get('images').length > 0) {
                var result = Handlebars.templates.imagesForItem(this.model.toJSON());
                $('#imagesForItem').html(result);
            }
        }
    });

    // If the user is logged in, they can attach images to objects with this view
    App.Views.ImagesToAttach = Backbone.View.extend({
        'events': {
            "click #attachImages": "render"
        },

        'render': function() {
            if (this.model.get('images').length > 0) {
                var result = Handlebars.templates.imagesToAttach(this.model.toJSON());
                $('#imageBay').html(result);
                $('.ntn').append($('#nnt').html()); // ensure our nonce is in place
            }
        }
    });

    // Breadcrumbs are our links at the top
    App.Views.Breadcrumbs = Backbone.View.extend({
        'initialize': function() {
            this.model.bind('change', this.render, this);
        },

        'render': function() {
            $('#breadcrumbs').html(

                // pull them into a list of links
                _.map(this.model.toJSON().breadcrumbs, function(crumb) {
                    if (crumb.url) {
                       return '<a class="push" href="' + crumb.url + '">' + crumb.text + '</a>';
                    } else {
                       return crumb.text;
                    }
                }).join(' / ')
            );
        }
    });

    /********************************************
      Instances
    ********************************************/
    // Index
    App.indexModel = new App.Models.Index();
    App.indexView = new App.Views.Index({model: App.indexModel});
    // Breadcrumbs
    App.breadcrumbsModel = new App.Models.Breadcrumbs();
    App.breadcrumbsView = new App.Views.Breadcrumbs({model: App.breadcrumbsModel});
    // Images for items
    App.imagesForItemModel = new App.Models.ImagesForItem();
    App.imagesForItemView = new App.Views.ImagesForItem({model: App.imagesForItemModel});
    // Images to attach
    App.imagesToAttachModel = new App.Models.ImagesToAttach();
    App.imagesToAttachView = new App.Views.ImagesToAttach({model: App.imagesToAttachModel});
    
    // Collections for caching objects
    App.userCollection = new App.Collections.Users();
    App.characterCollection = new App.Collections.Characters();
    App.morphCollection = new App.Collections.Morphs();
    App.descriptionCollection = new App.Collections.Descriptions();
    App.imageCollection = new App.Collections.Images();

    // Flags and labels
    App.title = "Characters @ OpenFurry";
    App.displayMessagesFlag = true; // messages via the django messaging framework

    /********************************************
      Handlebars helpers
    ********************************************/
    // Wrap descriptions in paragraph tags
    Handlebars.registerHelper('linebreaks', function(blob) {
        return blob ? '<p>' + blob.replace(/(\r)?\n(\r)?\n/g, '</p><p>') + '</p>' : blob;
    });

    // extra equality helpers
    Handlebars.registerHelper('if_eq', function(left, right, options) {
        if (left == right) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
    Handlebars.registerHelper('if_neq', function(left, right, options) {
        if (left != right) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    // On ready...
    $(function() {

        // Sensible default of the index page
        window.__route = window.__route || '';
        
        // pre-fetch  the index page, set everything up in a callback
        $.getJSON('/?ajax=true', function(json) {
            App.indexModel.set(json, {silent: true});

            // Delegate our click events on .push links: they should use the Router, rather than the browser
            $(document).delegate('a.push', 'click', function(evt) {

                // Allow possible alternatives to middle-click to open in new tab
                if (!evt.altKey && !evt.ctrlKey && !evt.metaKey && ! evt.shiftKey) {

                    // Some browsers will put the whole URL in the hash if not using pushState
                    var href = $(this).attr('href');
                    if (/\/\//.test(href)) {
                        href = href.replace(window.location.protocol + '//' + window.location.host, '');
                    }

                    // Prevent default behavior; navigate instead
                    evt.preventDefault();
                    App.Router.navigate(href, {trigger: true});
                }
            });

            // Check and see if we can use pushState
            if (window.history.pushState) {
                Backbone.history.start({pushState: true}); // Well.. this is easy.
            } else { 
                // Grab the path portion of the location
                var loc = window.location.pathname.replace(/^\//, '').replace(/\/$/, ''); 
                window.__route = loc; // Because early versions of Firefox will not reload with the location.href set below

                // If the path portion isn't empty (i.e.: /), then redirect to the hashed version
                if (loc != '') {
                    window.location.href = '/#' + loc;
                }

                // The following is for IE7/8 (at least), which will need the __route set to the location's hash
                if (window.location.hash.length > 1) {
                    window.__route = window.location.hash.slice(1);
                }

                // Initialize without pushState
                Backbone.history.start({pushState: false});
            }
            App.Router.navigate(window.__route, {trigger: true});
        });
        $.getJSON('/currentUser/images?ajax=true', function(json) {
            App.imagesToAttachModel.set({images: json});
        });
    });

    // Set in namespace
    window.App = App;
})(jQuery);
