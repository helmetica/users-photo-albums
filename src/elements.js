/**
 * Создает список ul по переданному массиву
 *
 * @param items массив объектов-элементов списка
 * @param itemOptions опции элементов
 * @return Element
 */
export function listElement(items, itemOptions) {
    let list = document.createElement('ul');
    list.className = 'list';
    items.forEach((item) => {
        let itemDiv = itemElement({
            className: itemOptions.className,
            displayProperty: itemOptions.displayProperty,
            clickHandler: itemOptions.clickHandler,
            itemTemplate: itemOptions.itemTemplate,
            item
        });
        list.appendChild(itemDiv);
    });
    return list;
}

/**
 * Создает элемент списка li
 *
 * @param options опции элемента
 * @param options.item объект элемента
 * @param options.className class для элемента
 * @param options.itemTemplate шаблон элемента
 * @param options.displayProperty поле из которого брать текстовое значение для узла
 * @param options.clickHandler обработчик клика по элементу списка
 * @return Element
 */
export function itemElement(options) {
    let itemContainer = document.createElement('li');
    let item = options.item;
    itemContainer.dataset.state = 'collapse';

    if (options.itemTemplate) {
        options.itemTemplate(item, itemContainer);
    } else {
        itemContainer.innerHTML = '<div class="item-content"><div class="icon-node icon-arrow"></div><span>' + item[options.displayProperty] + '</span></div>';
    }

    itemContainer.className = 'item ' + options.className;
    itemContainer.itemData = item;
    itemContainer.addEventListener('click', function(event) {
        let isExpand = this.dataset.state === 'expand';
        let iconNodes = this.getElementsByClassName('icon-node');
        let list = this.getElementsByClassName('list');
        this.dataset.state = isExpand ? 'collapse' : 'expand';

        if (iconNodes && iconNodes[0]) {
            iconNodes[0].classList.toggle('icon-collapse');
        }

        if (list && list[0]) {
            list[0].hidden = isExpand;
        }
    });

    itemContainer.addEventListener('click', function(event) {
        event.stopPropagation();
        if (itemContainer.dataset.loaded === 'true') {
            return;
        }
        if (options.clickHandler) {
            options.clickHandler(event, item, itemContainer);
        }
        itemContainer.dataset.loaded = 'true';
    });

    return itemContainer;
}

/**
 * Создает элемент img с атрибутами или приписывает атрибуты к переданному элементу
 *
 * @param item объект элемента
 * @param srcProperty поле из item для src
 * @param container уже созданный элемент img
 * @return Element
 */
export function imgElement(item, srcProperty) {
    let photoElement = document.createElement('img');
    photoElement.setAttribute('src', item[srcProperty]);
    photoElement.setAttribute('alt', item.title);
    photoElement.setAttribute('title', item.title);
    return photoElement;
}