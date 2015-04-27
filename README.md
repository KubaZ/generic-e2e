1. Install webdrivercss:
```
npm i --save webdrivercss
```
2. Require webdrivercss and decorate webdriverio with it:
```
var cssRegressionConfig = {
    api: 'http://di-header-e2e.allegro-offer-test.pl-poz.dc5.alledc.net:9000/api/repositories/',
    misMatchTolerance: 0.05,
    screenWidth: [320,480,600,768,1024],
    screenshotRoot: 'MainPage'
};

require('webdrivercss').init(webdriverio, cssRegressionConfig);
```
3. Create simple test that checks if element on page looks the same as before
```
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
```
