// Famous dependencies
var FamousEngine = require('famous/core/FamousEngine');
var Transitions = require('./Transitions');
var Card = require('./Card');

function Animator() {

	FamousEngine.init();

	this.scene = FamousEngine.createScene('#demoarea');

	this.node1 = this.scene.addChild();
	this.card1 = new Card(this.node1, './images/deathnote.jpg');
	this.card1.el.setProperty('z-index', 100);

	this.node2 = this.scene.addChild();
	this.card2 = new Card(this.node2, './images/shigatsu.jpg');
	this.card2.el.setProperty('z-index', 50);

	this.currentNode = 1;
}

Animator.prototype.animate = function(transition, options) {
	if(this.transition){
		this.destroy();
	}

	if(this.currentNode == 1){
		this.currentNode = 2;
		this.transition = new Transitions(transition, options, this.card1, this.card2);
	} else if(this.currentNode == 2){
		this.currentNode = 1;
		this.transition = new Transitions(transition, options, this.card2, this.card1);
	}
}

Animator.prototype.destroy = function() {
	//destroy function
	this.transition = null;
}

module.exports = Animator;