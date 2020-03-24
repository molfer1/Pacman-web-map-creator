window.addEventListener('DOMContentLoaded', (e) => {
    const items = document.getElementById('items');
    const map = document.getElementById('map');
    const menu = document.getElementById('menu');
    const itemsTab = [];
    var mapTab = [];
    var selectorOrigin;
    const img = new Image();
    img.src = './data/img/sprites1.png';
    img.addEventListener('load', function () {
        new Generator(this, 27);
    })

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
                        isSelected: false,
                        isFilled: false
                    })
                }
            }
        }
        drawItemsTile(x, y, img, size) {
            const canvas = document.createElement('canvas');
            const xx = x; const yy = y;
            canvas.addEventListener('click', function () { tiles.drawInSelectedTiles(xx, yy) });
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
            canvas.id = `c_${x}_${y}`;
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
        }

        setMenuPosition(origin) {
            menu.style.left = `${origin.left}px`;
            menu.style.top = `${origin.top}px`;
            this.toggleMenu("show");
        }
    };
    class Tiles {
        constructor() { }

        drawInSelectedTiles(x, y) {
            console.log('Item x: ' + x + ' y: ' + y);
            for (const raw of mapTab) {
                for (const el of raw) {
                    if (el.isSelected == true) {
                        const tile = document.getElementById(`c_${el.x}_${el.y}`);
                        tile.classList.remove('mapTile', 'selected', 'mapItem');
                        tile.classList.add('mapItem');
                        this.redrawImg(x, y, img, tile);
                        el.isSelected = false;
                        el.isFilled = true;
                    }
                }
            }
        }

        selectSingleMapTile(x, y) {
            console.log('tile x: ' + x + ' y: ' + y);
            const mapTile = document.getElementById(`c_${x}_${y}`);
            if (mapTile.classList.contains('selected')) {
                let index = mapTab[y].findIndex(function (el) { return el.x == x });
                mapTab[y][index].isSelected = false;
                mapTile.classList.remove('selected');
            }
            else {
                const selectedTiles = document.getElementsByClassName('selected');
                let tilesCount = 0;
                for (let i in selectedTiles) {
                    tilesCount++;
                }
                if (tilesCount == 3) {
                    mapTile.classList.add('selected');
                    let index = mapTab[y].findIndex(function (el) { return el.x == x });
                    mapTab[y][index].isSelected = true;
                }
                else if (tilesCount > 3) {
                    if (crtlActive) {
                        mapTile.classList.add('selected');
                        let index = mapTab[y].findIndex(function (el) { return el.x == x });
                        mapTab[y][index].isSelected = true;
                    }
                    else {
                        return;
                    }
                }

            }
        }
        selectMultipleMapTiles() {
            if (selectorActive) {
                const selector = document.getElementById('selectorField');
                selector.style.display = 'block';
                selector.style.left = `${selectorOrigin.left}px`;
                selector.style.top = `${selectorOrigin.top}px`;
            }
        }
        redrawImg(x, y, img, canvas) {
            let ctx = canvas.getContext('2d');
            if (y < 20) {
                ctx.drawImage(img, 1 + x * 48, 1 + y * 48, 46, 46, 1, 1, canvas.width, canvas.height);
            }
            else if (y >= 20) {
                ctx.drawImage(img, 769 + x * 48, 1 + (y - 20) * 48, 46, 46, 1, 1, canvas.width, canvas.height);
            }
        }
        getTileIndex() { }
    }
    let utilities = new Utilities;
    let tiles = new Tiles;
    let menuVisible = false;
    let crtlActive = false;
    let selectorActive = false;

    // EVENT LISTENERS *****
    window.addEventListener('click', e => {
        if (menuVisible) {
            utilities.toggleMenu('hide');
        }
    })
    window.addEventListener('contextmenu', e => {
        e.preventDefault();
        const origin = { left: e.pageX, top: e.pageY };
        utilities.setMenuPosition(origin);
    })
    window.addEventListener('keydown', e => {
        console.log(e);
        if (e.keyCode === 27) {
            utilities.toggleMenu('hide');
        }
        if (e.keyCode === 17) {
            crtlActive = true;
        }
    })
    window.addEventListener('keyup', e => {
        if (e.keyCode === 17) {
            crtlActive = false;
        }
    })

    // SELECTOR DIV
    map.addEventListener('mousedown', e => {
        console.log('mousedown')
        selectorActive = true;
        selectorOrigin = { left: e.pageX, top: e.pageY };
        tiles.selectMultipleMapTiles();
    })
    map.addEventListener('mousemove', e => {
        console.log(e.pageX, e.pageY)
        if (selectorActive) {
            const selector = document.getElementById('selectorField');
            if ((e.pageX - selectorOrigin.left < 0) && (e.pageY - selectorOrigin.top >= 0)) { //LEFT
                selector.style.left = e.pageX + 'px';

                selector.style.width = selectorOrigin.left - e.pageX + 'px';
                selector.style.height = e.pageY - selectorOrigin.top + 'px';
            }
            else if ((e.pageX - selectorOrigin.left >= 0) && (e.pageY - selectorOrigin.top < 0)) { //TOP
                selector.style.top = e.pageY + 'px';

                selector.style.width = e.pageX - selectorOrigin.left + 'px';
                selector.style.height = selectorOrigin.top - e.pageY + 'px';
            }
            else if ((e.pageX - selectorOrigin.left < 0) && (e.pageY - selectorOrigin.top < 0)) { //BOTH
                selector.style.left = e.pageX + 'px';
                selector.style.top = e.pageY + 'px';

                selector.style.width = selectorOrigin.left - e.pageX + 'px';
                selector.style.height = selectorOrigin.top - e.pageY + 'px';
            }
            else {
                selector.style.width = e.pageX - selectorOrigin.left + 'px';
                selector.style.height = e.pageY - selectorOrigin.top + 'px';
            }
        }
        else { return }
    })
    map.addEventListener('mouseup', e => {
        console.log('mouseup')
        selectorActive = false;
        const selector = document.getElementById('selectorField');
        selector.style.display = 'none';
        selector.style.left = `${0}px`;
        selector.style.top = `${0}px`;
        selector.style.width = `${0}px`;
        selector.style.height = `${0}px`;
    })
})


