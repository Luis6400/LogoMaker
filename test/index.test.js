const { logo, shape, text } = require('../index.js');



describe('logotest', () => {
    var testshape = new shape('Square', 'red');
    var testtext = new text('test', 'blue');
    var testlogo = new logo(testshape, testtext);

    test('testshape', () => {
        expect(testshape.type).toBe('Square');
        expect(testshape.color).toBe('red');
    });

    test('testtext', () => {
        expect(testtext.text).toBe('test');
        expect(testtext.color).toBe('blue');
    }
    );

    test('testlogo', () => {
        expect(testlogo.shape).toBe(testshape);
        expect(testlogo.text).toBe(testtext);
    });
});
