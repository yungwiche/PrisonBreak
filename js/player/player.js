class Player {
  constructor(x, y, configs, bool) {
    this.configs = configs;
    this.sprite = PrisonBreak.playerGroup.create(x, y, 'player');
    this.sprite.body.collideWorldBounds = true;
    this.sprite.update = this.update.bind(this);
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    this.sprite.body.fixedRotation = true;
    this.alive = true;
    this.light = bool;
    this.setup = false;
    this.onTop = true;

    if (bool) {
      PrisonBreak.game.time.events.repeat(Phaser.Timer.SECOND * 5, 1, function() {
        this.LIGHT_RADIUS = 300;
        this.shadowTexture = PrisonBreak.game.add.bitmapData(PrisonBreak.game.width, PrisonBreak.game.height);
        var lightSprite = PrisonBreak.lightGroup.create(0, 0, this.shadowTexture);
        lightSprite.blendMode = Phaser.blendModes.MULTIPLY;
        this.setup = true;
      }, this);

      this.LoopEvent = function() {
        if (!this.onTop) {
          PrisonBreak.game.world.bringToTop(PrisonBreak.lightGroup);
          this.onTop = true;
        } else {
          PrisonBreak.game.world.sendToBack(PrisonBreak.lightGroup);
          this.onTop = false;
        }
        // this.LIGHT_RADIUS = 300;
        // PrisonBreak.game.time.events.repeat(Phaser.Timer.SECOND * 10, 1, this.lightup = function() {
        //   this.LIGHT_RADIUS = 100
        // }, this);
      }
      PrisonBreak.game.time.events.loop(Phaser.Timer.SECOND * 5, this.LoopEvent, this);
    }
  }

  update() {
    if (this.alive) {
      if (PrisonBreak.keyboard.isDown(this.configs.left)) {
        this.sprite.body.velocity.x = -this.configs.player_speed;
      } else if (PrisonBreak.keyboard.isDown(this.configs.right)) {
        this.sprite.body.velocity.x = this.configs.player_speed;
      } else this.sprite.body.velocity.x = 0;
      if (PrisonBreak.keyboard.isDown(this.configs.up)) {
        this.sprite.body.velocity.y = -this.configs.player_speed;
      } else if (PrisonBreak.keyboard.isDown(this.configs.down)) {
        this.sprite.body.velocity.y = this.configs.player_speed;
      } else this.sprite.body.velocity.y = 0;
    }
    if (this.light && this.setup) {
      this.shadowTexture.context.fillStyle = 'rgb(0, 0, 0)';
      this.shadowTexture.context.fillRect(0, 48, PrisonBreak.game.width, PrisonBreak.game.height - 96);
      var gradient = this.shadowTexture.context.createRadialGradient(
        this.sprite.body.x, this.sprite.body.y, this.LIGHT_RADIUS * 0.1,
        this.sprite.body.x, this.sprite.body.y, this.LIGHT_RADIUS);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.0)');
      this.shadowTexture.context.beginPath();
      this.shadowTexture.context.fillStyle = gradient;
      this.shadowTexture.context.arc(this.sprite.body.x, this.sprite.body.y, this.LIGHT_RADIUS, 0, Math.PI * 2);
      this.shadowTexture.context.fill();
      this.shadowTexture.dirty = true;
    }
  }
}
