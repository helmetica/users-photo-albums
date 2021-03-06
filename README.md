## Задание
Есть API для получения альбомов, фотографий, и юзеров:

* https://jsonplaceholder.typicode.com/albums
* https://jsonplaceholder.typicode.com/photos?albumId=2
* https://jsonplaceholder.typicode.com/users/

Нужно разобраться в API, здесь есть описание: 
* https://jsonplaceholder.typicode.com/.

Сделать страницу, на которой выводятся фото, примерный макет:

![task](https://github.com/helmetica/users-photo-albums/raw/master/screens/task.png)

Вверху страницы должно быть два кликабельных элемента, выглядящих как ссылки: “КАТАЛОГ” и “ИЗБРАННОЕ”.

При нажатии на “КАТАЛОГ” отображается каскадный список. 
На первом уровне - имена пользователей.
На втором уровне - названия альбомов для соответствующего пользователя.
На третьем уровне - фотографии из соответствующего альбома.
Возле каждой фотографии - серая звезда. При клике на звезду она становится подсвеченной, и этот выбор записывается в local storage.
При клике на фотографию появляется всплывающее окно с полноразмерной версией фотографии.
При наведении курсора на фотографию должно всплывать название этого фото (alt).
При клике на имя пользователя раскрывается, либо скрывается список альбомов этого пользователя.
При клике на название албьома раскрывается, либо скрывается список фотографий этого пользователя.

При нажатии на “Избранное” отображается плоский список фотографий с названиями. Это фото, у которых нажали на звезду и записали в local storage.
Рядом с каждым фото разместить подсвеченную звезду, при нажатии на звезду - удалять фото из списка избранных.
Здесь тоже при клике показать полноразмерное фото.

При перезагрузке страницы избранные фотографии должны так же помечаться подсвеченной звёздочкой и отображаться в списке избранных.

Фотографии не нужно подгружать до того, как их покажут при клике по альбому.

Разрешено использовать jQuery. Запрещено использовать любые другие библиотеки, в том числе и jquery ui.
Классы должны быть оформлены по БЭМ https://ru.bem.info/methodology/

Код должен быть чистым, читабельным, поддерживаемым.
Не должно быть необоснованного дублирования.
Код должен быть отформатирован в едином стиле.

Страница должна работать в Chrome и Firefox.

## Реализация

![screen 1](https://github.com/helmetica/users-photo-albums/raw/master/screens/screen1.PNG)

![screen 2](https://github.com/helmetica/users-photo-albums/raw/master/screens/screen2.png)

![screen 3](https://github.com/helmetica/users-photo-albums/raw/master/screens/screen3.png)
