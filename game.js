// const k = kaboom();

kaboom({
    global: true,
    fullscreen: true,
    scale: 2,
    debug: true,
    clearColor: [0, 0, 0, 1],
    // clearColor:[rgba(0, 0, 1, 0.5)],
})

//speeds
const MOVE_SPEED = 120;
const JUMP_FORCE = 380;
const BIG_JUMP_FORCE = 550;
let CURRENT_JUMP_FORCE = JUMP_FORCE;
let isJumping = true;
const FALL_DEATH = 400;
const ENEMY_SPEED = 20;


loadRoot('/assets/')
loadSprite('block', 'block.png')
loadSprite('candy', 'candy.png')
loadSprite('cupcake', 'cupcake.png')
loadSprite('eye-pryamid', 'eye-pryamid.png')
loadSprite('globin', 'globin.png')
loadSprite('horse', 'horse.png')
loadSprite('house', 'house.png')
loadSprite('key', 'key.png')
loadSprite('monster', 'monster.png')
loadSprite('pink-brick', 'pink-brink.png')
loadSprite('purple-block', 'purple_block.png')
loadSprite('rose', 'rose.png')
loadSprite('surprise', 'surprise.png')
loadSprite('teddy', 'teddy.png')
loadSprite('background', 'background.png')
loadSprite('peach-block', 'peach_block.png')
loadSprite('gold-block', 'gold-block.png')
loadSprite('bunny', 'bunny.png')
loadSprite('empty-square', 'empty-quare.png')
loadSprite('multi', 'multi.png')
loadSprite('burger', 'burger.png')
loadSprite('redbull', 'rebull.png')
loadSound('slow', 'slow.mp3')
loadSound('horse-sound', 'horse-sound.mp3')
loadSound('rooster', 'rooster.mp3')
loadSound('magic', 'magic.mp3')
loadSound('deathnote', 'deathnote.mp3')


scene("game", ({ level, score }) => {
    layers(['bg', 'obj', 'ui'], 'obj')

    const maps = [
        [   '                                         ',
            '                                         ',
            '                                         ',
            '                                         ',
            '                                         ',
            '                                         ',
            '                                         ',
            '                                         ',
            '               ====                      ',
            '                                         ',
            '          ===                            ',
            '                                         ',
            '     =*===?                              ',
            '                 ?==            `        ',
            '                                         ',
            '                                         ',
            '       @        %                         ',
            '===========================  ==========  ',
        ],
        ['                                         ',
            '                                         ',
            '                                         ',
            '                                         ',
            '   ??                                    ',
            '                *     @                  ',
            '                                         ',
            '   (((((((((((((((                       ',
            '                       (                 ',
            '=           @                            ',
            '=                                        ',
            '=           (((     `                    ',
            '=                                        ',
            '=                           (((((        ',
            '=     @                                  ',
            '=                                        ',
            '========              =========          ',
        ],
        [
            '                                         ',
            '                                         ',
            '                                         ',
            '                                         ',
            '                                         ',
            '                                         ',
            '      ??                                 ',
            '                *     @                  ',
            '                           `             ',
            '  ?**             ^                      ',
            '                                         ',
            '=  ^         @                           ',
            '=                         ^              ',
            '=           (((      )))))))))           ',
            '=                                        ',
            '=                                  ((((( ',
            '=     @                                  ',
            '=                                        ',
            '))))))))))))                 ))))))))))))',
        ],
        [
            '                                         ',
            '                                         ',
            '                                         ',
            '                                         ',
            '                       )))))))))))       ',
            '                                         ',
            '      ??                                 ',
            '                *     }                  ',
            '                           `             ',
            '  ?**             ^                      ',
            '                                         ',
            '   ^ =======         }                   ',
            '=                         ^              ',
            '=           (((      )))))))))           ',
            '=                                         ',
            '=                                         ',
            '=     }                          )        ',
            '=                              ))  ))     ',
            '))))))))))))                 ))))))))     ',
        ],
        [
            '                                          ',
            '                                          ',
            '                                          ',
            '                                          ',
            '                                          ',
            '                                          ',
            '                                          ',
            '                *     }         ¡¡¡¡      ',
            '                                          ',
            '                ^                         ',
            '                                          ',
            '     ^ ¡¡¡¡¡¡          }                  ',
            '¡¡¡                         ^             ',
            '¡¡¡           ¡**¡                        ',
            '¡¡                              `         ',
            '¡                                         ',
            '¡    }         §                           ',
            '           ¡¡¡¡¡¡¡¡ ¶                      ',
            '                 ¡¡¡¡                     ',
            '                      ¡¡¡                 ',
            '                          ¡¡¡¡¡¡¡¡        ',
            '                                  ¡¡¡¡¡¡¡¡',
            '                                       ¡¡¡',
            '¡                    ™                    ',
            '¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡                  ',
        ],


    ]


    const levelCfg = {
        width: 20,
        height: 20,
        '=': [sprite('block'), solid()],
        '$': [sprite('candy'), solid(), 'candy', scale(0.5), body()],
        '?': [sprite('surprise'), solid(), 'cupcake-surprise'],
        '*': [sprite('surprise'), solid(), 'candy-surprise'],
        '}': [sprite('eye-pryamid'), solid()],
        '@': [sprite('globin'), solid(), 'danger', body()],
        '}': [sprite('horse'), solid(), 'danger', body()],
        '`': [sprite('house'), solid(), 'house', scale(3)],
        '#': [sprite('key'), solid(), body()],
        '(': [sprite('pink-brick'), solid()],
        '%': [sprite('cupcake'), solid(), 'cupcake', scale(0.5), body()],
        ')': [sprite('purple-block'), solid()],
        '&': [sprite('rose'), solid(), 'death'],
        '^': [sprite('monster'), solid(), 'danger', body()],
        '™': [sprite('bunny'), solid(), 'danger', body()],
        '¡': [sprite('empty-square'), solid()],
        '£': [sprite('gold-block'), solid()],
        '¢': [sprite('peach-block'), solid()],
        '∞': [sprite('multi'), solid()],
        '§': [sprite('burger'), 'heal'],
        '¶': [sprite('redbull'), 'heal']
    }

    const gameLevel = addLevel(maps[level], levelCfg)

    const scoreBoard = add([
        text(score),
        pos(30, 6),
        layer('ui'),
        {
            value: score,
        }
    ])
    add([text('level ' + 'score', pos(4, 6))])

    // const healthBoard = add([
    //     text(health),
    //     pos(30, 6),
    //     layer('ui'),
    //     {
    //         value: health,
    //     }
    // ])
    // add([text('level' +'health', pos(4, 6))])

    add([
        sprite("background"),
        layer("bg"),
        scale(2),
    ]);

    function big() {
        let timer = 0;
        let isBig = false;
        return {
            update() {
                if (isBig) {
                    CURRENT_JUMP_FORCE = BIG_JUMP_FORCE;
                    timer -= dt()
                    if (timer <= 0) {
                        this.smallify()
                    }
                }
            },
            isBig() {
                return isBig
            },
            smallify() {
                this.scale = vec2(1);
                CURRENT_JUMP_FORCE = JUMP_FORCE;
                timer = 0;
                isBig = false;
            },
            biggify() {
                this.scale = vec2(2);
                timer = 0;
                isBig = true;
            }
        }
    }

    function health(hp){
        return{
            id:'health',
            require:[],
            hurt(n){
                hp -= n ?? 1;
                this.trigger('hurt');
                if (hp <=0 ){
                    this.trigger('death');
                }
            },
            heal(n){
                hp+=n ?? 1;
                this.trigger('heal');
            }

        }
    }

    const player = add([
        sprite('teddy', solid()),
        pos(30, 0),
        body(),
        big(3),
        origin('bot'),
        health(12),
    ])

    // action('globin', (m) => {
    //     m.move(20, 0)
    // })
    // action('monster', (m) => {
    //     m.move(4, 6)
    // })

    action('cupcake', (c) => {
        c.move(10, 0)
    })

    action('candy', (c) => {
        c.move(10, 0)
    })

    player.on("headbump", (obj) => {
        if (obj.is('cupcake-surprise')) {
            gameLevel.spawn('%', obj.gridPos.sub(0, 1))
            destroy(obj)
            gameLevel.spawn('(', obj.gridPos.sub(0, 0))
        }
    })
    player.on('headbump', (obj) => {
        if (obj.is('candy-surprise')) {
            gameLevel.spawn('$', obj.gridPos.sub(0, 1));
            destroy(obj);
            gameLevel.spawn('(', obj.gridPos.sub(0, 0));
        }
    })
    player.collides('candy', (obj) => {
        play("magic", {
            volume: 0.2,
            speed: 0.8,
            detune: 1200,
        });
        destroy(obj);
        player.biggify(6);
    })
    player.collides('cupcake', (obj) => {
        play("magic", {
            volume: 0.2,
            speed: 0.8,
            detune: 1200,
        });
        destroy(obj)
        scoreBoard.value++;
        scoreBoard.text = scoreBoard.value
    })

    player.collides('heal', (obj) => {
        play("magic", {
            volume: 0.2,
            speed: 0.8,
            detune: 1200,
        });
        destroy(obj)
        scoreBoard.value++;
        scoreBoard.text = scoreBoard.value;
        health++;
    })

    action('danger', (d) => {
        d.move(-ENEMY_SPEED, 0)
    })

    player.collides('danger', (d) => {
        if (isJumping) {
            destroy(d)
        } else {
            go('lose', { score: scoreBoard.value })
        }
    })

    player.action(() => {
        camPos(player.pos)
        if (player.pos.y >= FALL_DEATH) {
            play("deathnote", {
                volume: 1.0,
                speed: 0.8,
                detune: 1200,
            });
            go('lose', { score: scoreBoard.value })
            // if('lose'){
            //     go('game', {
            //         level: level -1 % maps.length,
            //         score:scoreBoard.value
            //     })
            // }
        }
    })

    player.collides('house', () => {
        keyPress('down', () => {
            play("rooster", {
                volume: 0.2,
                speed: 0.8,
                detune: 1200,
            });
            play('slow', {
                volume: 0.0,
                speed: 0.0,
                detune: -1200,
            })
            go('game', {
                level: (level + 1) % maps.length,
                score: scoreBoard.value
            })
        })
    })

    on('house', (e) => {
        music.stop();
    });

    const music = play('slow')
    music.volume(0.1);
    music.speed(0.4);
    music.unloop();

    keyPress("1", () => {
        if (music.paused()) {
            music.play();
        } else {
            music.pause();
        }
    });


    keyDown('left', () => {
        player.move(-MOVE_SPEED, 0);
    })
    keyDown('right', () => {
        player.move(MOVE_SPEED, 0);
    })
    player.action(() => {
        if (player.grounded()) {
            isJumping = false;
        }
    })
    keyDown('space', () => {
        if (player.grounded()) {
            isJumping = true;
            player.jump(CURRENT_JUMP_FORCE)
        }
    })

})

// scene("game", () => {
//     let score = 0;
//     keyPress("p", () => {
//         go("game", score);
//     })
// });
scene('lose', ({ score }) => {
    add([text(score, 32), origin('center'), pos(width() / 2, height() / 2)])
})

start("game", { level: 0, score: 0 })