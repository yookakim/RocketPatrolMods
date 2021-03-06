//Rocket prefab
'use strict';
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {

        // parent constructor
        super(scene, x, y, texture, frame);

        this.scene = scene;
        // this.fireAnimation = scene.add.sprite(this.x, this.y, 'rocket_anim').setOrigin(0, 0);
        // add object to existing scene
        scene.add.existing(this);
        

        //track rocket's firing status
        this.isFiring = false;

        this.launchSpeed = 2;
        this.moveSpeed = 120;

        // enable physics for this object in its scene
        scene.physics.world.enableBody(this);

        // add rocket sound
        this.sfxRocket = scene.sound.add('sfx_rocket');
    }

    preUpdate(time, delta) {

        // animations updated in parent preUpdate
        super.preUpdate(time, delta);

        // if fired, move up
        if(this.isFiring && this.y >= 108) {
            this.body.velocity.y = - this.launchSpeed * 60;
        }

        // reset on miss
        if(this.y <= 108) {
            this.reset();

            // in the future when I have time i would probably set up a listener
            // instead of making a reference to the scene like this
            this.scene.p1Streak = 0;
            this.scene.p1StreakLast = 0;
        }
    }

    fire() {   
        if (!this.isFiring) {
            this.isFiring = true;
            this.body.setVelocity(0, 0);
            this.sfxRocket.play();
            //console.log(this.anims.getTotalFrames());
            this.play('rocketfire');
        }
    }

    // reset rocekt to "ground"
    reset() {

        this.isFiring = false;
        this.anims.pause();
        this.body.setVelocity(0, 0);
        this.y = 431;
    }

    // change left/right
    rocketStrafe(direction) {

        // I thought it would make sense to get the x values as a Vector2 object
        if (!this.isFiring) {
            this.body.setVelocity(direction.x * this.moveSpeed, direction.y);
        }
    }
}