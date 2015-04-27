var SpecReporter = require('jasmine-spec-reporter');
var exec = require('child_process').exec;
var webdriverio = require('webdriverio').remote({
    desiredCapabilities: {
        browserName: 'chrome'
    },
    host: 'grid.allegrogroup.com',
    port: 5555
});
var cssRegressionConfig = {
    api: 'http://di-header-e2e.allegro-offer-test.pl-poz.dc5.alledc.net:9000/api/repositories/',
    misMatchTolerance: 0.05,
    screenWidth: [320,480,600,768,1024],
    screenshotRoot: 'MainPage'
};

require('webdrivercss').init(webdriverio, cssRegressionConfig);

jasmine.getEnv().addReporter(new SpecReporter({displaySpecDuration: true}));
jasmine.getEnv().defaultTimeoutInterval = 30000;

describe("Test allegro main page", function () {
    beforeEach(function () {
        this.browser = webdriverio.init();
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

    it("should check if logo looks the same", function() {
        this.browser
            .sync()
            .url('http://allegro.pl')
            .webdrivercss('MainPage', {
                name: 'logo',
                elem: '.logo'
            }, function (error, response) {
                expect(error).toEqual(undefined);
                for (var i = 0; i < cssRegressionConfig.screenWidth.length; i++) {
                    expect(response.logo[i].isWithinMisMatchTolerance).toEqual(
                        true,
                        'Header should look the same at ' + cssRegressionConfig.screenWidth[i] + 'px width'
                    );
                }
            })
            .sync();
    });
});
