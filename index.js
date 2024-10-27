const ROWS = 6;
const COLS = 6;
const BLOCK_SIZe = 50;
const COOLDOWN = 1000;

let isFlipped = false;

function createTiles(row, col) {
  const tile = document.createElement("div");
  tile.className = "tile";
  tile.innerHTML = `
          <div class="tile-face tile-front"> </div>
          <div class="tile-face tile-back"> </div>
      `;

  const bgposition = `${col * 20}% ${row * 20}%`;
  tile.querySelector(".tile-front").style.backgroundPosition = bgposition;
  tile.querySelector(".tile-back").style.backgroundPosition = bgposition;

  return tile;
}

function createBoard() {
  const board = document.querySelector(".board");
  for (let i = 0; i < ROWS; i++) {
    const row = document.createElement("div");
    row.className = "row";
    for (let j = 0; j < COLS; j++) {
      row.appendChild(createTiles(i, j));
    }
    board.append(row);
  }
}

function initializeTileAnimations() {
  const tiles = document.querySelectorAll(".tile");
  tiles.forEach((tile, index) => {
    let lastentertime = 0;

    tile.addEventListener("mouseenter", () => {
      const currentTime = Date.now();
      if (currentTime - lastentertime > COOLDOWN) {
        lastentertime = currentTime;

        let tiltY;
        if (index % 6 === 0) {
          tiltY = -40;
        } else if (index % 6 === 5) {
          tiltY = 40;
        } else if (index % 6 === 1) {
          tiltY = -20;
        } else if (index % 6 === 4) {
          tiltY = 20;
        } else if (index % 6 === 2) {
          tiltY = -10;
        } else {
          tiltY = 10;
        }

        animateTIle(tile, tiltY);
      }
    });
  });

  const flipbutton = document.getElementById("flipbutton");

  flipbutton.addEventListener("click", () => {
    flipAllTiles(tiles);
  });
}

function animateTIle(tile, tiltY) {
  gsap
    .timeline()
    .set(tile, { rotateX: isFlipped ? 180 : 0, rotateY: 0 })
    .to(tile, {
      rotateX: isFlipped ? 450 : 270,
      rotateY: tiltY,
      duration: 0.5,
      ease: "power2.out",
    })
    .to(
      tile,
      {
        rotateX: isFlipped ? 540 : 360,
        rotateY: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.25"
    );
}

function flipAllTiles(tiles) {
  isFlipped = !isFlipped;
  gsap.to(tiles, {
    rotateX: isFlipped ? 180 : 0,
    duration: 1,
    stagger: {
      amount: 0.5,
      from: "random",
    },
    ease: "power2.inOut",
  });
}

function init() {
  createBoard();
  initializeTileAnimations();
}

document.addEventListener("DOMContentLoaded", init);
