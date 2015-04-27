var SpecReporter = require('jasmine-spec-reporter');
var exec = require('child_process').exec;
var webdriverio = require('webdriverio').remote({
    desiredCapabilities: {
        browserName: 'chrome'
    },
    host: 'grid.allegrogroup.com',
    port: 5555
});

jasmine.getEnv().addReporter(new SpecReporter({displaySpecDuration: true}));
jasmine.getEnv().defaultTimeoutInterval = 30000;

describe("Test allegro main page", function () {
    beforeEach(function () {
        this.browser = webdriverio
            .init();
    });

    afterEach(function (done) {
        this.browser.end(done);
    });


    it("should check if logo element exists", function() {
        this.browser
            .url('http://allegro.pl')
            .isExisting('.logo', function(err, res) {
                expect(res).toEqual(true, 'Logo is expected to exist');
            });
    });
});
