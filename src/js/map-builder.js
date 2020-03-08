window.addEventListener('DOMContentLoaded', (e) => {
    const items = document.getElementById('items');
    const map = document.getElementById('map');
    const menu = document.getElementById('menu');
    const itemsTab = [];
    var mapTab = [];
    const img = new Image();
    img.src = './data/img/sprites1.png';
    img.addEventListener('load', function () {
        new Generator(this, 27);
    });

    class Generator {
        constructor(img, size) {
            this.img = img;
            this.size = size;
            this.genLeft(img, size);
        }
        genLeft(img, size) {
            for (let y = 0; y < 40; y++) {
                itemsTab.push([]);
                for (let x = 0; x <= 15; x++) {
                    this.drawItemsTile(x, y, img, size);
                    itemsTab[y].push({
                        x: x,
                        y: y,
                    })
                }
            }
            console.table(itemsTab);
            this.genRight(size);
        }
        genRight(size) {
            for (let y = 0; y < 30; y++) {
                mapTab.push([]);
                for (let x = 0; x <= 27; x++) {
                    this.drawMapTile(x, y, size);
                    mapTab[y].push({
                        x: x,
                        y: y,
                        isSelected: null,
                    })
                }
            }
            console.log(mapTab)
        }
        drawItemsTile(x, y, img, size) {
            const canvas = document.createElement('canvas');
            const xx = x; const yy = y;
            canvas.addEventListener('click', function () { tiles.selectSingleItemTile(xx, yy) });
            canvas.classList.add('item');
            canvas.style.left = x * size + 'px';
            canvas.style.top = y * size + 40 + 'px';
            this.drawImg(x, y, img, canvas);
            items.appendChild(canvas);
        }
        drawMapTile(x, y, size) {
            const canvas = document.createElement('canvas');
            const xx = x; const yy = y;
            canvas.addEventListener('click', function () { tiles.selectSingleMapTile(xx, yy) });
            canvas.classList.add('mapTile');
            canvas.style.left = x * size + 'px';
            canvas.style.top = y * size + 40 + 'px';
            map.appendChild(canvas);
        }
        drawImg(x, y, img, canvas) {
            let ctx = canvas.getContext('2d');
            if (y < 20) {
                ctx.drawImage(img, 1 + x * 48, 1 + y * 48, 46, 46, 1, 1, canvas.width, canvas.height);
            }
            else if (y >= 20) {
                ctx.drawImage(img, 769 + x * 48, 1 + (y - 20) * 48, 46, 46, 1, 1, canvas.width, canvas.height);
            }
        }
    }
    class Utilities {
        constructor() { }

        toggleMenu(command) {
            menu.style.display = command === "show" ? "block" : "none";
            menuVisible = !menuVisible;
        };

        setMenuPosition({ top, left }) {
            menu.style.left = `${left}px`;
            menu.style.top = `${top}px`;
            this.toggleMenu("show");
        };
    };
    class Tiles {
        constructor() { }

        selectSingleItemTile(x, y) {
            console.log('Item x: ' + x + ' y: ' + y);
        }

        selectSingleMapTile(x, y) {
            console.log('tile x: ' + x + ' y: ' + y);
            const tile = document.getElementById(`x_${x}y_${y}`)
        }

    }
    let tiles = new Tiles;
    let utilities = new Utilities;
    let menuVisible = false;

    // EVENT LISTENING
    window.addEventListener('click', e => {
        if (menuVisible) {
            utilities.toggleMenu('hide');
        }
    });
    window.addEventListener('contextmenu', e => {
        e.preventDefault();
        const origin = { left: e.pageX, top: e.pageY };
        utilities.setMenuPosition(origin);
    });
    window.addEventListener('keydown', e => {
        console.log(e);
        if (e.keyCode === 27) {
            utilities.toggleMenu('hide');
        }
    })
});

