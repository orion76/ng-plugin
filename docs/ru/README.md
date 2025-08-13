npm install --save @orion76/ng-plugin
[![Node.js Package](https://github.com/orion76/plugin/actions/workflows/npm-publish.yml/badge.svg?branch=master)](https://github.com/orion76/plugin/actions/workflows/npm-publish.yml)
[![npm version](https://img.shields.io/npm/v/@orion76/ng-plugin)](https://www.npmjs.com/package/@orion76/ng-plugin)
[![npm downloads](https://img.shields.io/npm/dm/@orion76/ng-plugin)](https://www.npmjs.com/package/@orion76/ng-plugin)
[![license](https://img.shields.io/github/license/orion76/ng-plugin)](./LICENSE)
[![typescript](https://img.shields.io/badge/TypeScript-Ready-blue?logo=typescript)](https://www.typescriptlang.org/)
[![issues](https://img.shields.io/github/issues/orion76/ng-plugin)](https://github.com/orion76/ng-plugin/issues)
[![pull requests](https://img.shields.io/github/issues-pr/orion76/ng-plugin)](https://github.com/orion76/ng-plugin/pulls)
[![stars](https://img.shields.io/github/stars/orion76/ng-plugin?style=social)](https://github.com/orion76/ng-plugin/stargazers)
[![node](https://img.shields.io/node/v/@orion76/ng-plugin)](https://nodejs.org/)

# @orion76/ng-plugin

**Библиотека для реализации архитектурного паттерна Plugin в Angular-приложениях**

Базовая кроссплатформенная библиотека: [@orion76/plugin](https://github.com/orion76/plugin)

Идея библиотеки Plugin была заимствована у CMF Drupal 8 и адаптирована для Angular.

## Содержание
- [Обзор](#обзор)
- [Преимущества](#преимущества)
- [Установка](#установка)
- [Ссылки](#ссылки)
- [Пример использования](#пример-использования)
- [Основная задача](#основная-задача)
- [Термины и определения](#термины-и-определения)
- [Внешние классы и интерфейсы](#внешние-классы-и-интерфейсы)

## Обзор
- Интеграция паттерна Plugin в Angular-приложения.
- Позволяет разделять приложение на независимые слои с минимальной связностью.
- Упрощает внедрение и управление плагинами.
- Повышает модульность и расширяемость приложений.

## Преимущества
- Чистая архитектура и модульность.
- Лёгкое расширение функциональности без изменения ядра.
- Простая интеграция с Angular 2+.

## Установка
```bash
npm install --save @orion76/ng-plugin
```

## Ссылки
- Базовая библиотека: [@orion76/plugin](https://github.com/orion76/plugin)
- Пример интеграции: [@orion76/ng-logger](https://github.com/orion76/ng-logger)

## Пример использования
```typescript
import { NgPluginBase, PluginManagerDefaultService } from '@orion76/ng-plugin';

// Определение плагина
@NgPlugin({
  id: 'my-plugin',
  type: 'MY_PLUGIN_TYPE',
  label: 'Мой плагин'
})
export class MyPlugin extends NgPluginBase {
  // ...логика плагина...
}

// Использование менеджера плагинов
const manager = new PluginManagerDefaultService();
const plugin = manager.getInstance('my-plugin');
plugin?.someMethod();
```

## Основная задача
Готовое решение для внедрения паттерна Plugin и разделения приложения на слои:
1. Инфраструктурный слой
2. Слой бизнес-логики предприятия

## Термины и определения
- **Плагин** — независимый модуль, реализующий определённую функциональность и подключаемый к основной системе без изменения её ядра.
- **Определение плагина** — объект конфигурации, описывающий свойства, тип, идентификатор и класс плагина. Используется для регистрации и поиска.
- **Менеджер плагинов** — центральный компонент для регистрации, поиска, создания и управления экземплярами плагинов.
- **Экземпляр плагина** — объект, созданный на основе определения плагина и реализующий его логику.
- **Деривер** — вспомогательный класс для создания производных плагинов на основе базового определения.
- **Билдер плагинов** — компонент для создания экземпляров плагинов из определений с поддержкой DI.
- **Дискавери плагинов** — механизм поиска и предоставления определений плагинов менеджеру.

## Внешние классы и интерфейсы

### Интерфейс "IPluginDefinition"
```typescript
interface IPluginDefinition<P extends IPlugin = IPlugin, D extends object = object> {
  type: string;
  id: string;
  label: string;
  pluginClass?: IType<P>;
  deriverClass?: IType<IPluginDeriver<D>>;
  disabled?: boolean;
}
```

### Интерфейс "IPlugin"
```typescript
interface IPlugin {
  type: string;
  id: string;
  label: string;
  definition: IPluginDefinition;
}
```

### Интерфейс "IPluginManager"
```typescript
export interface IPluginManager<P extends IPlugin = IPlugin> {
  getDefinition(id: string): P['definition'] | undefined;
  getDefinitions(): P['definition'][];
  getInstance(id: string): P;
}
```

---
Кратко: сервис приложения получает менеджер плагинов определённого типа как зависимость, выбирает нужный плагин по определению и вызывает его методы.

