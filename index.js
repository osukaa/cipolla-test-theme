var hoek = require('hoek');
var marked = require('marked');
var handlebars = require('handlebars');
var fs = require('fs');

var internals = {}

var defaults = {
    template: './templates/index.html'
}

handlebars.registerHelper('md', function (content) {

    return marked(content,{
        highlight: function (code) {
            return require('highlight.js').highlightAuto(code).value;
        }
    });
});

internals.setOptions = function (options) {

    internals.settings = hoek.applyToDefaults(defaults, options);
};

internals.render = function (blueprint, callback) {

    var template = handlebars.compile(internals.settings.template,blueprint);
    return callback(null,template(blueprint));
};

internals.renderToFile = function (blueprint, pathToFile, callback) {

    var template = handlebars.compile(internals.settings.template, blueprint);
    var html = template(blueprint);
    fs.writeFile(pathToFile, html, function (err) {
        return callback(err);
    });
};
