export default class ImageSqueezer {
    
    protected path: string; 
    
    constructor(path: string) {
        this.path = path;
    }

    public helloWorld() {
        return this.path;
    }
}
