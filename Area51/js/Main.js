window.onload = function() {
	// Create your Phaser game and inject it into an auto-created canvas.
	// We did it in a window.onload event, but you can do it anywhere (requireJS
	// load, anonymous function, jQuery dom ready, - whatever floats your boat)
	//var game = new Phaser.Game(1920, 1080, Phaser.CANVAS, '');
	//this was made with phaser framework get it at phaser.io
	//it was created in phaser editor a fantastic editor linux friendly
	//get it at http://phasereditor.boniatillo.com/
	
	var game = new Phaser.Game(1920, 1080, Phaser.CANVAS, '', { init: init, preload: preload, create: create, update: update, render: render });
	
	function init() {
		game.input.maxPointers = 1;

		// Setup the scale strategy
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		//you can try resiz to see which one fits best show_all scales nicely 
		//but might show letterbox
		//this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		}
	
	
	function preload() {
		game.load.pack("level", "assets/assets-pack.json");
	}
	
	var gnusprite;
	var tuxsprite;
	var bubblesprite;
	var bubblespritetux;
	
	var gnurndx = 186;
	var gnurndy = 370;
	var tuxrndx = 1536;
	var tuxrndy = 370;
	
	var timer;
	var total = 0;
	var timed = 1;
	var bugleft;
	var bugright;
	var smalllt;
	var biglt;
	var bigltcap;
	var smlt;
	var smltcap;	
	var bigltr;
	var bigltcapr;
	var smltr;
	var smltcapr;	
	var bugspeed;
	
	var slt1;
	var slt1dk;
	var slt2;
	var slt2dk;
	var slt3;
	var slt3dk;
	var slt4;
	var slt4dk;
	var slt5;
	var slt5dk;
	
	
	function create() {
		
			
		this.add.image(0,0,"backwall");
		
		this.add.image(150,255,"myatlas","tubebackl");
		
		gnusprite = this.game.add.sprite(gnurndx, gnurndy, "myatlas","gnu");
		game.add.tween(gnusprite).to({ x: 213}, 6000, Phaser.Easing.Linear.InOut, true, null, false, true);
		game.add.tween(gnusprite).to({ y: 390}, 4000, Phaser.Easing.Linear.InOut, true, null, false, true);
		
		//bubbles in gnu tank
		var delay = 0;
	    for (var i = 0; i < 20; i++)
	    {
	    	
	    	bubblesprite = game.add.sprite(190 + (game.rnd.between(0, 180)), 775, "myatlas", "bubble");

	    	bubblesprite.scale.set(game.rnd.realInRange(0.1, 0.5));

	        var speed = game.rnd.between(4000, 6000);

	        game.add.tween(bubblesprite).to({ y: 380 }, speed, Phaser.Easing.Sinusoidal.InOut, true, delay, 1000, false);

	        delay += 200;
	    }
		
		this.add.image(150,434,"myatlas","tubeglow");
		this.add.image(150,180,"myatlas","tubel");
		
		this.add.image(1500,255,"myatlas","tubebackr");
		
		tuxsprite = this.game.add.sprite(tuxrndx, tuxrndy, "myatlas","tux");
		game.add.tween(tuxsprite).to({ x: 1546}, 6000, Phaser.Easing.Linear.InOut, true, null, false, true);
		game.add.tween(tuxsprite).to({ y: 390}, 4000, Phaser.Easing.Linear.InOut, true, null, false, true);
		
		//bubbles in tux tank
		var delaytux = 0;
	    for (var i = 0; i < 20; i++)
	    {
	    	
	    	bubblespritetux = game.add.sprite(1540 + (game.rnd.between(0, 180)), 775, "myatlas", "bubble");

	    	bubblespritetux.scale.set(game.rnd.realInRange(0.1, 0.5));

	        var speedtux = game.rnd.between(4000, 6000);

	        game.add.tween(bubblespritetux).to({ y: 380 }, speedtux, Phaser.Easing.Sinusoidal.InOut, true, delaytux, 1000, false);

	        delaytux += 200;
	    }
		
		this.add.image(1500,434,"myatlas","tubeglow");
		this.add.image(1500,180,"myatlas","tuber");
		
		this.add.image(0,0,"front");
				
		//timer for blinky lights
		timer = game.time.create(false);
		timer.loop(500, updateCounter, this);		
		timer.start();
		
		//lights and shadows for blinky lights
		this.add.image(916,388,"myatlas","lt5b");
		this.add.image(917, 438,"myatlas","lt4b");
		this.add.image(917, 488,"myatlas","lt3b");
		this.add.image(917,538,"myatlas","lt2b");
		this.add.image(917,588,"myatlas","lt1b");
		
		
		//blinky lights
		slt5 = game.add.sprite(917,386,"myatlas","lt5");
		slt5dk = game.add.sprite(917,386,"myatlas","lt5dk");
		slt4 = game.add.sprite(918, 436,"myatlas","lt4");
		slt4dk = game.add.sprite(918, 436,"myatlas","lt4dk");	
		slt3 = game.add.sprite(918, 486,"myatlas","lt3");
		slt3dk = game.add.sprite(918, 486,"myatlas","lt3dk");
		slt2 = game.add.sprite(918,536,"myatlas","lt2");
		slt2dk = game.add.sprite(918,536,"myatlas","lt2dk");
		slt1 = game.add.sprite(918,586,"myatlas","lt1");
		slt1dk = game.add.sprite(918,586,"myatlas","lt1dk");
		
		//bottom bug
		bugleft = game.add.sprite(-300, 500, "myatlas", "bugl");
		
		smlt = game.add.sprite(-165, 570, "myatlas","smcirclt");
		smlt.anchor.setTo(0.5, 1);
		smltcap = game.add.sprite(-165, 570, "myatlas","smcirc");
		smltcap.anchor.setTo(0.5, 1);
		
		biglt = game.add.sprite(-115, 605, "myatlas","bigcirclt");
		biglt.anchor.setTo(0.5, 1);
		bigltcap = game.add.sprite(-115, 605, "myatlas","bigcirc");
		bigltcap.anchor.setTo(0.5, 1);
		var delaybugl;
		var speedbugl = game.rnd.between(30000, 40000);
		game.add.tween(bugleft).to({ x: 2000 }, speedbugl, Phaser.Easing.Sinusoidal.InOut, true, delaybugl, 1000, false);
        delaybugl += 200;
        
        //top bug
        bugright = game.add.sprite(2500, 200, "myatlas", "bugr");
		
		smltr = game.add.sprite(-165, 570, "myatlas","smcirclt");
		smltr.anchor.setTo(0.5, 1);
		smltcapr = game.add.sprite(-165, 570, "myatlas","smcirc");
		smltcapr.anchor.setTo(0.5, 1);
		
		bigltr = game.add.sprite(-115, 605, "myatlas","bigcirclt");
		bigltr.anchor.setTo(0.5, 1);
		bigltcapr = game.add.sprite(-115, 605, "myatlas","bigcirc");
		bigltcapr.anchor.setTo(0.5, 1);
		var delaybugr;
		var speedbugr = game.rnd.between(25000, 40000);
		game.add.tween(bugright).to({ x: -400 }, speedbugr, Phaser.Easing.Sinusoidal.InOut, true, delaybugr, 1000, false);
        delaybugr += 200;
      		
	}
	
	function update() {
		
		smlt.x = bugleft.x + 135;
		smlt.y = bugleft.y + 70;		
		smlt.angle -= 1;
		
		smltcap.x = bugleft.x + 135;
		smltcap.y = bugleft.y + 70;		
		smltcap.angle -= 1;
		
		biglt.x = bugleft.x + 185;
		biglt.y = bugleft.y + 105;		
		biglt.angle += 1;
		
		bigltcap.x = bugleft.x + 185;
		bigltcap.y = bugleft.y + 105;		
		bigltcap.angle += 1;
		
		smltr.x = bugright.x + 124;
		smltr.y = bugright.y + 70;		
		smltr.angle -= 1;
		
		smltcapr.x = bugright.x + 124;
		smltcapr.y = bugright.y + 70;		
		smltcapr.angle -= 1;
		
		bigltr.x = bugright.x + 75;
		bigltr.y = bugright.y + 105;		
		bigltr.angle += 1;
		
		bigltcapr.x = bugright.x + 75;
		bigltcapr.y = bugright.y + 105;		
		bigltcapr.angle += 1;
		
		if(total >= 1){
			slt5.visible = true;
			slt5dk.visible = false;
		}
		if(total < 1){
			slt5.visible = false;
			slt5dk.visible = true;
		}
		if(total >= 2){
			slt4.visible = true;
			slt4dk.visible = false;
		}
		if(total < 2){
			slt4.visible = false;
			slt4dk.visible = true;	
		}
		if(total >= 3){
			slt3.visible = true;
			slt3dk.visible = false;
		}
		if(total < 3){
			slt3.visible = false;
			slt3dk.visible = true;
		}
		if(total >= 4){
			slt2.visible = true;
			slt2dk.visible = false;
		}
		if(total < 4){
			slt2.visible = false;
			slt2dk.visible = true;
		}
		if(total >= 5){
			slt1.visible = true;
			slt1dk.visible = false;
		}
		if(total < 5){
			slt1.visible = false;
			slt1dk.visible = true;
		}
				
	}
	
	function updateCounter() {

		total++;
	    if(total > 6){
	    	total = 0;
	    }

	}
	
	
	function render() {
		//you can add debug stuff here for testing
	   // game.debug.spriteInfo(s, 20, 32);
		//game.debug.text('Time until event: ' + timer.duration.toFixed(0), 32, 32);
	    //game.debug.text('Loop Count: ' + total, 32, 64);
	}
	
	
};
