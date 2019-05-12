const layoutPinterest = (container, items, columns) => {
    console.log(container);
    container.classList.add('layout-pinterest', 'columns-' + columns);
    let columnsNews = [];

    for(let i = 1; i <= columns; i++) {
        let column = document.createElement('div');
        column.classList.add('column-' + i);
        container.appendChild(column);
        columnsNews.push(column);
    }

    /*
    *   col 1   col 2   col 3
    *   img1    img2    img3
    *   img4    img5    img6
    *   img7    img8    img9
    *   img10
    */

    for(let i = 0; i < Math.ceil(items.length / columns); i++) {
        for(let j = 0; j < columns; j++) {
            try {
                columnsNews[j].appendChild(items[i * columns + j]);
            } catch (e) {

            }
        }
    }
};
// layoutPinterest(document.getElementById('container-products'), document.querySelectorAll('.item-grid'), 1);