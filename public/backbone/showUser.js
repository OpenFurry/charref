(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['showUser'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <li><a href=\"#character/";
  stack1 = depth0.id;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.name;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</a></li>\n            ";
  return buffer;}

  buffer += "            <h2>User ";
  foundHelper = helpers.fields;
  stack1 = foundHelper || depth0.fields;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.username);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fields.username", { hash: {} }); }
  buffer += escapeExpression(stack1) + "!</h2>\n            <ul>\n            ";
  foundHelper = helpers.characters;
  stack1 = foundHelper || depth0.characters;
  stack2 = helpers.each;
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </ul>\n";
  return buffer;});
})();