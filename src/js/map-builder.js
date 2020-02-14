window.addEventListener('DOMContentLoaded', (event) => {
    const itemsField = document.getElementById('items');
    const map = document.getElementById('map');
    const img = new Image();
    img.src = '../../data/img/sprites.png';
    img.addEventListener('load', function () {
        new Generator(this, 27);
    });

    class Generator {
        constructor(img, size) {
            this.img = img;
            this.size = size;
            this.gen_left(img, size);
        }
        gen_left(img, size) {
            let x = 0, y = 0;
            while (true) {
                const canvas = document.createElement('canvas');
                canvas.classList.add('item');
                canvas.style.left = x * size + 'px';
                canvas.style.top = y * size + 40 + 'px';
                var f = function (xx, yy) {
                    return function () {
                        alert(xx, yy)
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

                    var f = function (xx, yy) {
                        return function () {
                            alert(xx, yy)
                            // return [xx, yy]
                            // return this (access element without id )
                        }
                    };
                    console.log(x, y);
                    canvas.onclick = f(x, y);
                    this.drawImg(img, canvas, x, y);
                    itemsField.appendChild(canvas);
                    x = 0;
                    y++;
                }
                if (y == 40) {
                    this.buildRightSide()
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
        buildRightSide() {
            let x = 0, y = 0;
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
    }
});

