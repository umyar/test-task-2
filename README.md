Текст задания расположен в корне репозитория (`test-task.pdf`)

# Запуск проекта:
1) Склонировать репозиторий:

`git clone https://github.com/umyar/test-task-2`

2) Установить зависимости в директории с проектом:

`npm i`

3) Запустить проект:

`npm start`

# Как сейчас достать токен:

1) Откройте новую вкладку в браузере и введите в адресную строку такой запрос:

`https://oauth.vk.com/authorize?client_id=6665721&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=wall,friends&response_type=token&v=5.80`

2) Нажмите Enter. Откроется окно с запросом прав. В нем отображаются название приложения, иконки прав доступа, и Ваши имя с фамилией.

3) Нажмите «Разрешить». Вы попадете на новую страницу с предупреждением о том, что токен нельзя копировать и передавать третьим лицам. В адресной строке будет URL https://oauth.vk.com/blank.html, а после # Вы увидите дополнительный параметр **access_token**. Токен может выглядеть, например, так:

`51eff86578a3bbbcb5c7043a122a69fd04dca057ac821dd7afd7c2d8e35b60172d45a26599c08034cc40a`

4) Скопируйте свой **access_token** и вставьте его в **photosAction.js** (`src/actions/photosAction.js`):

![screenshot](https://image.ibb.co/fEP2YK/1.png)

5) Обновите приложение.
