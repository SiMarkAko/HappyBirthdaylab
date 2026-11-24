/* =========================================================
   BIRTHDAY SURPRISE WEBSITE
   Made with ❤️ by Mark

   =========================================================

   CHANGE THIS ONE LINE FOR THE RECIPIENT

   Example:

   const RECIPIENT_NAME = "Suuuuuuu";

   ========================================================= */


/* =========================================================
   RECIPIENT
========================================================= */

const RECIPIENT_NAME = "Eubby";


/* =========================================================
   GET ELEMENTS
========================================================= */

const intro =
    document.getElementById("intro");

const treeScreen =
    document.getElementById("treeScreen");

const memories =
    document.getElementById("memories");

const pokemonScreen =
    document.getElementById("pokemonScreen");

const finalScreen =
    document.getElementById("finalScreen");


const startButton =
    document.getElementById("startButton");

const continueButton =
    document.getElementById("continueButton");

const pokemonButton =
    document.getElementById("pokemonButton");

const finalButton =
    document.getElementById("finalButton");


const moreScreen =
    document.getElementById("moreScreen");


const music =
    document.getElementById("birthdayMusic");


const musicToggle =
    document.getElementById("musicToggle");


const musicIcon =
    document.getElementById("musicIcon");


/* Poké Ball */

const pokemonIntro =
    document.getElementById("pokemonIntro");

const pokeball =
    document.getElementById("pokeball");

const photoReveal =
    document.getElementById("photoReveal");


const partyPoppers =
    document.getElementById("partyPoppers");

const partyConfetti =
    document.getElementById("partyConfetti");


/* =========================================================
    INSERT RECIPIENT NAME
========================================================= */

function setRecipientName() {

    document.title =
        `Happy Birthday ${RECIPIENT_NAME} ❤️`;


    const introName =
        document.getElementById(
            "introName"
        );


    const finalName =
        document.getElementById(
            "finalName"
        );


    if (introName) {

        introName.textContent =
            RECIPIENT_NAME;

    }


    if (finalName) {

        finalName.textContent =
            RECIPIENT_NAME;

    }


    document
        .querySelectorAll(
            ".recipient-name"
        )
        .forEach(
            element => {

                element.textContent =
                    RECIPIENT_NAME;

            }
        );

}


setRecipientName();


/* =========================================================
   SCREEN SWITCH
========================================================= */

function showScreen(screen) {

    if (!screen) {
        return;
    }


    document
        .querySelectorAll(".screen")
        .forEach(
            screenItem => {

                screenItem.classList.remove(
                    "active"
                );

            }
        );


    screen.classList.add(
        "active"
    );


    /*
       Stop the tree loop once the
       tree screen is left, so the
       canvas no longer burns CPU.
    */

    if (screen !== treeScreen) {

        treeRunning = false;

    }

}


/* =========================================================
   MUSIC
========================================================= */

function startMusic() {

    if (!music) {
        return;
    }


    music.volume =
        0.45;


    music
        .play()
        .catch(
            error => {

                console.log(
                    "Music could not autoplay:",
                    error
                );

            }
        );


    if (musicToggle) {

        musicToggle.classList.add(
            "visible"
        );

    }

}


/* =========================================================
   MUSIC TOGGLE
======================================================== */

if (musicToggle) {

    musicToggle.addEventListener(
        "click",
        () => {

            if (!music) {
                return;
            }


            if (music.paused) {

                music.play().catch(
                    () => {}
                );

                musicToggle.classList.remove(
                    "muted"
                );

                musicToggle.setAttribute(
                    "aria-pressed",
                    "true"
                );

                if (musicIcon) {

                    musicIcon.textContent =
                        "🔊";

                }

            } else {

                music.pause();

                musicToggle.classList.add(
                    "muted"
                );

                musicToggle.setAttribute(
                    "aria-pressed",
                    "false"
                );

                if (musicIcon) {

                    musicIcon.textContent =
                        "🔇";

                }

            }

        }
    );

}


/* =========================================================
   START BUTTON
========================================================= */

startButton.addEventListener(
    "click",
    function () {


        /*
           Start music after the
           user's button click.
        */

        startMusic();


        /*
           Immediately move
           to the tree screen.
        */

        showScreen(
            treeScreen
        );


        /*
           Start tree animation.
        */

        setTimeout(
            startTreeAnimation,
            300
        );

    }
);


/* =========================================================
   TREE CANVAS
========================================================= */

const canvas =
    document.getElementById(
        "treeCanvas"
    );


const ctx =
    canvas.getContext("2d");


let width =
    window.innerWidth;


let height =
    window.innerHeight;


let branches = [];

let hearts = [];

let particles = [];

let treeProgress = 0;

let treeStarted = false;

let treeRunning = false;


/* =========================================================
   CANVAS RESIZE
========================================================= */

function resizeCanvas() {

    const ratio =
        window.devicePixelRatio || 1;


    width =
        window.innerWidth;


    height =
        window.innerHeight;


    canvas.width =
        width * ratio;


    canvas.height =
        height * ratio;


    canvas.style.width =
        width + "px";


    canvas.style.height =
        height + "px";


    ctx.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
    );


    /*
       Rebuild the tree for the new
       size, otherwise it stays
       anchored to the old viewport.
    */

    if (treeStarted) {

        createTree();

        createHearts();

    }

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


/* =========================================================
   CREATE BRANCH
========================================================= */

function createBranch(
    x,
    y,
    length,
    angle,
    thickness,
    depth
) {


    if (depth <= 0) {
        return;
    }


    const endX =
        x +
        Math.cos(angle) *
        length;


    const endY =
        y +
        Math.sin(angle) *
        length;


    branches.push({

        x1: x,

        y1: y,

        x2: endX,

        y2: endY,

        thickness: thickness,

        progress: 0

    });


    const nextLength =
        length * 0.72;


    const spread =
        0.48;


    createBranch(
        endX,
        endY,
        nextLength,
        angle - spread,
        thickness * 0.68,
        depth - 1
    );


    createBranch(
        endX,
        endY,
        nextLength,
        angle + spread,
        thickness * 0.68,
        depth - 1
    );

}


/* =========================================================
   CREATE TREE
========================================================= */

function createTree() {

    branches = [];


    const baseX =
        width / 2;


    const baseY =
        Math.min(
            height * 0.90,
            720
        );


    createBranch(
        baseX,
        baseY,
        height * 0.28,
        -Math.PI / 2,
        14,
        7
    );

}


/* =========================================================
   CREATE HEARTS
========================================================= */

function createHearts() {

    hearts = [];


    branches.forEach(
        (branch, index) => {


            if (
                index % 2 !== 0
            ) {

                return;

            }


            const t =
                Math.random() *
                0.85 +
                0.08;


            const x =
                branch.x1 +
                (
                    branch.x2 -
                    branch.x1
                ) *
                t;


            const y =
                branch.y1 +
                (
                    branch.y2 -
                    branch.y1
                ) *
                t;


            hearts.push({

                x: x,

                y: y,

                size:
                    Math.random() *
                    5 +
                    4,

                delay:
                    Math.random() *
                    0.7,

                opacity:
                    0

            });

        }
    );

}


/* =========================================================
   PARTICLES
========================================================= */

function createParticles() {

    particles = [];


    for (
        let i = 0;
        i < 120;
        i++
    ) {

        particles.push({

            x:
                Math.random() *
                width,

            y:
                Math.random() *
                height,

            size:
                Math.random() *
                2 +
                0.5,

            speed:
                Math.random() *
                0.4 +
                0.1,

            opacity:
                Math.random() *
                0.5 +
                0.2

        });

    }

}


/* =========================================================
   DRAW HEART
========================================================= */

function drawHeart(
    x,
    y,
    size,
    opacity
) {

    ctx.save();


    ctx.translate(
        x,
        y
    );


    ctx.scale(
        size,
        size
    );


    ctx.beginPath();


    ctx.moveTo(
        0,
        0.3
    );


    ctx.bezierCurveTo(
        -1.2,
        -0.5,
        -0.7,
        -1.5,
        0,
        -0.8
    );


    ctx.bezierCurveTo(
        0.7,
        -1.5,
        1.2,
        -0.5,
        0,
        0.3
    );


    ctx.closePath();


    ctx.fillStyle =
        `rgba(
            255,
            70,
            145,
            ${opacity}
        )`;


    ctx.shadowColor =
        "rgba(255,70,150,.9)";


    ctx.shadowBlur =
        12;


    ctx.fill();


    ctx.restore();

}


/* =========================================================
   DRAW PARTICLES
========================================================= */

function drawParticles() {

    particles.forEach(
        particle => {


            particle.y -=
                particle.speed;


            if (
                particle.y < -10
            ) {

                particle.y =
                    height + 10;

            }


            ctx.beginPath();


            ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                `rgba(
                    255,
                    190,
                    220,
                    ${particle.opacity}
                )`;


            ctx.fill();

        }
    );

}


/* =========================================================
   DRAW TREE
========================================================= */

function drawTree() {

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    drawParticles();


    /* Ground */

    const ground =
        ctx.createRadialGradient(
            width / 2,
            height * 0.90,
            0,
            width / 2,
            height * 0.90,
            300
        );


    ground.addColorStop(
        0,
        "rgba(255,60,150,.25)"
    );


    ground.addColorStop(
        1,
        "rgba(255,60,150,0)"
    );


    ctx.fillStyle =
        ground;


    ctx.fillRect(
        0,
        height * 0.72,
        width,
        height * 0.28
    );


    /* Branches */

    branches.forEach(
        (branch, index) => {


            branch.progress =
                Math.min(
                    1,
                    treeProgress -
                    (
                        index /
                        branches.length
                    ) *
                    0.30
                );


            if (
                branch.progress <= 0
            ) {

                return;

            }


            const x =
                branch.x1 +
                (
                    branch.x2 -
                    branch.x1
                ) *
                branch.progress;


            const y =
                branch.y1 +
                (
                    branch.y2 -
                    branch.y1
                ) *
                branch.progress;


            ctx.beginPath();


            ctx.moveTo(
                branch.x1,
                branch.y1
            );


            ctx.lineTo(
                x,
                y
            );


            ctx.strokeStyle =
                "rgba(110,65,75,.95)";


            ctx.lineWidth =
                branch.thickness;


            ctx.lineCap =
                "round";


            ctx.stroke();

        }
    );


    /* Hearts */

    hearts.forEach(
        heart => {


            if (
                treeProgress <
                heart.delay
            ) {

                return;

            }


            heart.opacity =
                Math.min(
                    1,
                    heart.opacity +
                    0.025
                );


            const pulse =
                1 +
                Math.sin(
                    Date.now() *
                    0.003 +
                    heart.x
                ) *
                0.08;


            drawHeart(
                heart.x,
                heart.y,
                heart.size * pulse,
                heart.opacity
            );

        }
    );


    if (
        treeStarted
    ) {

        treeProgress =
            Math.min(
                1.25,
                treeProgress +
                0.006
            );

    }


    if (
        treeRunning
    ) {

        requestAnimationFrame(
            drawTree
        );

    }

}


/* =========================================================
   START TREE
========================================================= */

function startTreeAnimation() {

    if (
        treeStarted
    ) {

        return;

    }


    treeStarted =
        true;


    treeRunning =
        true;


    treeProgress =
        0;


    createTree();


    createHearts();


    createParticles();


    drawTree();


    setTimeout(
        showBirthdayMessage,
        2500
    );

}


/* =========================================================
   BIRTHDAY MESSAGE
========================================================= */

function showBirthdayMessage() {

    const container =
        document.getElementById(
            "messageLines"
        );


    container.style.display =
        "block";


    const lines =
        container.querySelectorAll(
            "p"
        );


    lines.forEach(
        (line, index) => {


            setTimeout(
                () => {

                    line.classList.add(
                        "show"
                    );

                },

                index * 750

            );

        }
    );


    setTimeout(
        () => {

            continueButton.classList.add(
                "visible"
            );

        },

        lines.length *
        750 +
        600

    );

}


/* =========================================================
   TREE → MEMORIES
========================================================= */

continueButton.addEventListener(
    "click",
    () => {

        showScreen(
            memories
        );

    }
);


/* =========================================================
   MEMORIES → POKÉ BALL
========================================================= */

pokemonButton.addEventListener(
    "click",
    () => {

        showScreen(
            pokemonScreen
        );

    }
);


/* =========================================================
   POKÉ BALL
========================================================= */

let pokeballOpened =
    false;

let partyPoppersFired =
    false;


/* Click */

pokeball.addEventListener(
    "click",
    openPokeball
);


/* Keyboard */

pokeball.addEventListener(
    "keydown",
    event => {


        if (
            event.key === "Enter" ||
            event.key === " "
        ) {


            event.preventDefault();


            openPokeball();

        }

    }
);


/* =========================================================
   OPEN POKÉ BALL
========================================================= */

function openPokeball() {


    if (
        pokeballOpened
    ) {

        return;

    }


    pokeballOpened =
        true;


    /*
       Start Poké Ball animation.
    */

    pokeball.classList.add(
        "open"
    );


    /*
       Hide the ENTIRE Poké Ball intro.

       This is the important fix.

       It removes:

       - One last surprise
       - Something special...
       - Poké Ball
       - Tap the Poké Ball
    */

    setTimeout(
        () => {

            pokemonIntro.classList.add(
                "hide"
            );

        },

        120
    );


    /*
       Explosion.
    */

    createEnergyExplosion();


    setTimeout(
        celebrateWithPartyPoppers,
        180
    );


    /*
        Photo.
    */

    setTimeout(
        () => {

            photoReveal.classList.add(
                "show"
            );

        },

        220
    );

}


/* =========================================================
   ENERGY EXPLOSION
========================================================= */

function createEnergyExplosion() {


    const symbols = [

        "⚡",
        "✨",
        "💖",
        "❤️",
        "⭐",
        "🌸",
        "💫"

    ];


    for (
        let i = 0;
        i < 65;
        i++
    ) {


        const element =
            document.createElement(
                "div"
            );


        element.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        element.style.position =
            "fixed";


        element.style.left =
            "50%";


        element.style.top =
            "50%";


        element.style.zIndex =
            "200";


        element.style.pointerEvents =
            "none";


        element.style.fontSize =
            (
                Math.random() *
                20 +
                10
            ) +
            "px";


        element.style.transition =
            "transform 1.4s ease-out, opacity 1.4s ease-out";


        document.body.appendChild(
            element
        );


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            100 +
            Math.random() *
            350;


        const x =
            Math.cos(angle) *
            distance;


        const y =
            Math.sin(angle) *
            distance;


        requestAnimationFrame(
            () => {


                element.style.transform =
                    `translate(
                        ${x}px,
                        ${y}px
                    )
                    scale(
                        ${Math.random() + .5}
                    )`;


                element.style.opacity =
                    "0";

            }
        );


        setTimeout(
            () => {

                element.remove();

            },

            1600

        );

    }

}


/* =========================================================
   PHOTO → FINAL
========================================================= */

function celebrateWithPartyPoppers() {

    if (partyPoppersFired) {
        return;
    }

    partyPoppersFired =
        true;

    if (
        !partyPoppers ||
        !partyConfetti
    ) {

        return;

    }


    const mouths =
        partyPoppers.querySelectorAll(
            ".popper-rim"
        );


    const layerRect =
        partyConfetti.getBoundingClientRect();


    const origins =
        Array.from(mouths).map(
            mouth => {

                const rect =
                    mouth.getBoundingClientRect();

                return {

                    x:
                        rect.left +
                        rect.width / 2 -
                        layerRect.left,

                    y:
                        rect.top +
                        rect.height / 2 -
                        layerRect.top

                };

            }
        );


    partyPoppers.classList.add(
        "active"
    );


    origins.forEach(
        (origin, index) => {

            launchPartyBurst(
                origin,
                index === 0 ? 1 : -1
            );

        }
    );


    setTimeout(
        () => {

            partyPoppers.classList.add(
                "fading"
            );

        },

        2200
    );


    setTimeout(
        () => {

            partyPoppers.classList.remove(
                "active",
                "fading"
            );

            partyConfetti.innerHTML =
                "";

        },

        2800
    );

}


function launchPartyBurst(
    origin,
    direction
) {

    const palette = [

        "#ff4f8b",

        "#ff3b57",

        "#ffd166",

        "#ffb703",

        "#ffffff",

        "#ffd6e8",

        "#fff3c4",

        "#f7a8c4",

        "#ffe0ef"

    ];


    const mobile =
        window.innerWidth < 700;


    const count =
        mobile ? 45 : 70;


    const power =
        mobile ? .68 : 1;


    const reducedMotion =
        window.matchMedia &&
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const typeRoll =
            Math.random();


        const type =
            typeRoll < .58
                ? "paper"
                : typeRoll < .82
                    ? "streamer"
                    : "spark";


        const piece =
            document.createElement(
                "div"
            );


        piece.className =
            `party-piece party-piece--${type}`;


        piece.style.setProperty(
            "--piece-color",
            palette[
                Math.floor(
                    Math.random() *
                    palette.length
                )
            ]
        );


        piece.style.left =
            origin.x +
            "px";


        piece.style.top =
            origin.y +
            "px";


        partyConfetti.appendChild(
            piece
        );


        if (reducedMotion) {

            setTimeout(
                () => piece.remove(),
                400
            );

            continue;

        }


        const distance =
            (
                120 +
                Math.random() *
                240
            ) *
            power;


        const dx =
            direction *
            (
                .34 +
                Math.random() *
                .78
            ) *
            distance;


        const dy =
            -(
                .78 +
                Math.random() *
                .5
            ) *
            distance;


        const peakX =
            dx *
            .5;


        const peakY =
            dy *
            .75 -
            (
                20 +
                Math.random() *
                45
            ) *
            power;


        const endX =
            dx *
            1.15;


        const endY =
            dy *
            .35 +
            (
                130 +
                Math.random() *
                190
            ) *
            power;


        const spin =
            (
                Math.random() > .5
                    ? 1
                    : -1
            ) *
            (
                360 +
                Math.random() *
                900
            );


        const animation =
            piece.animate(
                [

                    {
                        transform:
                            `translate3d(0px, 0px, 0px)
                             rotate(0deg) scale(.3)`,

                        opacity:
                            1,

                        offset:
                            0,

                        easing:
                            "cubic-bezier(.2,.75,.35,1)"

                    },

                    {
                        transform:
                            `translate3d(
                                ${peakX}px,
                                ${peakY}px,
                                0px
                            )
                            rotate(${spin * .5}deg)
                            scale(1)`,

                        opacity:
                            1,

                        offset:
                            .55,

                        easing:
                            "cubic-bezier(.45,.05,.75,1)"

                    },

                    {
                        transform:
                            `translate3d(
                                ${endX}px,
                                ${endY}px,
                                0px
                            )
                            rotate(${spin}deg)
                            scale(.85)`,

                        opacity:
                            0,

                        offset:
                            1

                    }

                ],
                {

                    duration:
                        1700 +
                        Math.random() *
                        900,

                    delay:
                        90 +
                        Math.random() *
                        160,

                    easing:
                        "linear",

                    fill:
                        "forwards"

                }
            );


        animation.onfinish =
            () => piece.remove();

    }

}


finalButton.addEventListener(
    "click",
    () => {


        showScreen(
            finalScreen
        );


        createConfetti();

    }
);


/* =========================================================
   CONFETTI
========================================================= */

function createConfetti() {


    const container =
        document.getElementById(
            "confetti"
        );


    container.innerHTML =
        "";


    const symbols = [

        "❤️",
        "💕",
        "💖",
        "✨",
        "🌸",
        "🎉",
        "⭐",
        "🎀",
        "⚡"

    ];


    for (
        let i = 0;
        i < 110;
        i++
    ) {


        const piece =
            document.createElement(
                "div"
            );


        piece.className =
            "confetti";


        piece.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        piece.style.left =
            Math.random() *
            100 +
            "vw";


        piece.style.fontSize =
            Math.random() *
            15 +
            8 +
            "px";


        piece.style.animationDuration =
            Math.random() *
            3 +
            3 +
            "s";


        piece.style.animationDelay =
            Math.random() *
            1.5 +
            "s";


        piece.addEventListener(
            "animationend",
            () => piece.remove()
        );


        container.appendChild(
            piece
        );

    }

}



const moreEmojis =
    document.getElementById(
        "moreEmojis"
    );


let moreEmojiTimer =
    null;


function spawnMoreEmoji() {

    if (!moreEmojis) {
        return;
    }


    const emoji =
        document.createElement(
            "span"
        );


    emoji.className =
        "more-emoji";


    emoji.textContent =
        "🥹";


    emoji.style.left =
        (
            Math.random() * 92 +
            4
        ) +
        "%";


    emoji.style.top =
        (
            Math.random() * 86 +
            7
        ) +
        "%";


    emoji.style.fontSize =
        (
            Math.random() * 34 +
            30
        ) +
        "px";


    emoji.style.animationDuration =
        (
            Math.random() * 1.2 +
            1.6
        ) +
        "s";


    emoji.addEventListener(
        "animationend",
        () => emoji.remove()
    );


    moreEmojis.appendChild(
        emoji
    );

}


function startMoreEmojis() {

    if (moreEmojiTimer) {
        return;
    }


    for (
        let i = 0;
        i < 14;
        i++
    ) {

        setTimeout(
            spawnMoreEmoji,
            i * 160
        );

    }


    moreEmojiTimer =
        setInterval(
            spawnMoreEmoji,
            420
        );

}


function stopMoreEmojis() {

    clearInterval(
        moreEmojiTimer
    );


    moreEmojiTimer =
        null;


    if (moreEmojis) {

        moreEmojis.innerHTML =
            "";

    }

}


let pullCooldownUntil =
    0;


function setPullReveal(open) {

    pullCooldownUntil =
        Date.now() + 900;


    showScreen(
        open
            ? moreScreen
            : finalScreen
    );


    if (open) {

        startMoreEmojis();

    } else {

        stopMoreEmojis();

    }

}


let pullStartY =
    null;

let pullHandled =
    false;


function handlePullMove(y) {

    if (
        pullStartY === null ||
        pullHandled ||
        Date.now() < pullCooldownUntil
    ) {

        return;

    }


    const delta =
        pullStartY - y;


    const fromMore =
        moreScreen.classList.contains(
            "active"
        );


    if (delta >= 55) {

        setPullReveal(
            !fromMore
        );

        pullHandled =
            true;

    } else if (
        delta <= -55
    ) {

        setPullReveal(
            false
        );

        pullHandled =
            true;

    }

}


function resetPull() {

    pullStartY =
        null;

    pullHandled =
        false;

}


let wheelArmed =
    true;

let lastWheelAt =
    0;


function handleWheelTransition(action) {

    const now =
        Date.now();


    if (
        now - lastWheelAt > 300
    ) {

        wheelArmed =
            true;

    }


    lastWheelAt =
        now;


    if (!wheelArmed) {
        return;
    }


    wheelArmed =
        false;

    action();

}


if (finalScreen) {

    finalScreen.addEventListener(
        "pointerdown",
        event => {

            if (
                event.target.closest(
                    ".pull-up-hint"
                )
            ) {

                return;

            }


            pullStartY =
                event.clientY;

            pullHandled =
                false;

        }
    );


    finalScreen.addEventListener(
        "pointermove",
        event => {

            handlePullMove(
                event.clientY
            );

        }
    );


    finalScreen.addEventListener(
        "pointerup",
        resetPull
    );


    finalScreen.addEventListener(
        "pointercancel",
        resetPull
    );


    finalScreen.addEventListener(
        "touchstart",
        event => {

            if (
                event.target.closest(
                    ".pull-up-hint"
                )
            ) {

                return;

            }


            pullStartY =
                event.touches[0].clientY;

            pullHandled =
                false;

        },
        { passive: true }
    );


    finalScreen.addEventListener(
        "touchmove",
        event => {

            handlePullMove(
                event.touches[0].clientY
            );

        },
        { passive: true }
    );


    finalScreen.addEventListener(
        "touchend",
        resetPull,
        { passive: true }
    );


    finalScreen.addEventListener(
        "touchcancel",
        resetPull,
        { passive: true }
    );


    /* Mouse wheel / trackpad: scroll up goes to screen 6 */

    finalScreen.addEventListener(
        "wheel",
        event => {

            if (
                finalScreen.scrollTop > 1 ||
                event.deltaY > -20
            ) {

                return;

            }


            handleWheelTransition(
                () => setPullReveal(true)
            );

        },
        { passive: true }
    );

}


/* =========================================================
    SCREEN 6: SWIPE UP / DOWN TO GO BACK
========================================================= */

if (moreScreen) {

    moreScreen.addEventListener(
        "pointerdown",
        event => {

            if (
                event.target.closest(
                    ".outline-button"
                )
            ) {

                return;

            }


            pullStartY =
                event.clientY;

            pullHandled =
                false;

        }
    );


    moreScreen.addEventListener(
        "pointermove",
        event => {

            handlePullMove(
                event.clientY
            );

        }
    );


    moreScreen.addEventListener(
        "pointerup",
        resetPull
    );


    moreScreen.addEventListener(
        "pointercancel",
        resetPull
    );


    moreScreen.addEventListener(
        "touchstart",
        event => {

            if (
                event.target.closest(
                    ".outline-button"
                )
            ) {

                return;

            }


            pullStartY =
                event.touches[0].clientY;

            pullHandled =
                false;

        },
        { passive: true }
    );


    moreScreen.addEventListener(
        "touchmove",
        event => {

            handlePullMove(
                event.touches[0].clientY
            );

        },
        { passive: true }
    );


    moreScreen.addEventListener(
        "touchend",
        resetPull,
        { passive: true }
    );


    moreScreen.addEventListener(
        "touchcancel",
        resetPull,
        { passive: true }
    );


    /* Mouse wheel / trackpad: scroll up returns to screen 5 */

    moreScreen.addEventListener(
        "wheel",
        event => {

            const atBottom =
                moreScreen.scrollTop +
                moreScreen.clientHeight >=
                moreScreen.scrollHeight - 1;


            const goingUp =
                event.deltaY < -20;


            const goingDown =
                event.deltaY > 20 &&
                atBottom;


            if (
                !goingUp &&
                !goingDown
            ) {

                return;

            }


            handleWheelTransition(
                () => setPullReveal(false)
            );

        },
        { passive: true }
    );

}