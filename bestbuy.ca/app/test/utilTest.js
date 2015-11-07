/**
 * Developer: Satish Sekar
 * Unit test cases using Jasmine
 */
'use strict';
describe('Service: UtilsSrv', function () {

    var utilsSrv,
        $q;

    beforeEach(function () {
        module('bbyc.commonApp');
        inject(function ($injector) {
            utilsSrv = $injector.get('CommonUtils');
            $q = $injector.get('$q');
        });
    });

    it("utilsSrv is defined", function () {
        expect(utilsSrv).toBeDefined();
    });

    it("ellipsis returns proper string", function () {
        expect(utilsSrv.ellipsis('aa aaaaaa aaa aaaa', 7, false)).toBe('aa aaaaaa ...');
    });

    //make sure ellipsis returns proper string
    it("ellipsis returns proper string", function () {
        expect(utilsSrv.ellipsis('a aa aaa aaaa', 7, true)).toBe('a aa...');
    });
});