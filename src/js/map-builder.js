window.addEventListener('DOMContentLoaded', (e) => {
    const items = document.getElementById('items');
    const map = document.getElementById('map');
    const menu = document.getElementById('menu');
    const itemsTab = [];
    let mapTab = [];
    let selectorOrigin;
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
            console.log(mapTab);
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
        setMenuPosition(origin) {
            menu.style.left = `${origin.left}px`;
            menu.style.top = `${origin.top}px`;
            if(!menuVisible){this.toggleMenu();}
        }
        toggleMenu(){
            if(menuVisible) {
                menuVisible = false;
                menu.style.display = 'none';
            }
            else if(!menuVisible){
                menuVisible = true;
                menu.style.display = 'block';
            }
        }
    }
    class Tiles {
        constructor() { }
        drawInSelectedTiles(x, y) {
            console.log('Item x: ' + x + ' y: ' + y);
            for (const raw of mapTab) {
                for (const el of raw) {
                    if (el.isSelected) {
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
            console.log(mapTile);
            if(mapTile.classList.contains('selected') && crtlActive){
                console.log('deleteTile');
                mapTile.classList.remove('selected');
                mapTab[y][x].isSelected = false;
            }
            else if(mapTile.classList.contains('selected') && !crtlActive){
                if(this.checkIfAnyTilesAreSelected()){this.removeSelectedTiles(); console.log('removedAllTiles');}
            }
            else if(!mapTile.classList.contains('selected') && crtlActive){
                console.log('addTile');
                mapTile.classList.add('selected');
                mapTab[y][x].isSelected = true;
            }
            else if(!mapTile.classList.contains('selected') && !crtlActive){
                if(this.checkIfAnyTilesAreSelected()){this.removeSelectedTiles(); console.log('removedAllTiles');}
                console.log('addTile');
                mapTile.classList.add('selected');
                mapTab[y][x].isSelected = true;
            }
        }
        selectMultipleMapTiles() {
            if(!crtlActive){if(this.checkIfAnyTilesAreSelected()){this.removeSelectedTiles()}}
            const selector = document.getElementById('selectorField');
            let left = parseInt(selector.style.left.slice(0, -2)) - 600;
            let top = parseInt(selector.style.top.slice(0, -2)) - 40;
            let width = parseInt(selector.style.width.slice(0, -2));
            let height = parseInt(selector.style.height.slice(0, -2));
            let point1_x = Math.floor(left / 27);
            let point1_y = Math.floor(top / 27);
            let point2_x = Math.ceil((left + width)/27);
            let point2_y = Math.ceil((top + height)/27);
            for(let y = point1_y; y < point2_y; y++){
                for(let x = point1_x; x < point2_x; x++){
                    const el = document.getElementById(`c_${x}_${y}`);
                    el.classList.add('selected');
                    mapTab[y][x].isSelected = true;
                }
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
        checkIfAnyTilesAreSelected(){
            const selectedTiles = document.getElementsByClassName('selected');
            if(selectedTiles === []){return false} else{return true}
        }
        removeSelectedTiles() {
            for (let y = 0; y < 30; y++) {
                for (let x = 0; x <= 27; x++) {
                    mapTab[y][x].isSelected = false;
                }
            }
            const selectedTiles = document.getElementsByClassName('selected');
            while(selectedTiles[0]) {
                selectedTiles[0].classList.remove('selected');
            }
        }
    }
    let utilities = new Utilities;
    let tiles = new Tiles;
    let menuVisible = false;
    let crtlActive = false;
    let selectorActive = false;
    console.table(mapTab);

    // EVENT LISTENERS *****
    window.addEventListener('click', e => {
        if (menuVisible) {utilities.toggleMenu()}
    });
    window.addEventListener('contextmenu', e => {

        e.preventDefault();
        const origin = { left: e.pageX, top: e.pageY };
        utilities.setMenuPosition(origin);
    });
    window.addEventListener('keydown', e => {
        if (e.keyCode === 27) {
            utilities.toggleMenu();
        }
        if (e.keyCode === 17) {
            crtlActive = true;
        }
    });
    window.addEventListener('keyup', e => {
        if (e.keyCode === 17) {
            crtlActive = false;
        }
    });

    //FIELD SELECTOR DIV
    map.addEventListener('mousedown', e => {
        selectorActive = true;
        selectorOrigin = { left: e.pageX, top: e.pageY };
        const selector = document.getElementById('selectorField');
        selector.style.left = `${selectorOrigin.left}px`;
        selector.style.top = `${selectorOrigin.top}px`;
    });
    map.addEventListener('mousemove', e => {
        if (selectorActive) {
            const selector = document.getElementById('selectorField');
            selector.style.display = 'block';
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
    });
    map.addEventListener('mouseup', e => {
        selectorActive = false;
        const selector = document.getElementById('selectorField');
        if(selector.style.width.slice(0, -2) > 27 || selector.style.height.slice(0, -2) > 27){
            tiles.selectMultipleMapTiles();
        }
        selector.style.display = 'none';
        selector.style.left = `${0}px`;
        selector.style.top = `${0}px`;
        selector.style.width = `${0}px`;
        selector.style.height = `${0}px`;
    });
});


