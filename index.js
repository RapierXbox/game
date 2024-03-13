const canvas = document.querySelector("canvas")
const screen = canvas.getContext("2d")

canvas.height = 720
canvas.width = 1080

const player_r = new Image()
player_r.src = "images/alien_r.png"
const player_l = new Image()
player_l.src = "images/alien_l.png"

const banana_r = new Image()
banana_r.src = "images/banana_r.png"
const banana_l = new Image()
banana_l.src = "images/banana_l.png"

const jetpack_powerup_icon = new Image()
jetpack_powerup_icon.src = "images/jetpackpowerup.png"
const jetpack_gui_icon = new Image()
jetpack_gui_icon.src = "images/jetpack.png"

const healthbar5 = new Image()
healthbar5.src = "images/healthbar5.png"
const healthbar4 = new Image()
healthbar4.src = "images/healthbar4.png"
const healthbar3 = new Image()
healthbar3.src = "images/healthbar3.png"
const healthbar2 = new Image()
healthbar2.src = "images/healthbar2.png"
const healthbar1 = new Image()
healthbar1.src = "images/healthbar1.png"
const healthbar0 = new Image()
healthbar0.src = "images/healthbar0.png"

const healthpowerupicon = new Image()
healthpowerupicon.src = "images/medkit.png"

const ammoicon = new Image()
ammoicon.src = "images/ammo.png"

const aimcursor = new Image()
aimcursor.src = "images/crosshair.png"

const ammobar0 = new Image()
ammobar0.src = "images/ammo0.png"
const ammobar1 = new Image()
ammobar1.src = "images/ammo1.png"
const ammobar2 = new Image()
ammobar2.src = "images/ammo2.png"
const ammobar3 = new Image()
ammobar3.src = "images/ammo3.png"
const ammobar4 = new Image()
ammobar4.src = "images/ammo4.png"
const ammobar5 = new Image()
ammobar5.src = "images/ammo5.png"

const pistol = new Image()
pistol.src = "images/pistol.png"
const ar = new Image()
ar.src = "images/ar.png"
const sniper = new Image()
sniper.src = "images/sniper.png"

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    }
}

function getRandomInt(min,max) {
    return min + Math.floor(Math.random() * (max + 1));
  }

var lastUpdate = Date.now();

class AmmoPowerup {
    constructor({}) {
        this.position = {}
        this.active = false
        this.waittimer = 60
        this.position.x  = 0
        this.position.y = 0
        this.image = ammoicon
    }
    draw(player) {
        if (this.active && !player.dead) screen.drawImage(this.image, this.position.x, this.position.y);
        else {
            this.position.x = 0;
            this.position.y = 0;
        }
        if (this.waittimer > 0 && !this.active) this.waittimer--;
        if (this.waittimer == 0) {
            this.position.y = 680;
            this.position.x = getRandomInt(20,700);
            this.waittimer = -1;
            this.active = true;
        }
        var dis = Math.sqrt(Math.pow((this.position.x - player.position.x + 33), 2) + Math.pow((this.position.y - player.position.y), 2))
        if (this.active && dis < 70) {
            player.ammo = 5
            this.active = false
            this.waittimer = 400
        }
    }
}

class JetpackPowerup {
    constructor({}) {
        this.position = {}
        this.active = false
        this.waittimer = 600
        this.position.x  = 0
        this.position.y = 0
        this.image = jetpack_powerup_icon
    }
    draw(player) {
        if (this.active && !player.dead) screen.drawImage(this.image, this.position.x, this.position.y);
        else {
            this.position.x = 0;
            this.position.y = 0;
        }
        if (this.waittimer > 0 && !this.active) this.waittimer--;
        if (this.waittimer == 0) {
            this.position.y = 680;
            this.position.x = getRandomInt(20,700);
            this.waittimer = -1;
            this.active = true;
        }
        var dis = Math.sqrt(Math.pow((this.position.x + 15 - player.position.x + 33), 2) + Math.pow((this.position.y - player.position.y), 2))
        if (this.active && dis < 70) {
            player.jetpacktimer = 500
            this.active = false
            this.waittimer = 2400
        }
    }
}

class HealtPowerup {
    constructor({}) {
        this.position = {}
        this.active = false
        this.waittimer = 120
        this.position.x  = 0
        this.position.y = 0
        this.image = healthpowerupicon
    }
    draw(player) {
        if (this.active && !player.dead) screen.drawImage(this.image, this.position.x, this.position.y);
        else {
            this.position.x = 0;
            this.position.y = 0;
        }
        if (this.waittimer > 0 && !this.active) this.waittimer += -1;
        if (this.waittimer == 0) {
            this.position.y = 680;
            this.position.x = getRandomInt(20,700);
            this.waittimer = -1;
            this.active = true;
        }
        var dis = Math.sqrt(Math.pow((this.position.x + 15 - player.position.x + 33), 2) + Math.pow((this.position.y - player.position.y), 2))
        if (this.active && dis < 70) {
            player.health += 3
            if (player.health > 5) player.health = 5;
            this.active = false
            this.waittimer = 1200
        }
    }
}

class Banana {
    constructor({ }) {
        this.position = {}
        this.position.x = 1030
        this.position.y = 628
        this.image = banana_l
        this.speed = 0
    }
    draw(player) {
        this.speed = player.score / 75
        if (player.position.x <= this.position.x && !player.dead) {
            this.image = banana_l 
            this.position.x -= 2 + this.speed
        } else if (!player.dead){
            this.image = banana_r 
            this.position.x += 2 + this.speed
        }
        if (!player.dead) screen.drawImage(this.image, this.position.x, this.position.y)
        if (Math.sqrt(Math.pow((this.position.x - player.position.x), 2) + Math.pow((this.position.y - player.position.y), 2)) < 45) {
            this.position.x = 1030
            this.position.y = 628
            player.position.x = 17
            player.position.y = 628
            player.health -= 1
            
        }
    }
}

class Aimcursor{
    constructor({}) {
        this.position = {}
        this.position.x = 0
        this.position.y = 0
        this.image = aimcursor
    }

    draw() {
        screen.drawImage(this.image, this.position.x - 6, this.position.y - 6)
    }
}

class PlayerSprite {
    constructor({ }) {
        this.position = {}
        this.position.x = 17
        this.position.y = 628
        this.velocity = {}
        this.velocity.x = 0
        this.velocity.y = 0
        this.image = player_r
        this.onground = true
        this.speed = 2
        this.weapon = 2
        this.weaponswitched = false
        this.weaponimage = ar
        this.health = 5
        this.healthbarimage = healthbar5
        this.ammo = 5
        this.ammobarimage = ammobar5
        this.score = 0
        this.range = 170
        this.dead = false
        this.highscore = localStorage.getItem("highscore")
        if (this.highscore == null) {
            this.highscore = 0;
        }
        this.jetpacktimer = -1
    }

    shoot(event, target) {
        if (this.ammo > 0) {
            this.ammo -= 1
            let rect = canvas.getBoundingClientRect();
            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;
            let dist = Math.sqrt(Math.pow((x - target.position.x - 33), 2) + Math.pow((y - target.position.y - 46), 2));
            let dist1 = Math.sqrt(Math.pow((this.position.x + 33 - target.position.x - 33), 2) + Math.pow((this.position.y - target.position.y), 2));
            if (dist < 45 && dist1 <= this.range) {
                if (getRandomInt(0,1) == 1) {
                    target.position.x = 1030
                    target.position.y = 628
                } else {
                    target.position.x = 50
                    target.position.y = 628
                }
                

                this.score += 1
            }
        }
        if (this.score > this.highscore) {
            localStorage.setItem("highscore", this.score.toString())
            this.highscore = this.score
        }
    }

    draw() {
        var now = Date.now();
        var dt = now - lastUpdate;
        lastUpdate = now;
        this.speed = 4 - this.weapon
        if (this.velocity.x >=0) this.image = player_r
        else this.image = player_l
        if (this.weapon == 1) {
            this.range = 85
        } else if (this.weapon == 2) {
            this.range = 170
        } else if (this.weapon == 3) {
            this.range = 300
        }
        if (player.health == 0) {
            this.dead = true
        }
        if (this.ammo == 5) {
            this.ammobarimage = ammobar5
        } else if (this.ammo == 0) {
            this.ammobarimage = ammobar0
        } else if (this.ammo == 1) {
            this.ammobarimage = ammobar1
        } else if (this.ammo == 2) {
            this.ammobarimage = ammobar2
        } else if (this.ammo == 3) {
            this.ammobarimage = ammobar3
        } else if (this.ammo == 4) {
            this.ammobarimage = ammobar4
        }
        if (this.jetpacktimer > 0) {
            this.jetpacktimer--;
            this.weaponimage = jetpack_gui_icon
            if (keys.w.pressed) {
                this.velocity.y = -2
            }
            this.range = 1
            this.speed = 2
            screen.fillStyle = "#C71C00"
            screen.fillRect(905, 70, (this.jetpacktimer / 500) * 50, 15)
        } else if (this.jetpacktimer == 0) {
            this.weapon = 1
            this.weaponimage = pistol
            this.jetpacktimer = -1
        }
        if (this.dead == false) {
            screen.beginPath();
            screen.arc(this.position.x + 33, this.position.y + 46, this.range, 0, 2 * Math.PI, false);
            screen.fillStyle = '#EF173A';
            screen.fill();
            screen.lineWidth = 2;
            screen.strokeStyle = '#C71C00';
            screen.stroke();
            screen.drawImage(this.image, this.position.x, this.position.y)
            screen.drawImage(this.weaponimage, 905, 15)
            screen.drawImage(this.healthbarimage, 10, 8)
            screen.drawImage(this.ammobarimage, 970, 8)
            screen.font = "15px Arial";
            screen.fillStyle = "black"
            screen.fillText("Score:" + this.score, 970, 45);
            screen.fillText("Highscore:" + this.highscore, 970, 65);
        } else {
            screen.font = "50px Arial";
            screen.fillStyle = "black"
            screen.fillText("UR DED LOLOL", 300, 100);
        }



        if (player.health == 5) {
            player.healthbarimage = healthbar5
        } else if (player.health == 4) {
            player.healthbarimage = healthbar4
        } else if (player.health == 3) {
            player.healthbarimage = healthbar3
        } else if (player.health == 2) {
            player.healthbarimage = healthbar2
        } else if (player.health == 1) {
            player.healthbarimage = healthbar1
        } else if (player.health == 0) {
            player.healthbarimage = healthbar0
        }
        if (this.position.y > 628) {
            this.onground = true
        } else {
            this.onground = false
        }
        if (!this.onground) {
            this.velocity.y += 0.01 * dt
        } else {
            if (this.velocity.y > 0) this.velocity.y = 0;
        }
        if (keys.a.pressed && !keys.d.pressed) {
            this.velocity.x = -this.speed * (dt * 0.1)
        }
        if (!keys.a.pressed && keys.d.pressed) {
            this.velocity.x = this.speed * (dt * 0.1)
        }
        if (!keys.a.pressed && !keys.d.pressed) {
            this.velocity.x = 0
        }

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.x < 0) {
            this.position.x = 1080
        } else if (this.position.x > 1080) {
            this.position.x = 0
        }
    }
}

const player = new PlayerSprite({})
const banana = new Banana({})
const medkit = new HealtPowerup({})
const ammo = new AmmoPowerup({})
const crosshair = new Aimcursor({})
const jetpackpowerup = new JetpackPowerup({})

var esp = false
function animate() {
    window.requestAnimationFrame(animate)
    screen.fillStyle = "#D03D33"
    screen.fillRect(0, 0, canvas.width, canvas.height)
    player.draw()
    banana.draw(player)
    medkit.draw(player)
    ammo.draw(player)
    jetpackpowerup.draw(player)
    if (esp) {
        screen.beginPath();
        screen.lineWidth = "2";
        screen.strokeStyle = "#39ff14";
        screen.rect(player.position.x, player.position.y, 66, 92);
        screen.stroke();
        screen.beginPath();
        screen.moveTo(banana.position.x+33, banana.position.y+46);
        screen.lineTo(player.position.x+33, player.position.y+46);
        screen.stroke();
        screen.beginPath();
        screen.arc(banana.position.x + 33, banana.position.y + 46, 35, 0, 2 * Math.PI, false);
        screen.lineWidth = 2;
        screen.stroke();
    }
    crosshair.draw()

}
document.getElementById("gay").style.cursor = 'none';
animate()

window.addEventListener("keydown", (e) => {
    console.log(e.key)
    switch (e.key.toLowerCase()) {
        case "w":
            if (player.onground) {
                player.velocity.y = -6
            }
            keys.w.pressed = true
            break
        case "a":
            keys.a.pressed = true
            break
        case "d":
            keys.d.pressed = true
            break
        case " ":
            if (player.onground) {
                player.velocity.y = -6
            }
            keys.w.pressed = true
            break
        case "1":
            player.weapon = 1
            player.weaponimage = pistol
            break
        case "2":
            player.weapon = 2
            player.weaponimage = ar
            break
        case "3":
            player.weapon = 3
            player.weaponimage = sniper
            break
        case "c":
            esp = !esp
            break
    }
})
window.addEventListener("keyup", (e) => {

    switch (e.key) {
        case "a":
            keys.a.pressed = false
            break
        case "d":
            keys.d.pressed = false
            break
        case "w":
            keys.w.pressed = false
            break
        case " ":
            keys.w.pressed = false
            break
    }
})
addEventListener('click', (event) => {
    player.shoot(event,banana)
});
addEventListener("mousemove", (e) => {
    let rect = canvas.getBoundingClientRect();
    crosshair.position.x = e.clientX - rect.left;
    crosshair.position.y = e.clientY - rect.top;
})