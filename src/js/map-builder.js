window.addEventListener('DOMContentLoaded', (event) => {
    console.log('map-builder.js loaded');
    let line = 1;
    class Item {
        constructor(id) {
            this.id = '_' + id;

        }
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
            if (y == 20) {
                break;
            }
        }
    }
    buildLeftSide();

    function drawImg(canvas, x, y) {
        let img = new Image();
        img.src = '../../data/img/sprites.png';
        let ctx = canvas.getContext('2d');
        img.addEventListener('load', function () {
            if (line <= 20) {
                ctx.drawImage(img, 1 + x * 48, 1 + y * 48, 46, 46, 1, 1, canvas.width, canvas.height);
            }
            else {
                ctx.drawImage(img, 769 + x * 48, 1 + y * 48, 46, 46, 1, 1, canvas.width, canvas.height);
            }
        });
        line++;
    };
});

