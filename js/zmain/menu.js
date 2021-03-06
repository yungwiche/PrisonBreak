var move;
var menuState = {
  create: function() {
    PrisonBreak.game.stage.backgroundColor = '#ffffff';
    PrisonBreak.player = PrisonBreak.game.add.sprite(250, PrisonBreak.configs.GAME_HEIGHT - 278, 'player' );
    PrisonBreak.player.scale.setTo(3, 3);
    PrisonBreak.background = PrisonBreak.game.add.sprite(0, 0, 'background_lock');
    PrisonBreak.highScore = [];
    PrisonBreak.highScore.push({death : null});
    PrisonBreak.highScore.push({death : null});
    PrisonBreak.highScore.push({death : null});
    PrisonBreak.highScore.push({death : null});
    PrisonBreak.highScore.push({death : null});
    PrisonBreak.highScore.push({death : null});
    PrisonBreak.highScore.push({death : null});

    PrisonBreak.deathCount = 0;
    move = true;
    var nameLabel = PrisonBreak.game.add.text(300, 70, 'PRISON BREAK', {
      font: "70px Arial",
      fill: "#ffffff"
    });
    var startLabel = PrisonBreak.game.add.text(250, PrisonBreak.configs.GAME_HEIGHT - 150, 'Play Game', {
      font: "50px Arial",
      fill: "#ffffff"
    });
    startLabel.inputEnabled = true;
    startLabel.events.onInputUp.addOnce(this.start, this);

    var menuLevelLable = PrisonBreak.game.add.text(620, PrisonBreak.configs.GAME_HEIGHT - 150, 'Select Level', {
      font: "50px Arial",
      fill: "#ffffff"
    })
    menuLevelLable.inputEnabled = true;
    menuLevelLable.events.onInputUp.addOnce(this.menuLevel, this);

    if (PrisonBreak.sfxOn) {
      var sfx = PrisonBreak.game.add.sprite(100, PrisonBreak.configs.GAME_HEIGHT - 42, 'sfx_on');
    } else {
      var sfx = PrisonBreak.game.add.sprite(100, PrisonBreak.configs.GAME_HEIGHT - 42, 'sfx_off');
    }
    sfx.inputEnabled = true;
    sfx.events.onInputUp.add(function() {
      if (PrisonBreak.sfxOn) {
        PrisonBreak.sfxOn = false;
        PrisonBreak.deathSound.mute = true;
        PrisonBreak.sawSound.mute = true;
        PrisonBreak.coinSound.mute = true;
        PrisonBreak.screamSound.mute = true;
        PrisonBreak.unlockSound.mute = true;
        sfx.loadTexture('sfx_off', 0);
      } else {
        PrisonBreak.sfxOn = true;
        PrisonBreak.deathSound.mute = false;
        PrisonBreak.sawSound.mute = false;
        PrisonBreak.coinSound.mute = false;
        PrisonBreak.screamSound.mute = false;
        PrisonBreak.unlockSound.mute = false;
        sfx.loadTexture('sfx_on', 0);
      }
    }, this);

    if (PrisonBreak.bgmOn) {
      var bgm = PrisonBreak.game.add.sprite(100 + 50, PrisonBreak.configs.GAME_HEIGHT - 42, 'bgm_on');
    } else {
      var bgm = PrisonBreak.game.add.sprite(100 + 50, PrisonBreak.configs.GAME_HEIGHT - 42, 'bgm_off');
    }
    bgm.inputEnabled = true;
    bgm.events.onInputUp.add(function() {
      if (PrisonBreak.bgmOn) {
        PrisonBreak.bgmOn = false;
        PrisonBreak.backgroundSound.mute = true;
        bgm.loadTexture('bgm_off', 0);
      } else {
        PrisonBreak.bgmOn = true;
        PrisonBreak.backgroundSound.mute = false;
        bgm.loadTexture('bgm_on', 0);
      }
    }, this);

  },
  start: function() {
    PrisonBreak.background.loadTexture('background_unlock', 0, false);
    PrisonBreak.unlockSound.play();
    move = false;
    // this.fadePlayer = function() {
      PrisonBreak.game.add.tween(PrisonBreak.player).to({
        alpha: 0
      }, 2000, Phaser.Easing.Linear.None, true);
      PrisonBreak.game.time.events.add(Phaser.Timer.SECOND * 1, this.fadeComplete, this);
    // };

  },
  fadeComplete: function () {
    PrisonBreak.game.state.start('stage1');
    if (! PrisonBreak.backgroundSound.isPlaying) {
      PrisonBreak.backgroundSound.play();
    }
  },
  menuLevel: function() {
    PrisonBreak.game.state.start('menuLevel');
  },
  update(){
      if(move){
        if(PrisonBreak.player.position.x >= PrisonBreak.configs.GAME_WIDTH - 350) this.DIRECT = false;
        if(PrisonBreak.player.position.x <= 250) this.DIRECT = true;

        if(this.DIRECT) PrisonBreak.player.position.x += 2;
        else PrisonBreak.player.position.x -= 2;
      } else if(!move){
        if(PrisonBreak.player.position.x >= PrisonBreak.configs.GAME_WIDTH - 550) PrisonBreak.player.position.x -= 5;
        if(PrisonBreak.player.position.x <= PrisonBreak.configs.GAME_WIDTH - 550) PrisonBreak.player.position.x += 5;
      }

  }
}
