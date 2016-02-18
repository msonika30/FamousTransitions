var FamousEngine = require('famous/core/FamousEngine');
var Clock = require('famous/core/Clock');
var DOMElement = require('famous/dom-renderables/DOMElement');
var Transitionable = require('famous/transitions/Transitionable');

function Transitions(name, options, currentCard, nextCard)
{
	this.transition = null;
    this.children = [];
    this.currentActiveChildren = [];
    this.oldNumber = -1;
    this.selectionElems = [];
    this.currentCard = currentCard;
    this.nextCard = nextCard;
    this.height = options.height;
    this.width = options.width;

	this.transitions = 
	[
		{
			name: 'Bars',
			type: 'Crossover',
			numberOfChildEls: 5,
			transitionDelay: -330,
			width: [],
			height: [],
			numberOfRows: 1,
			numberOfColumns: 5,
			startTime: 0,
			randomSelection: false,
			totalDuration: 0,
			childElsPositioning: 'SequentialX',
			childTransitions: 
			[
				{
					properties: ['opacity','y'],
					transitionables: [],
					durations: [],
					options: null,
					transitionablesfunc: []
				}
			]
		},
		{
			name: 'Dissolve',
			type: 'Crossover',
			numberOfChildEls: 1,
			transitionDelay: 0,
			width: [],
			height: [],
			numberOfRows: 1,
			numberOfColumns: 1,
			startTime: 0,
			randomSelection: false,
			totalDuration: 0,
			childElsPositioning: 'SequentialX',
			childTransitions:
			[
				{
					properties: ['opacity'],
					transitionables: [],
					durations: [],
					options: null,
					transitionablesfunc: []
				}
			]
		},
		{
			name: 'Popup',
			type: 'Crossover',
			numberOfChildEls: 1,
			transitionDelay: 0,
			width: [],
			height: [],
			numberOfRows: 1,
			numberOfColumns: 1,
			startTime: 0,
			randomSelection: false,
			totalDuration: 0,
			childElsPositioning: 'SequentialX',
			childTransitions:
			[
				{
					properties: ['opacity'],
					transitionables: [],
					durations: [],
					options: null,
					transitionablesfunc: []
				}
			],
			secondElTransition:
			{
				properties: ['opacity','scale'],
				transitionables: [],
				durations: [],
				options: null,
				transitionablesfunc: []
			}
		},
		{
			name: 'Blocks',
			type: 'Crossover',
			numberOfChildEls: 25,
			transitionDelay: -340,
			width: [],
			height: [],
			numberOfRows: 5,
			numberOfColumns: 5,
			startTime: 0,
			randomSelection: false,
			totalDuration: 0,
			childElsPositioning: 'SequentialX',
			childTransitions:
			[
				{
					properties: ['scale','opacity'],
					transitionables: [],
					durations: [],
					options: null,
					transitionablesfunc: []
				}
			]
		},
		{
			name: 'Zip',
			type: 'Crossover',
			numberOfChildEls: 5,
			transitionDelay: -330,
			width: [],
			height: [],
			numberOfRows: 1,
			numberOfColumns: 5,
			startTime: 0,
			randomSelection: false,
			totalDuration: 0,
			childElsPositioning: 'SequentialX',
			childTransitions: 
			[
				{
					properties: ['opacity','y'],
					transitionables: [],
					durations: [],
					options: null,
					transitionablesfunc: []
				},
				{
					properties: ['opacity','y'],
					transitionables: [],
					durations: [],
					options: null,
					transitionablesfunc: []
				}
			]
		},
		{
			name: 'Flip',
			type: 'Crossover-3d',
			numberOfChildEls: 1,
			transitionDelay: 0,
			width: [],
			height: [],
			numberOfRows: 1,
			numberOfColumns: 1,
			startTime: 0,
			randomSelection: false,
			totalDuration: 0,
			childElsPositioning: 'SequentialX',
			childTransitions:
			[
				{
					properties: ['rotatey'],
					transitionables: [],
					durations: [],
					options: null,
					transitionablesfunc: []
				}
			]
		},
		{
			name: 'Blinds3d',
			type: 'Crossover-3d',
			numberOfChildEls: 5,
			transitionDelay: -700,
			width: [],
			height: [],
			numberOfRows: 1,
			numberOfColumns: 5,
			startTime: 0,
			randomSelection: false,
			totalDuration: 0,
			childElsPositioning: 'SequentialX',
			childTransitions:
			[
				{
					properties: ['rotatey'],
					transitionables: [],
					durations: [],
					options: null,
					transitionablesfunc: []
				}
			]
		},
		{
			name: 'Tiles3d',
			type: 'Crossover-3d',
			numberOfChildEls: 25,
			transitionDelay: -440,
			width: [],
			height: [],
			numberOfRows: 5,
			numberOfColumns: 5,
			startTime: 0,
			randomSelection: false,
			totalDuration: 0,
			childElsPositioning: 'SequentialX',
			childTransitions:
			[
				{
					properties: ['rotatey'],
					transitionables: [],
					durations: [],
					options: null,
					transitionablesfunc: []
				}
			]
		}
	]

	this.create(name, options, 0);

	this.currentCard.el.setProperty('background-image','');
	if(this.transition.type === "Crossover")
		this.nextCard.el.setProperty('background-image','url('+ this.nextCard.source +')');
	else if(this.transition.type === "Crossover-3d")
		this.nextCard.el.setProperty('background-image','');
	this.currentCard.el.setProperty('z-index', 100);
	this.nextCard.el.setProperty('z-index', 50);

	FamousEngine.requestUpdate(this);
}

Transitions.prototype.onUpdate = function(time){
	if(this.transition === null){
		return;
	}
	this.seek(time);
	FamousEngine.requestUpdateOnNextTick(this);
}

Transitions.prototype.create = function(name,options)
{
	if(name == 'Bars'){
		this.transition = createBarsTransition(this, options);
	} else if(name == 'Dissolve'){
		this.transition = createDissolveTransition(this, options);
	} else if(name == 'Popup'){
		this.transition = createPopupTransition(this, options);
	} else if(name == 'Blocks'){
		this.transition = createBlocksTransition(this, options);
	} else if(name == 'Zip'){
		this.transition = createZipTransition(this, options);
	} else if(name == 'Flip'){
		this.transition = createFlipTransition(this, options);
	} else if(name == 'Blinds3d'){
		this.transition = createBlinds3dTransition(this, options);
	} else if(name == 'Tiles3d'){
		this.transition = createTiles3dTransition(this, options);
	}

	for(var i=0; i<this.transition.numberOfChildEls; i++){
        this.selectionElems.push(i);
        var child = this.currentCard.node.addChild();
        this.children.push(child);
        var positionY = Math.floor(i/this.transition.numberOfColumns);
        var positionX = i%this.transition.numberOfColumns;
        
        var childElWidth = 0;
        if(this.transition.width.length == 1)
            childElWidth = this.transition.width[0];
        else if(this.transition.width.length > 1)
            childElWidth = this.transition.width[i];
        var childElHeight = 0;
        if(this.transition.height.length == 1)
            childElHeight = this.transition.height[0];
        else if(this.transition.height.length > 1)
            childElHeight = this.transition.height[i];
        
        if(this.transition.type == "Crossover"){
            if(this.transition.childElsPositioning == "SequentialX"){
                new DOMElement(child, { tagName: 'div' })
                    .setProperty('background-image', 'url('+ this.currentCard.source +')')
                    .setProperty('background-repeat', 'no-repeat')
                    .setProperty('background-size', this.width+'px '+this.height+'px')
                    .setProperty('left',(childElWidth*positionX)+'px')
                    .setProperty('top',(childElHeight*positionY)+'px')
                    .setProperty('background-position',(-1)*(childElWidth*positionX)+'px '+(-1)*(childElHeight*positionY)+'px')
                    .setProperty('z-index', 100);
            } else if(transition.childElsPositioning == "Custom"){
                new DOMElement(child, { tagName: 'div' })
                    .setProperty('background-image', 'url(http://www.joelambert.co.uk/flux/img/avatar.jpg)')
                    .setProperty('background-repeat', 'no-repeat')
                    .setProperty('background-size',this.width+'px '+this.height+'px')
                    .setProperty('left',(this.transition.childElsPositions[i].left)+'px')
                    .setProperty('top',(this.transition.childElsPositions[i].top)+'px')
                    .setProperty('background-position','0px 0px')
                    .setProperty('z-index', 100);
            }
            
            child
            .setSizeMode('absolute', 'absolute', 'absolute')
            .setAbsoluteSize(childElWidth, childElHeight)
            .setAlign(0, 0)
            .setMountPoint(0, 0)
            .setOrigin(0.5, 0.5);
        }else if(this.transition.type == "Crossover-3d"){
            if(this.transition.childElsPositioning == "SequentialX"){
                new DOMElement(child, { tagName: 'div' })
                    .setProperty('background-size',this.width+'px '+this.height+'px')
                    .setProperty('left',(childElWidth*positionX)+'px')
                    .setProperty('top',(childElHeight*positionY)+'px');
            } else if(this.transition.childElsPositioning == "Custom"){
                new DOMElement(child, { tagName: 'div' })
                    .setProperty('background-size',this.width+'px '+this.height+'px')
                    .setProperty('left',(this.transition.childElsPositions[i].left)+'px')
                    .setProperty('top',(this.transition.childElsPositions[i].top)+'px');
            }

            child
            .setSizeMode('absolute', 'absolute', 'absolute')
            .setAbsoluteSize(childElWidth, childElHeight)
            .setAlign(0, 0)
            .setMountPoint(0, 0)
            .setOrigin(0.5, 0.5);

            if(this.transition.childElsRotations)
                child.setRotation(0,this.transition.childElsRotations[i]);

            var front = child.addChild();

            if(this.transition.childElsPositioning == "SequentialX"){
                new DOMElement(front, { tagName: 'div' })
                    .setProperty('background-image', 'url('+ this.currentCard.source +')')
                    .setProperty('background-repeat', 'no-repeat')
                    .setProperty('background-size',this.width+'px '+this.height+'px')
                    .setProperty('left','0px')
                    .setProperty('top','0px')
                    .setProperty('background-position',(-1)*(childElWidth*positionX+1.5)+'px '+(-1)*(childElHeight*positionY)+'px')
                    .setProperty('backface-visibility','hidden')
                    .setProperty('z-index',2);
            } else if(this.transition.childElsPositioning == "Custom"){
                new DOMElement(front, { tagName: 'div' })
                    .setProperty('background-image', 'url('+ this.currentCard.source +')')
                    .setProperty('background-repeat', 'no-repeat')
                    .setProperty('background-size',this.width+'px '+this.height+'px')
                    .setProperty('left','0px')
                    .setProperty('top','0px')
                    .setProperty('background-position',(-1)*(this.transition.childElsPositions[i].left+1.5)+'px '+(-1)*(this.transition.childElsPositions[i].top)+'px')
                    .setProperty('backface-visibility','hidden')
                    .setProperty('z-index',2);
            }

            front
            .setSizeMode('absolute', 'absolute', 'absolute')
            .setAbsoluteSize(childElWidth, childElHeight)
            .setAlign(0, 0)
            .setMountPoint(0, 0)
            .setOrigin(0.5, 0.5);

            var back = child.addChild();

            if(this.transition.childElsPositioning == "SequentialX"){
                new DOMElement(back, { tagName: 'div' })
                    .setProperty('background-image', 'url('+ this.nextCard.source +')')
                    .setProperty('background-repeat', 'no-repeat')
                    .setProperty('background-size',this.width+'px '+this.height+'px')
                    .setProperty('left','0px')
                    .setProperty('top','0px')
                    .setProperty('background-position',(-1)*(childElWidth*positionX)+'px '+(-1)*(childElHeight*positionY)+'px')
                    .setProperty('backface-visibility','hidden');
            } else if(this.transition.childElsPositioning == "Custom"){
                new DOMElement(back, { tagName: 'div' })
                    .setProperty('background-image', 'url('+ this.nextCard.source +')')
                    .setProperty('background-repeat', 'no-repeat')
                    .setProperty('background-size',this.width+'px '+this.height+'px')
                    .setProperty('left','0px')
                    .setProperty('top','0px')
                    .setProperty('background-position',(-1)*(this.transition.childElsPositions[i].left)+'px '+(-1)*(this.transition.childElsPositions[i].top)+'px')
                    .setProperty('backface-visibility','hidden');
            }

            back
            .setSizeMode('absolute', 'absolute', 'absolute')
            .setAbsoluteSize(childElWidth, childElHeight)
            .setAlign(0, 0)
            .setMountPoint(0, 0)
            .setOrigin(0.5, 0.5)
            .setRotation(0,Math.PI);
        }
    }
}


Transitions.prototype.destroy = function() {
    if(this.transition.type === "Crossover-3d")
		this.nextCard.el.setProperty('background-image','url('+ this.nextCard.source +')');
    
    var node = document.getElementById(this.currentCard.id);
 	while (node.hasChildNodes()) {
	    node.removeChild(node.lastChild);
	}
	
    this.transition = null;
}

Transitions.prototype.seek = function(time) {
	if(this.currentActiveChildren.length == 0){
        if(this.transition.secondElTransition){
            this.transition.secondElTransition.transitionables = [];
            for(var f in this.transition.secondElTransition.transitionablesfunc){
                var func = this.transition.secondElTransition.transitionablesfunc[f];
                this.transition.secondElTransition.transitionables.push(func(this.transition.secondElTransition.options));
            }
        }
    }
    var interval = this.transition.totalDuration + this.transition.transitionDelay;
    if(interval != 0){
        var number = Math.floor((time-this.transition.startTime)/interval);
        if(this.oldNumber != number && number < this.transition.numberOfChildEls && number >= 0){
            var num = number;
            if(this.transition.randomSelection){
                var randomnum = Math.floor(Math.random() * this.selectionElems.length);
                num = this.selectionElems.splice(randomnum,1);
            }
            var child = {};
            child.child = this.children.slice(num,num+1)[0];
            child.transitions = [];
            var childTransitionNumber = num%this.transition.childTransitions.length;
            for(var t in this.transition.childTransitions[childTransitionNumber].transitionables){
                child.transitions.push(this.transition.childTransitions[childTransitionNumber].transitionablesfunc[t](this.transition.childTransitions[childTransitionNumber].options));
            }
            child.properties = [];
            for(var p in this.transition.childTransitions[childTransitionNumber].properties){
                child.properties.push(this.transition.childTransitions[childTransitionNumber].properties[p])
            }
            this.currentActiveChildren.push(child);
            this.oldNumber = number;
        }
    } else if(interval == 0 && this.currentActiveChildren.length == 0){
        for(var c in this.children){
            var child = {};
            child.child = this.children[c];
            child.transitions = [];
            var childTransitionNumber = c%this.transition.childTransitions.length;
            for(var t in this.transition.childTransitions[childTransitionNumber].transitionables){
                child.transitions.push(this.transition.childTransitions[childTransitionNumber].transitionablesfunc[t](this.transition.childTransitions[childTransitionNumber].options));
            }
            child.properties = [];
            for(var p in this.transition.childTransitions[childTransitionNumber].properties){
                child.properties.push(this.transition.childTransitions[childTransitionNumber].properties[p])
            }
            this.currentActiveChildren.push(child);
        }
    }
    for(var cac in this.currentActiveChildren){
        var node = this.currentActiveChildren[cac].child;
        var transitionables = this.currentActiveChildren[cac].transitions;
        var properties = this.currentActiveChildren[cac].properties;
        for(var p in properties){
            if(properties[p] == 'opacity'){
                var opvalue = transitionables[p].get(time);
                if(cac < this.transition.numberOfChildEls)
                    node.setOpacity(opvalue);
            } else if(properties[p] == 'y'){
                var yvalue = transitionables[p].get(time);
                if(cac < this.transition.numberOfChildEls){
                    var x = node.getPosition()[0]; 
                    node.setPosition(x,yvalue);
                }
            } else if(properties[p] == 'rotatex'){
                var xvalue = transitionables[p].get(time);
                if(cac < this.transition.numberOfChildEls){
                    node.setRotation(xvalue);
                }
            } else if(properties[p] == 'rotatey'){
                var yvalue = transitionables[p].get(time);
                if(cac < this.transition.numberOfChildEls){
                    node.setRotation(0,yvalue);
                }
            } else if(properties[p] == 'scale'){
                var scalevalue = transitionables[p].get(time);
                if(cac < this.transition.numberOfChildEls){
                    node.setScale(scalevalue, scalevalue);
                }
            } else if(properties[p] == 'zindex'){
                var zivalue = transitionables[p].get(time);
                if(cac < this.transition.numberOfChildEls){
                    node._components[2].setProperty('z-index', zivalue);
                }
            }
        }    
    }
    if(this.transition.secondElTransition && this.nextCard){
        var properties = this.transition.secondElTransition.properties;
        var transitionables = this.transition.secondElTransition.transitionables;
        for(var p in properties){
            if(properties[p] == 'opacity'){
                var opvalue = transitionables[p].get(time);
                this.nextCard.node.setOpacity(opvalue);
            } else if(properties[p] == 'scale'){
                var scalevalue = transitionables[p].get(time);
                this.nextCard.node.setScale(scalevalue, scalevalue);
            }
        }
    }
    if(time - this.transition.startTime >= (this.transition.numberOfChildEls-1)*(this.transition.totalDuration + this.transition.transitionDelay)+this.transition.totalDuration){
		this.destroy();
	}
}

var createBarsTransition = function(_this, options) {
	var transition = {};
	var ortransition = _this.transitions.filter(function( obj ) {
	  return obj.name == 'Bars';
	});
	transition = JSON.parse(JSON.stringify(ortransition))[0];
	transition['startTime'] = FamousEngine._clock.getTime();
	var opacityFunc = function(options){
		var opTransition = new Transitionable();
		opTransition.from(1).to(0, 'linear', options.fadeOutDuration);
		return opTransition;
	}
	var yFunc = function(options){
		var yTransition = new Transitionable();
		yTransition.from(0).to(options.yPosition, 'linear', options.fadeOutDuration);
		return yTransition;
	}
	var opacityTransition = opacityFunc(options);
	var yTransition = yFunc(options);
	transition.childTransitions[0].transitionables.push(opacityTransition);
	transition.childTransitions[0].transitionables.push(yTransition);
	transition.childTransitions[0].transitionablesfunc.push(opacityFunc);
	transition.childTransitions[0].transitionablesfunc.push(yFunc);
	transition.childTransitions[0].durations.push(options.fadeOutDuration);
	transition.childTransitions[0].durations.push(options.fadeOutDuration);
	transition.childTransitions[0].options = options;
	transition.totalDuration = options.fadeOutDuration;
	transition.height.push(Math.ceil(options.height/transition.numberOfRows));
	transition.width.push(Math.ceil(options.width/transition.numberOfColumns));
	return transition;
}

var createDissolveTransition = function(_this, options) {
	var transition = {};
	var ortransition = _this.transitions.filter(function( obj ) {
	  return obj.name == 'Dissolve';
	});
	transition = JSON.parse(JSON.stringify(ortransition))[0];
	transition['startTime'] = FamousEngine._clock.getTime();
	var opacityFunc = function(options){
		var opTransition = new Transitionable();
		opTransition.from(1).to(0, 'linear', options.fadeOutDuration);
		return opTransition;
	}
	var opacityTransition = opacityFunc(options);
	transition.childTransitions[0].transitionables.push(opacityTransition);
	transition.childTransitions[0].transitionablesfunc.push(opacityFunc);
	transition.childTransitions[0].durations.push(options.fadeOutDuration);
	transition.childTransitions[0].options = options;
	transition.totalDuration = options.fadeOutDuration;
	transition.height.push(Math.ceil(options.height/transition.numberOfRows));
	transition.width.push(Math.ceil(options.width/transition.numberOfColumns));
	return transition;
}

var createPopupTransition = function(_this, options) {
	var transition = {};
	var ortransition = _this.transitions.filter(function( obj ) {
	  return obj.name == 'Popup';
	});
	transition = JSON.parse(JSON.stringify(ortransition))[0];
	transition['startTime'] = FamousEngine._clock.getTime();
	var opacityFunc = function(options){
		var opTransition = new Transitionable();
		opTransition.from(1).to(0, 'linear', options.fadeOutDuration);
		return opTransition;
	}
	var secondElOpacityFunc = function(options){
		var opTransition = new Transitionable();
		opTransition.from(0).to(1, 'linear', options.fadeOutDuration);
		return opTransition;	
	}
	var secondElScaleFunc = function(options){
		var scaleTransition = new Transitionable();
		scaleTransition.from(0).to(1.03, 'linear', options.fadeOutDuration);
		return scaleTransition;	
	}
	var opacityTransition = opacityFunc(options);
	var secondElOpacityTransition = secondElOpacityFunc(options);
	var secondElScaleTransition = secondElScaleFunc(options);
	transition.childTransitions[0].transitionables.push(opacityTransition);
	transition.childTransitions[0].transitionablesfunc.push(opacityFunc);
	transition.childTransitions[0].durations.push(options.fadeOutDuration);
	transition.childTransitions[0].options = options;
	transition.secondElTransition.transitionables.push(secondElOpacityTransition);
	transition.secondElTransition.transitionablesfunc.push(secondElOpacityFunc);
	transition.secondElTransition.durations.push(options.fadeOutDuration);
	transition.secondElTransition.transitionables.push(secondElScaleTransition);
	transition.secondElTransition.transitionablesfunc.push(secondElScaleFunc);
	transition.secondElTransition.durations.push(options.fadeOutDuration);
	transition.secondElTransition.options = options;
	transition.totalDuration = options.fadeOutDuration;
	transition.height.push(Math.ceil(options.height/transition.numberOfRows));
	transition.width.push(Math.ceil(options.width/transition.numberOfColumns));
	return transition;
}

var createBlocksTransition = function(_this, options) {
	var transition = {};
	var ortransition = _this.transitions.filter(function( obj ) {
	  return obj.name == 'Blocks';
	});
	transition = JSON.parse(JSON.stringify(ortransition))[0];
	transition['startTime'] = FamousEngine._clock.getTime();
	var scaleFunc = function(options){
		var scaleTransition = new Transitionable();
		scaleTransition.from(1).to(options.scaleTo, 'linear', options.scaleDuration);
		return scaleTransition;
	}
	var opacityFunc = function(options){
		var opTransition = new Transitionable();
		opTransition.from(1).delay(options.scaleDuration).to(0, 'linear', options.fadeOutDuration);
		return opTransition;
	}

	var scaleTransition = scaleFunc(options);
	var opacityTransition = opacityFunc(options);
	transition.childTransitions[0].transitionables.push(scaleTransition);
	transition.childTransitions[0].transitionables.push(opacityTransition);
	transition.childTransitions[0].transitionablesfunc.push(scaleFunc);
	transition.childTransitions[0].transitionablesfunc.push(opacityFunc);
	transition.childTransitions[0].durations.push(options.scaleDuration);
	transition.childTransitions[0].durations.push(options.fadeOutDuration);
	transition.childTransitions[0].options = options;
	transition.totalDuration = options.fadeOutDuration + options.scaleDuration;
	transition.randomSelection = options.randomSelection;
	transition.height.push(Math.ceil(options.height/transition.numberOfRows));
	transition.width.push(Math.ceil(options.width/transition.numberOfColumns));
	return transition;
}

var createZipTransition = function(_this, options) {
	var transition = {};
	var ortransition = _this.transitions.filter(function( obj ) {
	  return obj.name == 'Zip';
	});
	transition = JSON.parse(JSON.stringify(ortransition))[0];
	transition['startTime'] = FamousEngine._clock.getTime();
	var opacityFunc = function(options){
		var opTransition = new Transitionable();
		opTransition.from(1).to(0, 'linear', options.fadeOutDuration);
		return opTransition;
	}
	var yFunc0 = function(options){
		var yTransition = new Transitionable();
		yTransition.from(0).to(options.yPosition, 'linear', options.fadeOutDuration);
		return yTransition;
	}
	var yFunc1 = function(options){
		var yTransition = new Transitionable();
		yTransition.from(0).to(-1*options.yPosition, 'linear', options.fadeOutDuration);
		return yTransition;
	}
	var opacityTransition = opacityFunc(options);
	var yTransition0 = yFunc0(options);
	var yTransition1 = yFunc1(options);
	transition.childTransitions[0].transitionables.push(opacityTransition);
	transition.childTransitions[0].transitionables.push(yTransition0);
	transition.childTransitions[0].transitionablesfunc.push(opacityFunc);
	transition.childTransitions[0].transitionablesfunc.push(yFunc0);
	transition.childTransitions[0].durations.push(options.fadeOutDuration);
	transition.childTransitions[0].durations.push(options.fadeOutDuration);
	transition.childTransitions[0].options = options;
	transition.childTransitions[1].transitionables.push(opacityTransition);
	transition.childTransitions[1].transitionables.push(yTransition1);
	transition.childTransitions[1].transitionablesfunc.push(opacityFunc);
	transition.childTransitions[1].transitionablesfunc.push(yFunc1);
	transition.childTransitions[1].durations.push(options.fadeOutDuration);
	transition.childTransitions[1].durations.push(options.fadeOutDuration);
	transition.childTransitions[1].options = options;
	transition.totalDuration = options.fadeOutDuration;
	transition.height.push(Math.ceil(options.height/transition.numberOfRows));
	transition.width.push(Math.ceil(options.width/transition.numberOfColumns));
	return transition;
}

var createFlipTransition = function(_this, options) {
	var transition = {};
	var ortransition = _this.transitions.filter(function( obj ) {
	  return obj.name == 'Flip';
	});
	transition = JSON.parse(JSON.stringify(ortransition))[0];
	transition['startTime'] = FamousEngine._clock.getTime();
	var roFunc = function(options){
		var roTransition = new Transitionable();
		roTransition.from(0).to(Math.PI, 'linear', options.fadeOutDuration);
		return roTransition;
	}
	var rotateTransition = roFunc(options);
	transition.childTransitions[0].transitionables.push(rotateTransition);
	transition.childTransitions[0].transitionablesfunc.push(roFunc);
	transition.childTransitions[0].durations.push(options.fadeOutDuration);
	transition.childTransitions[0].options = options;
	transition.totalDuration = options.fadeOutDuration;
	transition.height.push(Math.ceil(options.height/transition.numberOfRows));
	transition.width.push(Math.ceil(options.width/transition.numberOfColumns));
	return transition;
}

var createBlinds3dTransition = function(_this, options) {
	var transition = {};
	var ortransition = _this.transitions.filter(function( obj ) {
	  return obj.name == 'Blinds3d';
	});
	transition = JSON.parse(JSON.stringify(ortransition))[0];
	transition['startTime'] = FamousEngine._clock.getTime();
	var roFunc = function(options){
		var roTransition = new Transitionable();
		roTransition.from(0).to(Math.PI, 'linear', options.fadeOutDuration);
		return roTransition;
	}
	var rotateTransition = roFunc(options);
	transition.childTransitions[0].transitionables.push(rotateTransition);
	transition.childTransitions[0].transitionablesfunc.push(roFunc);
	transition.childTransitions[0].durations.push(options.fadeOutDuration);
	transition.childTransitions[0].options = options;
	transition.totalDuration = options.fadeOutDuration;
	transition.height.push(Math.ceil(options.height/transition.numberOfRows));
	transition.width.push(Math.ceil(options.width/transition.numberOfColumns));
	return transition;
}

var createTiles3dTransition = function(_this, options) {
	var transition = {};
	var ortransition = _this.transitions.filter(function( obj ) {
	  return obj.name == 'Tiles3d';
	});
	transition = JSON.parse(JSON.stringify(ortransition))[0];
	transition['startTime'] = FamousEngine._clock.getTime();
	var roFunc = function(options){
		var roTransition = new Transitionable();
		roTransition.from(0).to(Math.PI, 'linear', options.fadeOutDuration);
		return roTransition;
	}
	var rotateTransition = roFunc(options);
	transition.childTransitions[0].transitionables.push(rotateTransition);
	transition.childTransitions[0].transitionablesfunc.push(roFunc);
	transition.childTransitions[0].durations.push(options.fadeOutDuration);
	transition.childTransitions[0].options = options;
	transition.totalDuration = options.fadeOutDuration;
	transition.randomSelection = options.randomSelection;
	transition.height.push(Math.ceil(options.height/transition.numberOfRows));
	transition.width.push(Math.ceil(options.width/transition.numberOfColumns));
	return transition;
}

module.exports = Transitions;