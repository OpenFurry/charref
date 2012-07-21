(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['credits'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var foundHelper, self=this;


  return "<div id=\"twoway\">\n    <p>Characters  relies on a lot of open source software and other little bits and bobs from around the Net; and here is where credit is given where it is due:</p>\n    <dl>\n        <dt><a href=\"http://djangoproject.com\" target=\"_blank\">Django</a></dt>\n        <dd>MVC framework written in python - drives the back-end of the site. BSD License</dd>\n        <dt><a href=\"http://backbonejs.org\" target=\"_blank\">Backbone</a></dt>\n        <dd>MVC framework for JavaScript - drives the front-end of portions of the site. MIT License</dd>\n        <dt><a href=\"http://goldengridsystem.com\" target=\"_blank\">Golden Grid System</a></dt>\n        <dd>Fluid/flexible grid system for layout in CSS - helps keep the site looking good on a desktop and mobile platforms. MIT License</dd>\n        <dt><a href=\"http://jquery.com\" target=\"_blank\">jQuery</a></dt>\n        <dd>THE JavaScript library - helps with everything. MIT/GPL combined licensing.</dd>\n        <dt><a href=\"http://jqueryui.com\" target=\"_blank\">jQueryUI</a></dt>\n        <dd>UI library for jQuery - provides dialogs, etc. MIT/GPL combined licensing.</dd>\n        <dt><a href=\"http://fgnass.github.com/spin.js/\" target=\"_blank\">Spin.js</a></dt>\n        <dd>Imageless spinner plugin for jQuery - used Angular-side. MIT License</dd>\n        <dt><a href=\"http://onehackoranother.com/projects/jquery/tipsy/\">Tipsy</a></dt>\n        <dd>Tooltip text box plugin for jQuery. MIT License</dd>\n        <dt><a href=\"http://mbostock.github.com/d3/\" target=\"_blank\">d3</a></dt>\n        <dd>Data visualization library for JavaScript - provides graphs, etc. Free license</dd>\n    </dl>\n</div>\n";});
templates['imagesForItem'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n        <div class=\"wrapper galleryThumb\" style=\"height: 200px\">\n            <a class=\"push\" href=\"/image/";
  stack1 = depth0.image_id;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.image_id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\"><img alt=\"";
  stack1 = depth0.attribution;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.attribution", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" src=\"";
  stack1 = depth0.thumbnail;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.thumbnail", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" class=\"thumb";
  stack1 = depth0.rating;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.rating", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" /></a>\n            <br />\n            ";
  stack1 = depth0.caption;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.caption", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\n            ";
  foundHelper = helpers.is_owner;
  stack1 = foundHelper || depth1.is_owner;
  stack2 = helpers['if'];
  tmp1 = self.program(2, program2, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n    ";
  return buffer;}
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <a href=\"/image/";
  stack1 = depth0.id;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "/detach/\">[X]</a>\n            ";
  return buffer;}

  buffer += "<div style=\"clear: left\">\n    <h3>Images</h3>\n    ";
  foundHelper = helpers.images;
  stack1 = foundHelper || depth0.images;
  stack2 = helpers.each;
  tmp1 = self.programWithDepth(program1, data, depth0);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n";
  return buffer;});
templates['imagesToAttach'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n    <div>\n        <form method=\"post\" action=\"/image/";
  stack1 = depth0.pk;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.pk", { hash: {} }); }
  buffer += escapeExpression(stack1) + "/attach/\">\n            <div class=\"ntn\"></div>\n            <input type=\"hidden\" name=\"content_type\" value=\"";
  foundHelper = helpers.contentType;
  stack1 = foundHelper || depth1.contentType;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "...contentType", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" />\n            <input type=\"hidden\" name=\"object_id\" value=\"";
  foundHelper = helpers.objectId;
  stack1 = foundHelper || depth1.objectId;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "...objectId", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" />\n            <p>\n                <input type=\"image\" alt=\"Attach image\" src=\"/media/";
  stack1 = depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.thumbnail);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.fields.thumbnail", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" />\n            </p>\n            <p>\n                <strong>Caption:</strong>\n                <input type=\"text\" name=\"caption\" />\n            </p>\n            <hr />\n        </form>\n    </div>\n";
  return buffer;}

  foundHelper = helpers.images;
  stack1 = foundHelper || depth0.images;
  stack2 = helpers.each;
  tmp1 = self.programWithDepth(program1, data, depth0);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;});
templates['showCharacter'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <p class=\"addLink\"><a href=\"/character/";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.id);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "/edit\">Edit this character</a></p>\n            <p class=\"addLink\"><a id=\"attachImages\" href=\"javascript:void(0)\" onclick=\"App.imagesToAttachView.render();$('#imageBay').dialog(ibDialogOptions);\">Attach image</a></p>\n        ";
  return buffer;}

function program3(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n            <p>\n                <a class=\"push\" href=\"/morph/";
  stack1 = depth0.id;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.name;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</a>\n                ";
  foundHelper = helpers.is_owner;
  stack1 = foundHelper || depth1.is_owner;
  stack2 = helpers['if'];
  tmp1 = self.program(4, program4, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </p>\n        ";
  return buffer;}
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <a href=\"/morph/";
  stack1 = depth0.id;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "/delete\">[X]</a>\n                ";
  return buffer;}

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <p class=\"addLink\"><a href=\"javascript:void(0)\" onclick=\"$('#createMorph').dialog('open')\">+ Add morph</a></p>\n            <div id=\"createMorph\" title=\"Create morph\">\n                <form method=\"post\" action=\"/morph/create/\">\n                    <div class=\"ntn\"></div>\n                    <input id=\"charidfld\" type=\"hidden\" name=\"character\" value=\"";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.id);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" />\n                    <table>\n                        <tr>\n                            <th><label for=\"gender\">Gender:</label></th>\n                            <td>\n                                <select id=\"gender-preselect\">\n                                    <option value=\"\">-- Select --</option>\n                                    <option value=\"Male\">Male</option>\n                                    <option value=\"Female\">Female</option>\n                                    <option value=\"Herm\">Herm</option>\n                                    <option value=\"Other\">Other...</option>\n                                </select>\n                                <input type=\"text\" id=\"gender\" name=\"gender\" style=\"display: none\" />\n                            </td>\n                        </tr>\n                        <tr>\n                            <th><label class=\"tipsify\" title=\"This is just a generic category used for organization; feel free to specify whatever you want in 'species text'!\" for=\"species_category\">Species category</label></th>\n                            <td id=\"sc\"></td>\n                        </tr>\n                        <tr>\n                            <th><label for=\"species_text\">Species:</label></th>\n                            <td><input type=\"text\" name=\"species_text\" /></td>\n                        </tr>\n                        <tr>\n                            <td colspan=\"2\"><input type=\"submit\" value=\"Create morph\" /></td>\n                        </tr>\n                    </table>\n                </form>\n            </div>\n        ";
  return buffer;}

  buffer += "<div id=\"twoway\">\n    <div class=\"wrapper\">\n        <h3>Stats</h3>\n        <p><strong>Character name:</strong> ";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.name);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</p>\n        <p><strong>Character owner:</strong> <a class=\"push\" href=\"/~";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.user);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.user", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">~";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.user);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.user", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</a></p>\n        ";
  foundHelper = helpers.is_owner;
  stack1 = foundHelper || depth0.is_owner;
  stack2 = helpers['if'];
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <p class=\"small\">Permalink: <a href=\"http://c.o-f.co/c/";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.id);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">http://c.o-f.co/c/";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.id);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</a></p>\n    </div>\n    <div class=\"wrapper\">\n        <h3>Morphs</h3>\n        ";
  foundHelper = helpers.morphs;
  stack1 = foundHelper || depth0.morphs;
  stack2 = helpers.each;
  tmp1 = self.programWithDepth(program3, data, depth0);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <hr />\n        ";
  foundHelper = helpers.is_owner;
  stack1 = foundHelper || depth0.is_owner;
  stack2 = helpers['if'];
  tmp1 = self.program(6, program6, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n    <div id=\"imagesForItem\"></div>\n</div>\n<script type=\"text/javascript\">\n    var ibDialogOptions = { \n        width: 300,\n        height: 400,\n        modal: true,\n        autoOpen: true\n    };\n    $(document).ready(function() {\n        $('.ntn').append($('#nnt').html());\n        $('#createMorph').dialog({ \n            autoOpen: false,\n            width: 400,\n            height: 250,\n            modal: true\n        });\n        $('#gender-preselect').change(function(event) {\n            var preselect = this;\n            $('#gender').val($(preselect).val());\n            if ($(preselect).val() == \"Other\") {\n                $('#gender').show();\n            } else {\n                $('#gender').hide();\n            }\n        });\n    });\n</script>\n";
  return buffer;});
templates['showDescription'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, stack3, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <p class=\"addLink\"><a href=\"/description/";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.id);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "/edit\">Edit this description</a></p>\n            <p class=\"addLink\"><a id=\"attachImages\" href=\"javascript:void(0)\" onclick=\"App.imagesToAttachView.render();$('#imageBay').dialog(ibDialogOptions);\">Attach image</a></p>\n        ";
  return buffer;}

function program3(depth0,data) {
  
  
  return "\n            <p class=\"small\">Click to show in full</p>\n        ";}

  buffer += "<div id=\"twoway\">\n    <div class=\"wrapper\">\n        <h3>Stats</h3>\n        <p><strong>Description name:</strong> ";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.name);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</p>\n        <p><strong>Description rating:</strong> ";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.rating_display);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.rating_display", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</p>\n        <p><strong>Description owner:</strong> <a class=\"push\" href=\"/~";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.user);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.user", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.user);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.user", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</a></p>\n        ";
  foundHelper = helpers.is_owner;
  stack1 = foundHelper || depth0.is_owner;
  stack2 = helpers['if'];
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <p class=\"small\">Permalink: <a href=\"http://c.o-f.co/d/";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.id);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">http://c.o-f.co/d/";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.id);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</a></p>\n    </div>\n    <div class=\"wrapper\">\n        <h3>Description</h3>\n        ";
  stack1 = "G";
  foundHelper = helpers.fields;
  stack2 = foundHelper || depth0.fields;
  stack2 = (stack2 === null || stack2 === undefined || stack2 === false ? stack2 : stack2.rating);
  foundHelper = helpers.if_neq;
  stack3 = foundHelper || depth0.if_neq;
  tmp1 = self.program(3, program3, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  if(foundHelper && typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, stack1, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack3, stack2, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <div id=\"descriptiontext\" onclick=\"$(this).toggleClass('showdescription');\" class=\"description";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.rating);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.rating", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">\n            ";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.description);
  foundHelper = helpers.linebreaks;
  stack2 = foundHelper || depth0.linebreaks;
  if(typeof stack2 === functionType) { stack1 = stack2.call(depth0, stack1, { hash: {} }); }
  else if(stack2=== undef) { stack1 = helperMissing.call(depth0, "linebreaks", stack1, { hash: {} }); }
  else { stack1 = stack2; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n    </div>\n    <div id=\"imagesForItem\"></div>\n</div>\n<script type=\"text/javascript\">\n    var ibDialogOptions = { \n        width: 300,\n        height: 400,\n        modal: true,\n        autoOpen: true\n    };\n    //$(document).ready(function() {\n        $('.ntn').append($('#nnt').html());\n    //});\n</script>\n";
  return buffer;});
templates['showImage'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <p class=\"addLink\"><a href=\"/image/";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.id);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "/edit\">Edit this image</a></p>\n            <p class=\"addLink\"><a href=\"/image/";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.id);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "/delete\">Delete this image</a></p>\n        ";
  return buffer;}

  buffer += "<div id=\"twoway\">\n    <div class=\"wrapper\">\n        <a href=\"";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.image);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.image", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\"><img src=\"";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.image);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.image", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" style=\"max-width: 100%\" /></a>\n    </div>\n    <div class=\"wrapper\">\n        <p><strong>Attribution:</strong> ";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.attribution);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.attribution", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</p>\n        <p><strong>Rating:</strong> ";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.rating_display);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.rating_display", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</p>\n        <p><strong>Thumbnail:</strong> <img src=\"";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.thumbnail);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.thumbnail", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" style=\"vertical-align: top\" />\n        ";
  foundHelper = helpers.is_owner;
  stack1 = foundHelper || depth0.is_owner;
  stack2 = helpers['if'];
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <p class=\"small\">Permalink: <a href=\"http://c.o-f.co/i/";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.id);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">http://c.o-f.co/i/";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.id);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</a></p>\n    </div>\n</div>\n";
  return buffer;});
templates['showIndex'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;


  buffer += "<div id=\"twoway\">\n    <div class=\"wrapper\">\n        <h3>We're all characters, here!</h3>\n        <p>Welcome to Characters @ OpenFurry!  This is the place to keep character descriptions and reference images - if you need to show an artist, simply link them to the character, a morph of that character, or a specific description pertaining to that morph.  You can associate images (following a by-me/for-me policy similar to FurAffinity's) with your characters, morphs, and descriptions.</p>\n        <p>Characters is a work in progress, so look forward new features and snazzy looks!</p>\n    </div>\n    <div class=\"wrapper\">\n        <h3>At a glance</h3>\n        <div class=\"wrapper\">\n            <p><strong class=\"tipsify\" title=\"Users of this site\">Users:</strong> ";
  foundHelper = helpers.counts;
  stack1 = foundHelper || depth0.counts;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.users);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "counts.users", { hash: {} }); }
  buffer += escapeExpression(stack1) + " (<a href=\"/users\">list</a>)</p>\n            <p><strong class=\"tipsify\" title=\"Characters are representations of yourself - you may have more than one, and they may have different shapes (morphs)!\">Characters:</strong> ";
  foundHelper = helpers.counts;
  stack1 = foundHelper || depth0.counts;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.characters);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "counts.characters", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</p>\n            <p><strong class=\"tipsify\" title=\"Morphs are the different shapes your characters can take, broken down into gender and species.\">Morphs:</strong> ";
  foundHelper = helpers.counts;
  stack1 = foundHelper || depth0.counts;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.morphs);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "counts.morphs", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</p>\n            <p><strong class=\"tipsify\" title=\"Descriptions are used to show how your character's morph looks - you can have more than one, like &quot;clothed&quot; or &quot;battle-ready&quot;!\">Descriptions:</strong> ";
  foundHelper = helpers.counts;
  stack1 = foundHelper || depth0.counts;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.descriptions);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "counts.descriptions", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</p>\n            <p><strong class=\"tipsify\" title=\"You may upload images, then attach them to characters, morphs, and descriptions as references!\">Images:</strong> ";
  foundHelper = helpers.counts;
  stack1 = foundHelper || depth0.counts;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.images);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "counts.images", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</p>\n            <p><strong class=\"tipsify\" title=\"Locations are where to find your character on the &apos;net - you can attach characters to multiple locations!\">Locations:</strong> ";
  foundHelper = helpers.counts;
  stack1 = foundHelper || depth0.counts;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.locations);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "counts.locations", { hash: {} }); }
  buffer += escapeExpression(stack1) + " (<a href=\"/locations\">list</a>)</p>\n        </div>\n        <div class=\"wrapper\">\n            <p><strong>Most recent user:</strong> <a class=\"push\" href=\"/~";
  foundHelper = helpers.new_user;
  stack1 = foundHelper || depth0.new_user;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "new_user", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">~";
  foundHelper = helpers.new_user;
  stack1 = foundHelper || depth0.new_user;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "new_user", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</a></p>\n            <p><strong>Random morph:</strong> <a class=\"push\" href=\"/~";
  foundHelper = helpers.random_morph;
  stack1 = foundHelper || depth0.random_morph;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.user);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "random_morph.user", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">~";
  foundHelper = helpers.random_morph;
  stack1 = foundHelper || depth0.random_morph;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.user);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "random_morph.user", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</a>\n            / <a class=\"push\" href=\"/character/";
  foundHelper = helpers.random_morph;
  stack1 = foundHelper || depth0.random_morph;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.character);
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.id);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "random_morph.character.id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.random_morph;
  stack1 = foundHelper || depth0.random_morph;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.character);
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.name);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "random_morph.character.name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</a>\n            / <a class=\"push\" href=\"/morph/";
  foundHelper = helpers.random_morph;
  stack1 = foundHelper || depth0.random_morph;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.morph);
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.id);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "random_morph.morph.id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.random_morph;
  stack1 = foundHelper || depth0.random_morph;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.morph);
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.display);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "random_morph.morph.display", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</a></p>\n        </div>\n        <div class=\"wrapper\" style=\"clear: left\">\n            <!--[if !IE]>-->\n            <div id=\"species\"></div>\n            <script type=\"text/javascript\" src=\"/species.js\"></script>\n            <p class=\"small\">Species (morphs)</p>\n            <!--<![endif]-->\n        </div>\n        <div class=\"wrapper\">\n            <!--[if !IE]>-->\n            <div id=\"genders\"></div>\n            <script type=\"text/javascript\" src=\"/genders.js\"></script>\n            <p class=\"small\">Gender (morphs)</p>\n            <!--<![endif]-->\n        </div>\n    </div>\n</div>\n";
  return buffer;});
templates['showMorph'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <p class=\"addLink\"><a href=\"/morph/";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.id);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "/edit\">Edit this morph</a></p>\n            <p class=\"addLink\"><a id=\"attachImages\" href=\"javascript:void(0)\" onclick=\"App.imagesToAttachView.render();$('#imageBay').dialog(ibDialogOptions);\">Attach image</a></p>\n        ";
  return buffer;}

function program3(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n            <p>\n                <a class=\"push\" href=\"/description/";
  stack1 = depth0.id;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.name;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</a>\n                ";
  foundHelper = helpers.is_owner;
  stack1 = foundHelper || depth1.is_owner;
  stack2 = helpers['if'];
  tmp1 = self.program(4, program4, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </p>\n        ";
  return buffer;}
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <a href=\"/description/";
  stack1 = depth0.id;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "/delete\">[X]</a>\n                ";
  return buffer;}

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <p class=\"addLink\"><a href=\"javascript:void(0)\" onclick=\"$('#createDescription').dialog('open')\">+ Add description</a></p>\n            <div id=\"createDescription\" title=\"Create description\">\n                <form method=\"post\" action=\"/description/create/\">\n                    <div class=\"ntn\"></div>\n                    <input id=\"morphidfld\" type=\"hidden\" name=\"morph\" value=\"";
  foundHelper = helpers.morph;
  stack1 = foundHelper || depth0.morph;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.fields);
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.id);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "morph.fields.id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" />\n                    <table>\n                        <tr>\n                            <th><label for=\"name\">Name:</label></th>\n                            <td><input type=\"text\" name=\"name\" /></td>\n                        </tr>\n                        <tr>\n                            <th><label for=\"description\">Description:</label></th>\n                            <td><textarea rows=\"10\" cols=\"50\" name=\"description\"></textarea></td>\n                        </tr>\n                        <tr>\n                            <th><label for=\"rating\">Rating:</label></th>\n                            <td>\n                                <select name=\"rating\">\n                                    <option value=\"G\">General</option>\n                                    <option value=\"M\">Mature</option>\n                                    <option value=\"R\">Adult</option>\n                                </select>\n                            </td>\n                        </tr>\n                        <tr>\n                            <td colspan=\"2\"><input type=\"submit\" value=\"Create description\" /></td>\n                        </tr>\n                    </table>\n                </form>\n            </div>\n        ";
  return buffer;}

  buffer += "<div id=\"twoway\">\n    <div class=\"wrapper\">\n        <h3>Stats</h3>\n        <p><strong>Morph gender:</strong> ";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.gender);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.gender", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</p>\n        <p><strong>Morph species text:</strong> ";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.species_text);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.species_text", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</p>\n        <p><strong>Morph species category:</strong> ";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.species_category);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.species_category", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</p>\n        <p><strong>Morph owner:</strong> <a href=\"/~";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.user);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.user", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.user);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.user", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</a></p>\n        ";
  foundHelper = helpers.is_owner;
  stack1 = foundHelper || depth0.is_owner;
  stack2 = helpers['if'];
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <p class=\"small\">Permalink: <a href=\"http://c.o-f.co/m/";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.id);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">http://c.o-f.co/m/";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.id);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</a></p>\n    </div>\n    <div class=\"wrapper\">\n        <h3>Descriptions</h3>\n        ";
  foundHelper = helpers.descriptions;
  stack1 = foundHelper || depth0.descriptions;
  stack2 = helpers.each;
  tmp1 = self.programWithDepth(program3, data, depth0);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <hr />\n        ";
  foundHelper = helpers.is_owner;
  stack1 = foundHelper || depth0.is_owner;
  stack2 = helpers['if'];
  tmp1 = self.program(6, program6, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n    <div id=\"imagesForItem\"></div>\n</div>\n<script type=\"text/javascript\">\n    var ibDialogOptions = { \n        width: 300,\n        height: 400,\n        modal: true,\n        autoOpen: true\n    };\n    $(document).ready(function() {\n        $('.ntn').append($('#nnt').html());\n        $('#createDescription').dialog({ \n            autoOpen: false,\n            width: 600,\n            height: 400,\n            modal: true\n        });\n    });\n</script>\n";
  return buffer;});
templates['showUser'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "\n                <span><a href=\"/image/create/\">+ Add image</a></span>\n            ";}

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <p class=\"addLink\"><a href=\"/~";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.username);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.username", { hash: {} }); }
  buffer += escapeExpression(stack1) + "/edit/\">Edit info</a></p>\n        ";
  return buffer;}

function program5(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n            <p>\n                <a class=\"push\" href=\"/character/";
  stack1 = depth0.id;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.name;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</a>\n                ";
  foundHelper = helpers.is_owner;
  stack1 = foundHelper || depth1.is_owner;
  stack2 = helpers['if'];
  tmp1 = self.program(6, program6, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </p>\n        ";
  return buffer;}
function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <a href=\"/character/";
  stack1 = depth0.id;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "/delete\">[X]</a>\n                ";
  return buffer;}

function program8(depth0,data) {
  
  
  return "\n            <p class=\"addLink\"><a href=\"javascript:void(0)\" onclick=\"$('#addCharacter').toggle()\">+ Add Character</a></p>\n            <form method=\"post\" action=\"/character/create/\" id=\"addCharacter\" style=\"display: none\">\n                <div class=\"ntn\"></div>\n                <table>\n                    <tr>\n                        <th><label for=\"name\">Character name:</label></th>\n                        <td><input type=\"text\" name=\"name\" /></td>\n                    </tr>\n                    <tr>\n                        <td colspan=\"2\"><input type=\"submit\" value=\"Create character\" /></td>\n                    </tr>\n                </table>\n            </form>\n        ";}

  buffer += "<div id=\"twoway\">\n    <div class=\"wrapper\">\n        <h3>Stats</h3>\n        <p><strong>Username:</strong> ";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.username);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.username", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</p>\n        <p><strong>Name:</strong> ";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.name);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</p>\n        <p><strong>User since:</strong> ";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.date_joined);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.date_joined", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</p>\n        <p><strong>Characters:</strong> ";
  foundHelper = helpers.characters;
  stack1 = foundHelper || depth0.characters;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.length);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "characters.length", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</p>\n        <p><strong>Morphs:</strong> ";
  foundHelper = helpers.morphs;
  stack1 = foundHelper || depth0.morphs;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "morphs", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</p>\n        <p><strong>Descriptions:</strong> ";
  foundHelper = helpers.descriptions;
  stack1 = foundHelper || depth0.descriptions;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "descriptions", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</p>\n        <p>\n            <strong>Images:</strong> ";
  foundHelper = helpers.images;
  stack1 = foundHelper || depth0.images;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "images", { hash: {} }); }
  buffer += escapeExpression(stack1) + " (<a href=\"/~";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.username);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.username", { hash: {} }); }
  buffer += escapeExpression(stack1) + "/images\">list</a>)\n            ";
  foundHelper = helpers.is_owner;
  stack1 = foundHelper || depth0.is_owner;
  stack2 = helpers['if'];
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </p>\n        <p><strong>Locations (as owner):</strong> ";
  foundHelper = helpers.locations;
  stack1 = foundHelper || depth0.locations;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "locations", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</p>\n        <hr />\n        ";
  foundHelper = helpers.is_owner;
  stack1 = foundHelper || depth0.is_owner;
  stack2 = helpers['if'];
  tmp1 = self.program(3, program3, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <p class=\"small\">Permalink: <a href=\"http://c.o-f.co/~";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.username);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.username", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">http://c.o-f.co/~";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.username);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.username", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</a></p>\n    </div>\n    <div class=\"wrapper\">\n        <h3>Characters</h3>\n        ";
  foundHelper = helpers.characters;
  stack1 = foundHelper || depth0.characters;
  stack2 = helpers.each;
  tmp1 = self.programWithDepth(program5, data, depth0);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <hr/>\n        ";
  foundHelper = helpers.is_owner;
  stack1 = foundHelper || depth0.is_owner;
  stack2 = helpers['if'];
  tmp1 = self.program(8, program8, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n</div>\n<div id=\"imagesForItem\"></div>\n";
  return buffer;});
})();