import {listElement, imgElement} from './elements.js';
import Favorite from './favorite.js';

const URL = 'https://jsonplaceholder.typicode.com/';
const TABS = {
  'catalog': 'catalogTab',
  'favorites': 'favoritesTab'
};

/**
 * Шаблон фотографии с кнопкой добавления в избранное
 *
 * @param item объект фотографии
 * @param container элемент для вставки шаблона
 */
function photoItemTmpl(item, container) {
    let iconElement = document.createElement('div');
    iconElement.className = 'icon icon-favorites';

    iconElement.dataset.state = favorites.getIndex(item) === -1 ? 'inactive' : 'active';
    if (iconElement.dataset.state === 'active') {
        iconElement.classList.toggle('active');
    }

    iconElement.addEventListener('click', function () {
        this.dataset.state = this.dataset.state === 'active' ? 'inactive' : 'active';
        switch (this.dataset.state) {
            case 'active':
                favorites.add(item);
                break;
            case 'inactive':
                favorites.delete(item);
                break;    
        }
        this.classList.toggle('active');
    });

    let photoElement = imgElement(item, 'thumbnailUrl');

    photoElement.addEventListener('click', function () {
        showViewer(item);
    });

    container.appendChild(iconElement);
    container.appendChild(photoElement);
}

/**
 * Открыть полноразмерное фото
 *
 * @param item объект фотографии
 */
function showViewer(item) {
    let viewer = document.getElementById('viewer');
    let img = imgElement(item, 'url');
    viewer.innerHTML = '';
    viewer.appendChild(img);
    toggleViewer();
}

/**
 * Загрузить данные об альбомах пользователя
 *
 * @param id идентификатор пользователя
 * @param target DOM-элемент для прикрепления загруженного списка
 */
function loadAlbumsByUser(id, target) {
    loadData('albums', {
        userId: id
    }).then((data) => {
        console.log(data);
        let list = listElement(data, {
            className: 'album',
            clickHandler: albumClickHandler,
            displayProperty: 'title'
        });
        target.appendChild(list);
    });
}

/**
 * Загрузить данные о фотографиях в альбоме
 *
 * @param id идентификатор альбома
 * @param target DOM-элемент для прикрепления загруженного списка
 */
function loadPhotosByAlbum(id, target) {
    loadData('photos', {
        albumId: id
    }).then((data) => {
        console.log(data);
        let list = listElement(data, {
            className: 'item-photo',
            itemTemplate: photoItemTmpl,
            displayProperty: 'title'
        });
        target.appendChild(list);
    });
}

/**
 * Обработчик клика по пользователю в списке
 *
 * @param event объект события
 * @param item объект с данными о пользователе
 * @param container элемент для отображения загруженных данных
 */
function userClickHandler(event, item, container) {
    loadAlbumsByUser(item.id, container);
}

/**
 * Обработчик клика по альбому в списке
 *
 * @param event объект события
 * @param item объект с данными об альбоме
 * @param container элемент для отображения загруженных данных
 */
function albumClickHandler(event, item, container) {
    loadPhotosByAlbum(item.id, container);
}

/**
 * Загружает данные с переданными параметрами
 *
 * @param type тип данных (пользователи/альбомы/фотографии)
 * @param params параметры запроса
 */
function loadData(type, params) {
    let query = URL + type;
    if (params && Object.keys(params).length) {
        for (let key in params) {
            query += '?' + key + '=' + params[key];
        }
    }
    return fetch(query).then((response) => response.json());
}

/**
 * Показать вкладку КАТАЛОГ
 */
function showUsers() {
    setSelectedTab(TABS.catalog);
    let container = document.getElementById(TABS.catalog);
    if (container.dataset.loaded !== 'true') {
        loadData('users').then((data) => {
            console.log(data);
            let list = listElement(data, {
                className: 'user',
                clickHandler: userClickHandler,
                displayProperty: 'name'
            });
            container.appendChild(list);
        });
        container.dataset.loaded = 'true';
    }
}

/**
 * Показать вкладку ИЗБРАННОЕ
 */
function showFavorites() {
    setSelectedTab(TABS.favorites);
    let container = document.getElementById(TABS.favorites);
    container.innerHTML = '';
    let favoriteItems = favorites.read();

    console.log(favoriteItems);

    if (favoriteItems) {
        let list = listElement(favoriteItems, {
            className: 'item-photo item-favorite',
            itemTemplate: photoItemTmpl
        });
        list.classList.add('list-favorite');
        container.appendChild(list);
    }
}

/**
 * Переключатель отображения полноразмернго фото
 */
function toggleViewer() {
    let viewer = document.getElementById('viewer');
    let overlay = document.getElementById('overlay');
    viewer.style.display = overlay.style.display ? '' : 'block';
    overlay.style.display = overlay.style.display ? '' : 'block';
}

/**
 * Установить видимую вкладку
 *
 * @param id идентификатор вкладки
 */
function setSelectedTab(id) {
    for (let key in TABS) {
        let tabContainer = document.getElementById(TABS[key]);
        tabContainer.hidden = TABS[key] !== id;
    }
}

let favorites = new Favorite();

let catalogLink = document.getElementById('catalog');
catalogLink.addEventListener('click', showUsers);

let favoritesLink = document.getElementById('favorites');
favoritesLink.addEventListener('click', showFavorites);

let overlay = document.getElementById('overlay');
overlay.addEventListener('click', toggleViewer);