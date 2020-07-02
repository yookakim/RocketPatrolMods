//Rocket prefab
'use strict';
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);

        //store point value
        this.points = pointValue;
        this.speed = game.settings.spaceshipSpeed;
        //console.log(game.settings.spaceshipSpeed);
    }

    preUpdate() {
        // move spaceship left
        this.x -= this.speed;
        // wraparound from left to right edge
        if(this.x <= 0 - this.width) {
            this.x = game.config.width;
        }
    }

    shipDestroy() {
        
    }

    // checkCollision() {
    //     this.physics.add.collider();
    // }

    reset() {
        this.x = game.config.width;
    }
}