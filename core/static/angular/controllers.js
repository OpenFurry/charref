/*
   Main app controller
*/
function CharactersCtrl($route, $xhr, $cookies) {
    var self = this;
    $xhr.defaults.headers.common['X-CSRFToken'] = $cookies['XSRF-TOKEN'];

    $route.when('',
            { template: '/angular/partials/front.html', controller: FrontCtrl });
    $route.when('/~:username',
            { template: '/angular/partials/show_user.html', controller: ShowUserCtrl });
    $route.when('/character/:characterid',
            { template: '/angular/partials/show_character.html', controller: ShowCharacterCtrl });
    $route.when('/morph/:morphid', 
            { template: '/angular/partials/show_morph.html', controller: ShowMorphCtrl });
    $route.when('/description/:descriptionid',
            { template: '/angular/partials/show_description.html', controller: ShowDescriptionCtrl });
    $route.when('/image/:imageid',
            { template: '/angular/partials/show_image.html', controller: ShowImageCtrl });
    $route.when('404',
            { template: '/angular/partials/404.html', controller: NotFoundCtrl });
    $route.otherwise({ template: '/angular/partials/404.html', controller: NotFoundCtrl });
    $route.onChange(function() {
        $('#header').spin();
        $('#imageBay').dialog("destroy");
        $route.current.scope.params = $route.current.params;
    });
    $route.parent(this);
}
CharactersCtrl.$inject = ['$route', '$xhr', '$cookies'];

/*
   Front page controller
*/
function FrontCtrl($xhr) {
    var self = this;

    $('#header h2').text("Welcome!");

    $xhr(
            "GET",
            "/?ajax=true&noCachePlz=" + new Date().getTime(),
            function(code, response) {
                $('.tipsify').tipsy({gravity: $.fn.tipsy.autoWE});
                self.data = response;
                $('#header').data().spinner.stop();
            }
    );
}
FrontCtrl.$inject = ['$xhr'];

/*
   404 controller
*/
function NotFoundCtrl() {
    var self = this;
    $('#header').data().spinner.stop();
    $('.tipsify').tipsy({gravity: $.fn.tipsy.autoWE});
}

/*
   Show user controller
*/
function ShowUserCtrl($xhr, $location) {
    var self = this;

    $xhr(
            "GET", 
            "/~" + self.params.username + "?ajax=true&noCachePlz=" + new Date().getTime(),
            function(code, response) {
                self.user = response;
                if (self.user.fields.is_active) {
                    if (self.user.fields.is_superuser) {
                        self.status = "<em>Superuser!</em>";
                    } else {
                        if (self.user.fields.is_staff) {
                            self.status = "<em>Staff!</em>";
                        } else {
                            self.status = "";
                        }
                    }
                } else {
                    self.user.fields.username = "<s>" + self.user.fields.username + "</s>"
                }
                $('#header h2').text("~" + self.user.fields.username);
                $('#header').data().spinner.stop();
                $('.tipsify').tipsy({gravity: $.fn.tipsy.autoWE});
            },
            function(code, response) {
                $location.updateHash('404');
            }
    );
}
ShowUserCtrl.$inject = ['$xhr', '$location'];

/*
   Show character controller
*/
function ShowCharacterCtrl($xhr) {
    var self = this;
    
    $xhr(
            "GET",
            "/character/" + self.params.characterid + "?ajax=true&noCachePlz=" + new Date().getTime(),
            function(code, response) {
                self.character = response;
                $('#header h2').html('<a href="#/~' + self.character.fields.user + '">~' + self.character.fields.user + '</a> / ' + self.character.fields.name);
                $('#sc').load("/_species/");
                if (self.character.is_owner) {
                    $xhr(
                        "GET",
                        "/~" + self.character.fields.user + "/images?ajax=true&noCachePlz=" + new Date().getTime(),
                        function(c, r) {
                            self.images = r;
                            $('#header').data().spinner.stop();
                        }
                    );
                } else {
                    self.images = [];
                    $('#header').data().spinner.stop();
                }
                $('.tipsify').tipsy({gravity: $.fn.tipsy.autoWE});
                $('#charidfld').val(self.character.fields.id);
            }
    );
}
ShowCharacterCtrl.$inject = ['$xhr'];

/*
   Show morph controller
*/
function ShowMorphCtrl($xhr) {
    var self = this;
    
    $xhr(
            "GET",
            "/morph/" + self.params.morphid + "?ajax=true&noCachePlz=" + new Date().getTime(),
            function(code, response) {
                self.morph = response;
                $('#header h2').html(
                    '<a href="#/~' + self.morph.fields.user + '">~' + self.morph.fields.user + '</a> / '
                    + '<a href="#/character/' + self.morph.fields.character.id + '">' + self.morph.fields.character.name + '</a> / '
                    + self.morph.fields.name);
                if (self.morph.is_owner) {
                    $xhr(
                        "GET",
                        "/~" + self.morph.fields.user + "/images?ajax=true&noCachePlz=" + new Date().getTime(),
                        function(c, r) {
                            self.images = r;
                            $('#header').data().spinner.stop();
                        }
                    );
                } else {
                    self.images = [];
                    $('#header').data().spinner.stop();
                }
                $('.tipsify').tipsy({gravity: $.fn.tipsy.autoWE});
                $('#morphidfld').val(self.morph.fields.id);
            }
    );
}
ShowMorphCtrl.$inject = ['$xhr'];

/*
   Show description controller
*/
function ShowDescriptionCtrl($xhr) {
    var self = this;
    
    $xhr(
            "GET",
            "/description/" + self.params.descriptionid + "?ajax=true&noCachePlz=" + new Date().getTime(),
            function(code, response) {
                self.description = response;
                $('#header h2').html(
                    '<a href="#/~' + self.description.fields.user + '">~' + self.description.fields.user + '</a> / '
                    + '<a href="#/character/' + self.description.character.id + '">' + self.description.character.name + '</a> / '
                    + '<a href="#/morph/' + self.description.morph.id + '">' + self.description.morph.name + '</a> / '
                    + self.description.fields.name);
                if (self.description.is_owner) {
                    $xhr(
                        "GET",
                        "/~" + self.description.fields.user + "/images?ajax=true&noCachePlz=" + new Date().getTime(),
                        function(c, r) {
                            self.images = r;
                            $('#header').data().spinner.stop();
                        }
                    );
                } else {
                    self.images = [];
                    $('#header').data().spinner.stop();
                }
                $('.tipsify').tipsy({gravity: $.fn.tipsy.autoWE});
            }
    );
}
ShowDescriptionCtrl.$inject = ['$xhr'];

/*
   Show image controller
*/
function ShowImageCtrl($xhr) {
    var self = this;
    
    $xhr(
            "GET",
            "/image/" + self.params.imageid + "?ajax=true&noCachePlz=" + new Date().getTime(),
            function(code, response) {
                self.image = response;
                $('#header h2').html('Image - posted by <a href="#/~' + self.image.fields.user + '">~' + self.image.fields.user + '</a>');
                $('#header').data().spinner.stop();
                $('.tipsify').tipsy({gravity: $.fn.tipsy.autoWE});
            }
    );
}
ShowImageCtrl.$inject = ['$xhr'];
