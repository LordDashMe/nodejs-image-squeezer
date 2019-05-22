import ImageSqueezer from '../src/ImageSqueezer';

it('should say hello world', () => {
    var IS = new ImageSqueezer('Hello World!');
    expect(IS.helloWorld()).toBe('Hello World!');
});
