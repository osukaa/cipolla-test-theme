var code = require('code');
var expect = code.expect;
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var fs = require('fs');
var sinon = require('sinon');
var TestTheme = require('..');

lab.experiment('theme', function () {

    lab.test('should be an instance', function (done) {

        var theme = new TestTheme();
        expect(theme).to.be.an.instanceof(TestTheme);
        done();
    });

    lab.test('should return an instance', function (done) {

        var theme = TestTheme({ something: 'something' });
        expect(theme).to.be.an.instanceof(TestTheme);
        done();
    });

    lab.test('should be able to set options', function (done) {
        
        var theme = new TestTheme({});
        theme.setOptions({ something: 'something' });
        done();
    });

    lab.test('set empty options', function (done) {

        var theme = new TestTheme({ something: 'something'});
        theme.setOptions();
        done();
    });

    lab.test('should return error when template is not found', function (done) {

        var callback = sinon.spy();
        var theme = new TestTheme();
        theme.setOptions({ template: './templates/no.html'});
        theme.render('#wut', function (err, html) {

            expect(html).to.not.exist();
            expect(err).to.exist();
            done();
        });
    });

    lab.test('it should render a blueprint', function (done) {

        var blueprint = {
            users: [ {
                person: {
                    firstName: "Garry",
                    lastName: "Finch"
                },
                jobTitle: "Front End Technical Lead",
                twitter: "gazraa",
                mark: "**testing**",
                code: "```javascript var x = 1; ```"
            }, {
                person: {
                    firstName: "Garry",
                    lastName: "Finch"
                },
                jobTitle: "Photographer",
                twitter: "photobasics",
                mark: "**testing**",
                code: "```javascript var x = 1; ```"
            }, {
                person: {
                    firstName: "Garry",
                    lastName: "Finch"
                },
                jobTitle: "LEGO Geek",
                twitter: "minifigures",
                mark: "**testing**",
                code: "```javascript var x = 1; ```"
            } ]
        };
        
        var theme = new TestTheme();
        theme.render(blueprint, function (err, html) {

            expect(err).to.not.exist();
            expect(html).to.exist();
            expect(html).to.match(/<html>/);
            done();
        });
    });

    lab.test('should not output file if template not found', function (done) {

        var blueprint = {
            users: [{ person: { firstName: 'yo' } }]
        };
        var theme = new TestTheme();
        theme.setOptions({ template: './templates/no.html'});
        theme.renderToFile(blueprint, __dirname + '/file/test.html', function (err) {

            expect(err).to.exist();
            done();
        });
    });

    lab.test('should not output file if not available to write there', function (done) {

        var blueprint = {
            users: [ {
                person: {
                    firstName: "Garry",
                    lastName: "Finch"
                },
                jobTitle: "Front End Technical Lead",
                twitter: "gazraa",
                mark: "**testing**",
                code: "```javascript var x = 1; ```"
            }, {
                person: {
                    firstName: "Garry",
                    lastName: "Finch"
                },
                jobTitle: "Photographer",
                twitter: "photobasics",
                mark: "**testing**",
                code: "```javascript var x = 1; ```"
            }, {
                person: {
                    firstName: "Garry",
                    lastName: "Finch"
                },
                jobTitle: "LEGO Geek",
                twitter: "minifigures",
                mark: "**testing**",
                code: "```javascript var x = 1; ```"
            } ]
        };
        var theme = new TestTheme();
        theme.renderToFile(blueprint, __dirname + '/file/not/exists.html', function (err) {

            expect(err).to.exist();
            done();
        });
    });

    lab.test('it should ouput a file', function (done) {

        var blueprint = {
            users: [ {
                person: {
                    firstName: "Garry",
                    lastName: "Finch"
                },
                jobTitle: "Front End Technical Lead",
                twitter: "gazraa",
                mark: "**testing**",
                code: "```javascript var x = 1; ```"
            }, {
                person: {
                    firstName: "Garry",
                    lastName: "Finch"
                },
                jobTitle: "Photographer",
                twitter: "photobasics",
                mark: "**testing**",
                code: "```javascript var x = 1; ```"
            }, {
                person: {
                    firstName: "Garry",
                    lastName: "Finch"
                },
                jobTitle: "LEGO Geek",
                twitter: "minifigures",
                mark: "**testing**",
                code: "```javascript var x = 1; ```"
            } ]
        };
        var theme = new TestTheme();
        theme.renderToFile(blueprint, __dirname + '/file/test.html', function (err) {

            expect(err).to.not.exist();
            expect(fs.readFileSync(__dirname + '/file/test.html')).to.match(/<html>/);
            done();
        });
    });
});
