class Saw1 {
  constructor(x, y, y1, y2, speed) {
    this.sprite = PrisonBreak.trapGroup.create(x, y, 'saw1');
    this.sprite.update = this.update.bind(this);

    this.sprite.body.collideWorldBounds = true;
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    this.sprite.body.kinematic = true;
    this.SAW_SPEED = speed;
    this.DIRECT;
    this.y1 = y1;
    this.y2 = y2;
    this.sprite.body.setCircle(this.sprite.width / 2);
  }

  update() {
    this.sprite.body.rotation += this.SAW_SPEED * PrisonBreak.game.time.physicsElapsed;

    if (this.sprite.body.y <= this.y1) this.DIRECT = false;
    if (this.sprite.body.y >= this.y2) this.DIRECT = true;

    if (this.DIRECT) this.sprite.body.velocity.y = -this.SAW_SPEED;
    else this.sprite.body.velocity.y = this.SAW_SPEED;
  }
}
