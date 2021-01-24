/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link http://choosealicense.com/licenses/no-license/|No License}
* 
* @description  This example requires the Phaser Virtual Joystick Plugin to run.
*               For more details please see http://phaser.io/shop/plugins/virtualjoystick
*/
var game = new Phaser.Game(350, 500, Phaser.AUTO, 'game-rwd',
    { preload: preload, create: create, update: update });

var player;
var keyboard;
var leftWall;
var rightWall;
var platforms = [];   //多磚塊 放陣列裡產生
var many_star = [];   //多星星 陣列產生
var orin;           //初始平台
var point = 0;      //宣分數0
var Bonus_num = 0;      //宣分數0
var speed_time = 1000000;    //初始建磚塊的延遲
var lastTime = 0;     //分數建立時機基準
var status = 'running';
var star_type = 'close';
var isCanPlay = 'false';
var creatPl = setInterval(createPlatform, speed_time);   //每1200毫秒執行createPlatform這個function
var button;
var background;
var left_move;
var right_move;




function preload() {
    game.load.spritesheet('button', 'assets/button_sprite_sheet1.png', 193, 71);
    game.load.image('gamerules', './assets/gameRules.png');
    // game.load.image('start', 'assets/start.png');
    game.load.spritesheet('playerdied', './assets/explode1.png', 130, 118);  //死亡後爆炸
    game.load.spritesheet('player', './assets/dude.png', 32, 48);
    game.load.image('normal', './assets/barrier_red.png', 96, 22);
    game.load.image('nails', './assets/nails.png');
    game.load.spritesheet('conveyorRight', './assets/conveyor_right.png', 96, 16);
    game.load.spritesheet('conveyorLeft', './assets/conveyor_left.png', 96, 16);
    game.load.spritesheet('trampoline', './assets/speet5-x.png', 66, 33);   //66 60
    game.load.spritesheet('fake', './assets/fake.png', 96, 36);
    game.load.image('wall', './assets/wall.png');
    game.load.image('ceiling', './assets/ceiling.png');
    game.load.image('spike', './assets/spikes.png');
    game.load.image('star', './assets/star.png');
    game.load.image('background', './assets/starfield.jpg');
    game.load.image('cover', './assets/start.png');
    //RWD搖桿
    game.load.image('left', './assets/left.png');
    game.load.image('right', './assets/right.png');
}


function create() {



    var bg = game.add.image(19, 0, 'background'); //背景
    creatBounders();     //呼叫兩側牆壁跟天花板刺
    if (isCanPlay == "true") {
        createPlayer();
    }
    StartPlace();



    function actionOnClick() {
        if (isCanPlay == 'false') {
            isCanPlay = 'true';
            createPlayer();      //創玩家
            timedCount();
            platforms.forEach(function (s) { s.destroy() });
            platforms = [];
            many_star.forEach(function (s) { s.destroy() });
            many_star = [];
            button.kill();
            // var creatPl = setInterval(createPlatform, speed_time);   //每1200毫秒執行createPlatform這個function
            gamerules.visible = false;
            // remind.destroy();
            /*加入暫停按鈕*/
            // button = game.add.button(game.world.width - 195, 10, 'button', config.managePause, this, 1, 1, 0);
        }
    }




    star = game.add.sprite(120, 79, 'star');
    game.physics.arcade.enable(star);    //星星物理引擎
    star.body.immovable = true;          //星星不可被推擠對嗎? 對
    many_star.push(star);


    orin = game.add.sprite(120, 100, 'normal');  //初始站立平台
    game.physics.arcade.enable(orin);   //物理引擎
    orin.body.immovable = true;         //不可被推擠對嗎? 對
    orin.height = 20;
    orin.width = 60;

    var gamerules = game.add.image(3, 30, 'gamerules');
    button = game.add.button(85, 370, 'button', actionOnClick, this, 2, 1, 0);  //建按鈕



    keyboard = game.input.keyboard.addKeys({
        'enter': Phaser.Keyboard.ENTER,
        'left': Phaser.Keyboard.LEFT,
        'right': Phaser.Keyboard.RIGHT,
    });

    var style = { fill: '#ff0000', fontSize: '20px' } //設定style屬性
    var styleII = { fill: '#ff0000', fontSize: '15px' } //設定style屬性
    var styleIII = { fill: 'yellow', fontSize: '20px' } //設定style屬性

    playerdied = game.add.sprite(195, 140, 'playerdied');
    playerdied.animations.add('playerdied', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13.14, 15], 8);
    playerdied.visible = false;   //跳出死亡的字遊戲剛開始顯示是false等真的死後會變true跳出


    text_HP = game.add.text(19, 25, '', style);           //貼加文字在固定位置並吃style設定 
    // text_Bonus = game.add.text(445, 60, 'Bonus:', styleII); //積分
    text_over = game.add.text(98, 250, '點擊畫面重新開始', styleIII);  //添加死亡後跳出的字
    text_over.visible = false;   //跳出死亡的字遊戲剛開始顯示是false等真的死後會變true跳出

    text_point = game.add.text(295, 25, '', style);
    text_Bonus = game.add.text(263, 50, '', styleII);



    // start = game.add.sprite(0, 0, 'start');


}

function update() {   //每秒都要偵測的部分 (持續更改)
    if (isCanPlay == 'true') {

        StartPlace();
        updatePlatforms();   //呼叫更新磚塊
        starOpen();


        this.physics.arcade.collide(player, [leftWall, rightWall]); //碰撞偵測 玩家跟左右牆
        // this.physics.arcade.collide(player, [platform]); //單塊碰撞偵測 玩家跟磚塊
        this.physics.arcade.collide(player, platforms, back); //碰撞偵測(陣列) 玩家跟磚塊   back是call back funtion
        this.physics.arcade.collide(player, orin); //碰撞偵測 玩家跟初始磚塊
        this.physics.arcade.collide(player, many_star, star_back); //碰撞偵測(陣列) 玩家跟星星


        // if (keyboard.left.isDown) {
        //     player.body.velocity.x = -200;
        //     player.animations.play('left');

        // } else if (keyboard.right.isDown) {
        //     player.body.velocity.x = 200;
        //     player.animations.play('right');

        // } else {
        //     player.body.velocity.x = 0;
        //     player.frame = 4;    //不動的時候 frame停留在第4張
        // }


        left_move = game.add.button(20, 440, 'left', leftOnClick, this);  //建左按鈕
        right_move = game.add.button(280, 440, 'right', rightOnClick, this);  //建右按鈕


        function leftOnClick() {
            player.body.velocity.x = -150;
            player.animations.play('left');
        };

        function rightOnClick() {
            // alert(12);
            player.body.velocity.x = 150;
            player.animations.play('right');
        };



        // platform.body.y = platform.body.y - 1;   //給磚塊y方向移動(單塊)

        // for (var i = 0; i < platforms.length; i++) {        //給陣列裡的每個磚塊都給予y方向移動
        //     platforms[i].body.y = platforms[i].body.y - 1;
        // }

        text_HP.setText('HP:' + player.hp);  //對text = game.add.text(19, 25, '', style)  ,往''裡設定文字=player血量初始值
        text_point.setText('B' + point);
        text_Bonus.setText('Bonus:' + Bonus_num);


        checkSpike();    //每幀每秒都偵測是不是碰到頂刺
        checkGameOver(); //每幀每秒都偵測是不是達到遊戲結束的條件



        game.input.onDown.add(function () {
            if (status == 'gameOver') {
                // this.game.state.restart();
                // creatPl = setInterval(createPlatform, speed_time);   //每1200毫秒執行createPlatform這個function
                // isCanPlay = 'true';
                playerdied.visible = false;
                point = 0;
                lastTime = 0;
                Bonus_num = 0;
                text_over.visible = false;  //死亡的字這時候顯示為true
                createPlayer();
                status = 'running';
                orin = game.add.sprite(170, 100, 'normal');
                game.physics.arcade.enable(orin);   //物理引擎
                orin.body.immovable = true;         //不可被推擠對嗎? 對
                orin.height = 20;
                orin.width = 60;
                // window.location.href = "./wenTest1.html";
                c = 0;
                // setTimeout(killbutton, 14);

            }
        });









        speedChange();    //延遲建磚塊速度

        changePoint();    //算分數

        spikesBack();     //碰頂刺後移動
    }


}

function speedChange() {

    //     setInterval(createPlatform, speed_time);   //每600毫秒執行createPlatform這個function

    if (c > 0 && c < 20) {
        clearInterval(creatPl);
        speed_time = 1900;
        creatPl = setInterval(createPlatform, speed_time);
    }
    if (c >= 2000 && c <= 2010) {
        clearInterval(creatPl);
        speed_time = 1200;
        creatPl = setInterval(createPlatform, speed_time);
    }
    if (c > 3000 && c <= 3010) {
        clearInterval(creatPl);
        speed_time = 900;
        creatPl = setInterval(createPlatform, speed_time);
    }
}



function starOpen() {
    for (var i = 0; i < many_star.length; i++) {        //給陣列裡的每個磚塊都給予y方向移動
        if (c < 2000 && star_type == 'open') {
            many_star[i].body.y = many_star[i].body.y - 1;
            // star[i].body.y = star[i].body.y - 1;
            if (many_star[i].body.y < 52) {     //當方塊超出範圍
                many_star[i].destroy();        //消除磚塊
                many_star.splice(i, 1);     //讓i位置磚塊從陣列中移除1個

            };
        }
        if (c >= 2000 && c <= 3000 && star_type == 'open') {
            many_star[i].body.y = many_star[i].body.y - 2;
            if (many_star[i].body.y < 52) {     //當方塊超出範圍
                many_star[i].destroy();        //消除磚塊
                many_star.splice(i, 1);     //讓i位置磚塊從陣列中移除1個
            };
        }
        if (c >= 3000 && star_type == 'open') {
            many_star[i].body.y = many_star[i].body.y - 3;
            if (many_star[i].body.y < 52) {     //當方塊超出範圍
                many_star[i].destroy();        //消除磚塊
                many_star.splice(i, 1);     //讓i位置磚塊從陣列中移除1個
            };
        }
    };
}





function changePoint() {       //分數計算
    if (status == 'running' && c > lastTime + 100) {  //等於1800毫秒後就point+1
        lastTime = c;            //重新計算時間基準
        point = point + 1;
    }
}



function createPlayer() {
    player = game.add.sprite(150, 31, 'player');
    game.physics.arcade.enable(player);   //物理引擎
    player.animations.add('left', [0, 1, 2, 3], 8);   //取張數 幾幀切換
    player.animations.add('right', [5, 6, 7, 8], 8);
    player.tableTime = 0;
    player.body.gravity.y = 500;   //給重力
    player.hp = 10;                //初始血量10滴
    player.touchOn = undefined;    //偵測是否踩到
}





function createPlatform() {         //創磚塊
    // platform = game.add.sprite(170, 300, 'normal');
    // platform.height = 20;
    // game.physics.arcade.enable(platform);   //物理引擎
    // platform.body.immovable = true;         //不可被推擠對嗎? 對



    //個別磚塊建立法//
    // var platform1 = game.add.sprite(170, 300, 'normal');
    // game.physics.arcade.enable(platform1);
    // platform1.body.immovable = true;

    // var platform2 = game.add.sprite(170, 400, 'normal');
    // game.physics.arcade.enable(platform2);
    // platform2.body.immovable = true;

    // var platform3 = game.add.sprite(170, 500, 'normal');
    // game.physics.arcade.enable(platform3);
    // platform3.body.immovable = true;


    // platform1.height = 20;
    // platform2.height = 20;
    // platform3.height = 20;

    // platforms.push(platform1);    //推進陣列中
    // platforms.push(platform2);
    // platforms.push(platform3);
    //個別磚塊建立法//


    var rand_type = Math.random() * 100;   //0~100 後面好打code
    var rand_box = Math.random() * 100;
    var rand_line = Math.random() * 80 + 1;
    var rand = Math.random() * (350 - 120 - 34 - 33) + 33;  //Math.random()是0~0.9999 乘500=0~500,139是格寬,34是兩個牆寬,33是人寬,最後加33是為了最小數可以是33
    var rand_y = Math.random() * (400 - 370) + 400;

    if (rand_type < 20) {
        platform = game.add.sprite(rand, rand_y, 'normal');
        platform.height = 20;
        if (rand_box < 50) {
            star_type = 'open';
            star = game.add.sprite(rand + rand_line, rand_y - 21, 'star');
            game.physics.arcade.enable(star);    //星星物理引擎
            star.body.immovable = true;          //星星不可被推擠對嗎? 對
            many_star.push(star);
        }


    } else if (rand_type < 30) {
        platform = game.add.sprite(rand, rand_y, 'nails');
        game.physics.arcade.enable(platform);
        platform.body.setSize(96, 15, 0, 15);
        if (rand_box < 50) {
            star_type = 'open';
            star = game.add.sprite(rand + rand_line, rand_y - 9, 'star');
            game.physics.arcade.enable(star);    //星星物理引擎
            star.body.immovable = true;          //星星不可被推擠對嗎? 對
            many_star.push(star);
        }
        // star_type = 'close';
    } else if (rand_type < 40) {
        platform = game.add.sprite(rand, rand_y, 'fake');
        platform.animations.add('turn', [1, 2, 3, 4, 5, 0], 16);
        // star_type = 'close';
    } else if (rand_type < 60) {
        platform = game.add.sprite(rand, rand_y, 'conveyorRight');
        platform.animations.add('scroll', [0, 1, 2, 3], 16, true);   //true為是否連續撥放
        platform.play('scroll');
        if (rand_box < 50) {
            star_type = 'open';
            star = game.add.sprite(rand + rand_line, rand_y - 21, 'star');
            game.physics.arcade.enable(star);    //星星物理引擎
            star.body.immovable = true;          //星星不可被推擠對嗎? 對
            many_star.push(star);
        }
        // star_type = 'close';
    } else if (rand_type < 80) {
        platform = game.add.sprite(rand, rand_y, 'conveyorLeft');
        platform.animations.add('scroll', [0, 1, 2, 3], 16, true);   //true為是否連續撥放
        platform.play('scroll');
        if (rand_box < 50) {
            star_type = 'open';
            star = game.add.sprite(rand + rand_line, rand_y - 21, 'star');
            game.physics.arcade.enable(star);    //星星物理引擎
            star.body.immovable = true;          //星星不可被推擠對嗎? 對
            many_star.push(star);
        }
        // star_type = 'close';
    } else {
        platform = game.add.sprite(rand, rand_y, 'trampoline');
        platform.animations.add('jump', [1, 2, 1, 0, 3, 4, 5, 4, 3, 2, 1, 0], 60);
        platform.frame = 0;
        // star_type = 'close';
    }



    game.physics.arcade.enable(platform);    //物理引擎
    platform.body.immovable = true;          //不可被推擠對嗎? 對

    // game.physics.arcade.enable(star);    //物理引擎
    // star.body.immovable = true;          //不可被推擠對嗎? 對

    platform.width = 96;

    platforms.push(platform);                //推進陣列中  
    // many_star.push(star);


    platform.body.checkCollision.down = false;   //磚塊下方物理碰撞失效
    platform.body.checkCollision.left = false;    //磚塊左方物理碰撞失效
    platform.body.checkCollision.right = false;    //磚塊右方物理碰撞失效

}





function creatBounders() {                             //創牆跟頂刺
    leftWall = game.add.sprite(0, 0, 'wall');//創左牆
    game.physics.arcade.enable(leftWall);   //物理引擎
    leftWall.body.immovable = true;         //不可被推擠


    rightWall = game.add.sprite(333, 0, 'wall');//創右牆
    game.physics.arcade.enable(rightWall);   //物理引擎
    rightWall.body.immovable = true;         //不可被推擠對嗎? 對


    leftWall.height = 500;
    rightWall.height = 500;

    spikes = game.add.group();             //頂刺 群組建立

    spikes.create(0, 0, 'spike');
    spikes.create(70, 0, 'spike');
    spikes.create(140, 0, 'spike');
    spikes.create(210, 0, 'spike');
    spikes.create(280, 0, 'spike');
    spikes.create(350, 0, 'spike');
    spikes.create(420, 0, 'spike');
    spikes.create(490, 0, 'spike');
    spikes.create(560, 0, 'spike');
    spikes.create(630, 0, 'spike');

    spikes.width = 550;
    spikes.height = 60;    //刺長
};

function updatePlatforms() {
    for (var i = 0; i < platforms.length; i++) {        //給陣列裡的每個磚塊都給予y方向移動
        if (c < 2000) {
            platforms[i].body.y = platforms[i].body.y - 1;
            // star[i].body.y = star[i].body.y - 1;
            if (platforms[i].body.y < 52) {     //當方塊超出範圍
                platforms[i].destroy();        //消除磚塊
                platforms.splice(i, 1);     //讓i位置磚塊從陣列中移除1個

            };
        }
        if (c >= 2000 && c <= 3000) {
            platforms[i].body.y = platforms[i].body.y - 2;
            if (platforms[i].body.y < 52) {     //當方塊超出範圍
                platforms[i].destroy();        //消除磚塊
                platforms.splice(i, 1);     //讓i位置磚塊從陣列中移除1個
            };
        }
        if (c >= 3000) {
            platforms[i].body.y = platforms[i].body.y - 3;
            if (platforms[i].body.y < 52) {     //當方塊超出範圍
                platforms[i].destroy();        //消除磚塊
                platforms.splice(i, 1);     //讓i位置磚塊從陣列中移除1個
            };
        }
    };

}


function back(player, platform) {
    // console.log(plat.keyform);        //踩到每塊都可以console.log看
    if (platform.key == 'conveyorRight') {     //踩到右輪帶
        player.body.x = player.body.x + 2;
        // console.log(player.touchOn);
    };
    if (platform.key == 'conveyorLeft') {      //踩到左輪帶
        player.body.x = player.body.x - 2;
        // console.log(player.touchOn);

    };
    if (platform.key == 'trampoline') {        //踩到彈簧
        player.body.velocity.y = -300;
        platform.play('jump');
        // console.log(player.touchOn);

    };
    if (platform.key == 'nails') {             //踩到刺
        // console.log(player.touchOn);

        if (player.touchOn !== platform) {    //原本是player.touchOn = undefined所以走true

            player.hp = player.hp - 1;
            game.camera.flash(0xff0000, 100);   //碰到頂刺後 畫面閃紅色光

            player.touchOn = platform;
        }
    }
    if (platform.key == 'normal') {
        // console.log(player.touchOn);

        if (player.touchOn !== platform) {
            if (player.hp < 10) {
                player.hp = player.hp + 1;
            }
            player.touchOn = platform;
        }
    }
    if (platform.key == 'fake') {
        if (player.touchOn !== platform) {
            platform.animations.play('turn');              //播放翻轉動畫
            setTimeout(function () {                       //設定時間不要一碰到馬上穿
                platform.body.checkCollision.up = false;   //取消上半部的碰撞 讓人物穿過去
            }, 100);
            player.touchOn = platform;
        }
    }

}



function star_back(player, star) {
    if (star.key == 'star') {
        // star.inputEnabled = false;
        // star.body.setSize(96, 15, 0, 15);
        // star.disableBody(true, true);
        Bonus_num = Bonus_num + 1;
        star.kill();
    }
}



function spikesBack() {      //碰頂刺會被推
    if (player.body.y < 30) {
        player.body.y = 50;
    }
}


function checkSpike() {      //偵測碰到頂刺
    if (player.body.y < 30) {           //當角色y位置低於60,60就是天花板刺的高,所以低於的時候等於碰到了
        //game.time.now是遊戲進行時間,player.tableTime給值過等於0,所以game.time.now一定大於player.tableTime,因為遊戲一開始不可能碰到
        if (game.time.now > player.tableTime) {
            //這時候game.time.now就大於不了player.tableTime,2000是兩秒,兩秒過後又大於了所以不扣血,意思就是碰到頂刺扣血可以無敵兩秒     
            player.tableTime = game.time.now + 2000;
            game.camera.flash(0xff0000, 100);   //碰到頂刺後 畫面閃紅色光

            player.hp = player.hp - 3;
        }
    }
}

function checkGameOver() {    //偵測遊戲結束
    if (player.body.y > 550 || player.hp <= 0) { //角色墜落超過畫面或是血低於等於0
        over();
    }
}

function over() {
    text_over.visible = true;  //死亡的字這時候顯示為true
    playerdied.visible = true;  //死亡的字這時候顯示為true

    // for (let i = 0; i < platforms.length; i++) {
    //     platforms[i].destroy(); //清空畫面上的建立磚塊陣列
    // }
    // status = 'gameOver';

    platforms.forEach(function (s) { s.destroy() });
    platforms = [];
    many_star.forEach(function (s) { s.destroy() });
    many_star = [];
    status = 'gameOver';
    if (status == 'gameOver') {
        playerdied.animations.play('playerdied');
    }

}



function StartPlace() {   //初始站立磚塊消除
    if (c > 300 && c < 400) {
        orin.destroy();
    }
}

var c = 0
var t
function timedCount() {
    document.getElementById('txt').value = c
    // document.getElementById('scroe').value = point;
    // document.getElementById('bouns').value = Bonus_num;
    sendP = document.getElementById('totalPo').innerText = parseInt(point) + parseInt(Bonus_num);
    c = c + 10
    t = setTimeout("timedCount()", 100)
}

function killbutton() {
    button.kill();
    gamerules.kill();
    // gamerules.visible = false;
}





