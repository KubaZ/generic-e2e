1. Install Jasmine and Webdriverio:
```
npm i --save jasmine-node jasmine-spec-reporter webdriverio
```
2. Create spec runner file:
- Require Jasmin and Webdriverio
```
var SpecReporter = require('jasmine-spec-reporter');
var exec = require('child_process').exec;
var webdriverio = require('webdriverio').remote({
    desiredCapabilities: {
        browserName: 'chrome'
    },
    host: 'grid.allegrogroup.com',
    port: 5555
});
```
- Set up Jasmine
```
jasmine.getEnv().addReporter(new SpecReporter({displaySpecDuration: true}));
jasmine.getEnv().defaultTimeoutInterval = 30000;
```
- Create simple test suite
```
describe("Test allegro main page", function () {
    beforeEach(function () {
        this.browser = webdriverio
            .init();
    });

    afterEach(function (done) {
        this.browser.end(done);
    });
});
```

- Create simple test that checks if element on page exists
```
it("should check if logo element exists", function() {
    this.browser
        .url('http://allegro.pl')
        .isExisting('.logo', function(err, res) {
            expect(res).toEqual(true, 'Logo is expected to exist');
        });
});
```
