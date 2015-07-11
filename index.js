var hoek = require('hoek');
var marked = require('marked');
var handlebars = require('handlebars');
var fs = require('fs');

var internals = {}

var defaults = {
    template: './templates/index.html'
}

marked.setOptions({
    highlight: function (code) {

        return require('highlight.js').highlightAuto(code).value;
  }
});

handlebars.registerHelper('md', function (content) {

    return marked(content);
});

module.exports = internals.TestTheme = function (options) {

    if (!(this instanceof internals.TestTheme)) {
           return new internals.TestTheme(options);
    }
    
    options = options || {};
    this._settings = hoek.applyToDefaults(defaults, options);
}

internals.TestTheme.prototype.setOptions = function (options) {

    options = options || {};
    this._settings = hoek.applyToDefaults(this._settings, options);
};

internals.TestTheme.prototype.render = function (blueprint, callback) {
    
    fs.readFile(this._settings.template, { encoding: 'utf8'}, function (err, htmlTemplate){

        if (err) {
            return callback(err);
        }
        var template = handlebars.compile(htmlTemplate);
        var html = template(blueprint);
        return callback(null,html);
    })
};

internals.TestTheme.prototype.renderToFile = function (blueprint, pathToFile, callback) {

    fs.readFile(this._settings.template, {encoding: 'utf8'}, function (err, htmlTemplate) {

        if (err) {
            return callback(err);
        }
        var template = handlebars.compile(htmlTemplate, blueprint);
        var html = template(blueprint);
        fs.writeFile(pathToFile, html, function (err) {

            if (err) {
                return callback(err);
            }
            return callback(null);
        });
    });
};
