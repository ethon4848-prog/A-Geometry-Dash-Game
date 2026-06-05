/**
 * Player Character
 */

class Player {
    constructor(x, y, level) {
        this.x = x;
        this.y = y;
        this.startX = x;
        this.startY = y;
        this.level = level;
        
        // Physics
        this.vx = 0;
        this.vy = 0;
        this.width = 30;
        this.height = 30;
        this.gravity = 0.6;
        this.jumpForce = -15;
        this.maxFallSpeed = 20;
        
        // Game mode
        this.gameMode = 'cube'; // cube, ship, ball, ufo, wave, robot, spider, swingcopter
        this.gravityFlipped = false;
        this.speedMultiplier = 1;
        this.isDualMode = false;
        
        // State
        this.isJumping = false;
        this.isGrounded = false;
        this.rotation = 0;
    }

    update(deltaTime) {
        // Apply gravity
        const gravityDirection = this.gravityFlipped ? -1 : 1;
        this.vy += this.gravity * gravityDirection;
        
        // Cap fall speed
        if (this.vy > this.maxFallSpeed) {
            this.vy = this.maxFallSpeed;
        }
        if (this.vy < -this.maxFallSpeed) {
            this.vy = -this.maxFallSpeed;
        }
        
        // Constant forward movement
        this.vx = 8 * this.speedMultiplier;
        
        // Update position
        this.x += this.vx * deltaTime * 60;
        this.y += this.vy * deltaTime * 60;
        
        // Update rotation
        this.rotation += (this.vx * deltaTime * 60) / this.width;
        
        // Check ground collision
        this.checkCollisions();
    }

    render(ctx) {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotation);
        
        ctx.fillStyle = '#00FF00';
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        
        ctx.restore();
    }

    jump() {
        if (this.isGrounded || this.gameMode === 'ship') {
            this.vy = this.jumpForce;
            this.isGrounded = false;
            this.isJumping = true;
        }
    }

    checkCollisions() {
        const checkCollision = (x, y) => {
            const blocks = this.level.getBlocksInRange(x - this.width, x + this.width);
            for (let block of blocks) {
                if (this.boxCollide(x, y, block.x, block.y, block.width, block.height)) {
                    return block;
                }
            }
            return null;
        };

        this.isGrounded = false;
        
        // Check below
        if (!this.gravityFlipped && this.vy >= 0) {
            const blockBelow = checkCollision(this.x, this.y + this.height + 1);
            if (blockBelow) {
                this.y = blockBelow.y - this.height;
                this.vy = 0;
                this.isGrounded = true;
            }
        }
        
        // Check above
        if (this.gravityFlipped && this.vy <= 0) {
            const blockAbove = checkCollision(this.x, this.y - 1);
            if (blockAbove) {
                this.y = blockAbove.y + blockAbove.height;
                this.vy = 0;
                this.isGrounded = true;
            }
        }
    }

    boxCollide(x, y, bx, by, bw, bh) {
        return x + this.width > bx && x < bx + bw &&
               y + this.height > by && y < by + bh;
    }

    collidesWith(block) {
        return this.boxCollide(this.x, this.y, block.x, block.y, block.width, block.height);
    }

    changeGameMode(mode) {
        this.gameMode = mode;
        this.rotation = 0;
    }

    respawn() {
        this.x = this.startX;
        this.y = this.startY;
        this.vx = 0;
        this.vy = 0;
        this.rotation = 0;
    }
}