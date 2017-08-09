var stage1State = {
  preload: function() {
    PrisonBreak.game.load.tilemap('stage1', 'assets/stages/stage1.json', null, Phaser.Tilemap.TILED_JSON);
    PrisonBreak.game.load.image('tiles', '/assets/tiles.png');
  },
  create: function() {
    this.startingX = 100;
    this.startingY = 200;
    PrisonBreak.keyboard = PrisonBreak.game.input.keyboard;
    PrisonBreak.playerGroup = PrisonBreak.game.add.physicsGroup(Phaser.Physics.P2JS);
    PrisonBreak.trapGroup = PrisonBreak.game.add.physicsGroup(Phaser.Physics.P2JS);

    // PrisonBreak.game.physics.p2.setImpactEvents(true);
    PrisonBreak.game.physics.p2.restitution = 0.0;

    PrisonBreak.game.physics.p2.updateBoundsCollisionGroup();

    map = this.game.add.tilemap('stage1');
    map.addTilesetImage('tiles', 'tiles');

    groundLayer = map.createLayer('Tile Layer 1', PrisonBreak.configs.GAME_WIDTH, PrisonBreak.configs.GAME_HEIGHT);
    wallLayer = map.createLayer('Tile Layer 2', PrisonBreak.configs.GAME_WIDTH, PrisonBreak.configs.GAME_HEIGHT);
    startLayer = map.createLayer('Tile Layer 3', PrisonBreak.configs.GAME_WIDTH, PrisonBreak.configs.GAME_HEIGHT);
    endLayer = map.createLayer('Tile Layer 4', PrisonBreak.configs.GAME_WIDTH, PrisonBreak.configs.GAME_HEIGHT);

    PrisonBreak.game.physics.p2.setBoundsToWorld(true, true, true, true, false);

    endGroup = PrisonBreak.game.add.group();
    endGroup.add(endLayer);

    this.player = new Player(this.startingX, this.startingY, {
      up: Phaser.Keyboard.UP,
      down: Phaser.Keyboard.DOWN,
      left: Phaser.Keyboard.LEFT,
      right: Phaser.Keyboard.RIGHT,
      player_speed: 180
    });

    PrisonBreak.saw = [];
    PrisonBreak.saw.push(new Saw(168, 120, 120, 268));
    PrisonBreak.saw.push(new Saw(264, 120, 120, 268));
    PrisonBreak.saw.push(new Saw(360, 120, 120, 268));
    PrisonBreak.saw.push(new Saw(456, 120, 120, 268));
    PrisonBreak.saw.push(new Saw(216, 264, 120, 268));
    PrisonBreak.saw.push(new Saw(312, 264, 120, 268));
    PrisonBreak.saw.push(new Saw(408, 264, 120, 268));
    PrisonBreak.saw.push(new Saw(504, 264, 120, 268));

    PrisonBreak.game.world.bringToTop(PrisonBreak.playerGroup);
    PrisonBreak.game.world.bringToTop(PrisonBreak.trapGroup);

    map.setCollision([3, 2, 4, 35, 36], true, wallLayer);
    PrisonBreak.game.physics.p2.convertTilemap(map, wallLayer);
    map.setCollision(114, true, endLayer);
    PrisonBreak.game.physics.p2.convertTilemap(map, endLayer);
    console.log(endLayer);

    var playerContact = function(body, bodyB, shapeA, shapeB, equation) { //https://phaser.io/examples/v2/p2-physics/contact-events
      if (body) {
        if (PrisonBreak.trapGroup.children.indexOf(body.sprite) > -1) { //trapGroup contains body's sprite
          console.log("Hit trap");
          this.player.sprite.body.x = this.startingX;
          this.player.sprite.body.y = this.startingY;
        }
        if (body.data.id == 33) {
          console.log("Hit end");
          PrisonBreak.game.state.start('win');
        }
      }
    }

    this.player.sprite.body.onBeginContact.add(playerContact, this);

  },
  render() {

  }
}
