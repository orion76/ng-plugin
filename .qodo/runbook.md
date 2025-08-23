# Runbook для @orion76/ng-plugin

## Быстрый старт

### Установка зависимостей
```bash
npm ci
```

### Разработка
```bash
# Сборка с отслеживанием изменений
npm run build:watch

# Тестирование в консоли (быстро)
npm run test:console

# Тестирование в браузере (для отладки)
npm run test:browser
```

### Проверка качества кода
```bash
# Линтинг
npx eslint .

# Полная сборка
npm run build

# Тесты без watch режима
npm test
```

## Частые сценарии

### Создание нового плагина
1. Скопируй шаблон из `templates/standard/plugin.ts`
2. Замени `PLUGIN_TEMPMLATE` на уникальный ID
3. Замени `PLUGIN_TEMPLATE_PLUGIN_TYPE` на тип плагина
4. Реализуй интерфейс `IPluginTemplate` или создай свой
5. Добавь декоратор `@NgPlugin` с корректными параметрами

### Добавление нового типа плагина
1. Создай интерфейс в соответствующей директории типов
2. Обнови `templates/standard/types.ts` если нужно
3. Создай базовый класс, наследующий от `NgPluginBase`
4. Добавь соответствующий шаблон в `templates/`

### Тестирование изменений
```bash
# Быстрая проверка
npm run test:console

# Полная проверка перед коммитом
npx eslint . && npm run build && npm test
```

### Локальная установка для тестирования
```bash
# Установить локально собранную версию
npm run install:plugin
```

### Обновление версии
```bash
# Автоматическое обновление patch версии
npm run update-version
```

## Отладка

### Проблемы со сборкой
- Проверь `tsconfig.json` и `tsconfig.lib.json`
- Убедись что все экспорты есть в `src/public-api.ts`
- Проверь `ng-package.json` для настроек ng-packagr

### Проблемы с тестами
- Используй `npm run test:browser` для отладки в DevTools
- Проверь конфигурацию в `karma.conf.js` и `karma-terminal.conf.js`
- Убедись что все моки и провайдеры настроены корректно

### Проблемы с плагинами
- Проверь что декоратор `@NgPlugin` применён корректно
- Убедись что плагин наследует от правильного базового класса
- Проверь что все необходимые провайдеры зарегистрированы
- Используй Angular DevTools для отладки DI

## Полезные команды

```bash
# Очистка и пересборка
rm -rf lib/ && npm run build

# Запуск конкретного теста
ng test --include="**/plugin.spec.ts"

# Проверка размера bundle
npm run build && ls -la lib/

# Анализ зависимостей
npm ls --depth=0
```