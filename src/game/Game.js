/**
 * Main Game Engine
 */

class Game {
    constructor(gameManager, levelData, levelNumber) {
        this.gameManager = gameManager;
        this.levelData = levelData;
        this.levelNumber = levelNumber;
        this.level = null;
        this.player = null;
        this.camera = new GameCamera();
        this.triggers = [];
        this.isRunning = false;
        this.isPaused = false;
        this.score = 0;
        this.collectedCoins = 0;
        this.hud = new HUD(this);
    }

    start() {
        this.level = new Level(this.levelData);
        this.player = new Player(50, 300, this.level);
        this.isRunning = true;
    }

    stop() {
        this.isRunning = false;
    }

    pause() {
        this.isPaused = !this.isPaused;
    }

    update(deltaTime) {
        if (!this.isRunning || this.isPaused) return;

        this.player.update(deltaTime);
        this.level.update(deltaTime);
        this.camera.update(this.player);
        this.checkCollisions();
        this.checkTriggers();
        this.checkLevelCompletion();
    }

    render(ctx) {
        // Render game world
        ctx.save();
        ctx.translate(-this.camera.x, -this.camera.y);
        
        this.level.render(ctx);
        this.player.render(ctx);
        
        ctx.restore();

        // Render HUD
        this.hud.render(ctx);
    }

    checkCollisions() {
        const blocks = this.level.getBlocksInRange(this.player.x - 100, this.player.x + 100);
        
        for (let block of blocks) {
            if (this.player.collidesWith(block)) {
                if (block.type === 'spike' || block.type === 'saw') {
                    this.playerDeath();
                    return;
                }
                if (block.type === 'orb') {
                    this.triggerOrb(block);
                }
                if (block.type === 'portal') {
                    this.triggerPortal(block);
                }
                if (block.type === 'coin') {
                    this.collectCoin(block);
                }
            }
        }
    }

    checkTriggers() {
        for (let trigger of this.triggers) {
            trigger.update(this);
        }
    }

    checkLevelCompletion() {
        if (this.player.x > this.level.width) {
            this.levelComplete();
        }
    }

    triggerOrb(orb) {
        this.player.jump();
    }

    triggerPortal(portal) {
        this.player.changeGameMode(portal.targetMode);
    }

    collectCoin(coin) {
        this.collectedCoins++;
        this.score += 10;
        coin.collected = true;
    }

    playerDeath() {
        this.player.respawn();
    }

    levelComplete() {
        this.isRunning = false;
        this.hud.showComplete(this.score, this.collectedCoins);
    }
}

class GameCamera {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 1280;
        this.height = 720;
    }

    update(player) {
        this.x = player.x - 200;
        this.y = player.y - 300;
    }
}