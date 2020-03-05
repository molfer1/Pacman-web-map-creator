window.addEventListener('DOMContentLoaded', (event) => {
    const itemsField = document.getElementById('items');
    const map = document.getElementById('map');
    const menu = document.querySelector(".menu");

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
            let x = 0, y = 0;
            while (true) {
                const canvas = document.createElement('canvas');
                canvas.classList.add('item');
                canvas.style.left = x * size + 'px';
                canvas.style.top = y * size + 40 + 'px';
                const f = function (xx, yy) {
                    return function () {
                        console.log('sprites x: ' + xx, ', y: ' + yy);
                    }
                };
                canvas.onclick = f(x, y);
                this.drawImg(img, canvas, x, y);
                itemsField.appendChild(canvas);
                x++;
                if (x == 15) {
                    const canvas = document.createElement('canvas');
                    canvas.classList.add('item');
                    canvas.style.left = x * size + 'px';
                    canvas.style.top = y * size + 40 + 'px';

                    const f = function (xx, yy) {
                        return function () {
                            console.log('sprites x: ' + xx, ', y: ' + yy);
                            // return [xx, yy]
                            // return this (access element without id )
                        }
                    };
                    canvas.onclick = f(x, y);
                    this.drawImg(img, canvas, x, y);

                    itemsField.appendChild(canvas);
                    x = 0;
                    y++;
                }
                if (y == 40) {
                    this.genRight()
                    break;
                }
            }
        }
        drawImg(img, canvas, x, y) {
            let ctx = canvas.getContext('2d');
            if (y < 20) {
                ctx.drawImage(img, 1 + x * 48, 1 + y * 48, 46, 46, 1, 1, canvas.width, canvas.height);
            }
            else if (y >= 20) {
                ctx.drawImage(img, 769 + x * 48, 1 + (y - 20) * 48, 46, 46, 1, 1, canvas.width, canvas.height);
            }
        }
        genRight() {
            let x = 0, y = 0;
            while (true) {
                const canvas = document.createElement('canvas');
                canvas.classList.add('mapTile');
                canvas.addEventListener('click', function () { utilities.selectMapTile(x, y) });
                canvas.id = 'x' + x + '_y' + y;
                canvas.style.left = x * 27 + 'px';
                canvas.style.top = y * 27 + 40 + 'px';
                map.appendChild(canvas);
                x++;
                if (x == 27) {
                    const canvas = document.createElement('canvas');
                    canvas.classList.add('mapTile');
                    canvas.id = 'x' + x + '_y' + y;
                    canvas.style.left = x * 27 + 'px';
                    canvas.style.top = y * 27 + 40 + 'px';
                    map.appendChild(canvas);
                    x = 0;
                    y++;
                }
                if (y == 30) {
                    break;
                }
            }
        }
    }
    class Utilities {
        constructor() {
        }

        toggleMenu(command) {
            menu.style.display = command === "show" ? "block" : "none";
            menuVisible = !menuVisible;
        };

        setMenuPosition({ top, left }) {
            menu.style.left = `${left}px`;
            menu.style.top = `${top}px`;
            this.toggleMenu("show");
        };
        selectMapTile(x, y) {
            // get el by id z x i y
            console.log('tile' + x + y);
        }
    };
    let utilities = new Utilities;
    let menuVisible = false;

    // EVENT LISTENING
    window.addEventListener("click", e => {
        if (menuVisible) {
            utilities.toggleMenu("hide");
        }
    });
    window.addEventListener("contextmenu", e => {
        e.preventDefault();
        const origin = { left: e.pageX, top: e.pageY };
        utilities.setMenuPosition(origin);
    });
});

