window.addEventListener('DOMContentLoaded', (event) => {
    console.log('map-builder.js loaded');
    class Item {
        constructor(id) {
            this.id = '_' + id;

        }
    }

    function start() {
        buildLeftSide();
        console.log('UI loaded')
    }
    function buildLeftSide() {
        let x = 0, y = 0;
        const itemsField = document.getElementById('items');
        while (true) {
            const canvas = document.createElement('canvas');
            canvas.classList.add('item');
            canvas.style.left = x * 27 + 'px';
            canvas.style.top = y * 27 + 40 + 'px';
            drawImg(canvas, x, y);
            itemsField.appendChild(canvas);
            x++;
            if (x == 15) {
                const canvas = document.createElement('canvas');
                canvas.classList.add('item');
                canvas.style.left = x * 27 + 'px';
                canvas.style.top = y * 27 + 40 + 'px';
                drawImg(canvas, x, y);
                itemsField.appendChild(canvas);
                x = 0;
                y++;
            }
            if (y == 40) {
                buildRightSide()
                break;
            }
        }
    }
    function buildRightSide() {
        let x = 0, y = 0;
        const map = document.getElementById('map');
        while (true) {
            const canvas = document.createElement('canvas');
            canvas.classList.add('mapField');
            canvas.id = 'x' + x + '_y' + y;
            canvas.style.left = x * 27 + 'px';
            canvas.style.top = y * 27 + 40 + 'px';
            map.appendChild(canvas);
            x++;
            if (x == 27) {
                const canvas = document.createElement('canvas');
                canvas.classList.add('mapField');
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
    function drawImg(canvas, x, y) {
        const img = new Image();
        img.src = '../../data/img/sprites.png';
        let ctx = canvas.getContext('2d');
        img.addEventListener('load', function () {
            if (y < 20) {
                ctx.drawImage(img, 1 + x * 48, 1 + y * 48, 46, 46, 1, 1, canvas.width, canvas.height);
            }
            else if (y >= 20) {
                ctx.drawImage(img, 769 + x * 48, 1 + (y - 20) * 48, 46, 46, 1, 1, canvas.width, canvas.height);
            }
        });
    };

    start();
});

