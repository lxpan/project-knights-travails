class Node {
    constructor(position) {
        this.position = position; // [x, y]
        this.parent = null;
        this.children = [];
    }

    setParent(parent) {
        this.parent = parent;
      }
    
    addChild(child) {
        this.children.push(child);
    }
}

