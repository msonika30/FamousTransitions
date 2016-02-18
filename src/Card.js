var DOMElement = require('famous/dom-renderables/DOMElement');

var card = 1;

function Card (node, source) {
	this.node = node;
	this.node.setAlign(0.5, 0.5, 0.5)
            .setMountPoint(0.5, 0.5, 0.5)
            .setOrigin(0.5, 0.5, 0.5)
            .setSizeMode('absolute', 'absolute', 'absolute')
            .setAbsoluteSize(500,500)
            .setScale(1, 1);
    this.id = 'demo-image-'+card;
	this.el = new DOMElement(this.node, { tagName: 'div', id: this.id, classes: ['demo-images', 'image'+card] });
	this.el.setProperty('background-image','url('+ source +')');
	this.source = source;
	card++;
}

module.exports = Card;