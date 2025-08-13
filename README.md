
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

[🇷🇺 Описание](./docs/ru/README.md) | [🇨🇳 说明](./docs/cn/README.md)

**A library for implementing the Plugin architectural pattern in Angular applications**

Base cross-platform library: [@orion76/plugin](https://github.com/orion76/plugin)

The idea for the Plugin library was borrowed from CMF Drupal 8 and adapted for Angular.

## Table of Contents
- [Overview](#overview)
- [Benefits](#benefits)
- [Installation](#installation)
- [Links](#links)
- [Usage Example](#usage-example)
- [Main Purpose](#main-purpose)
- [Terms and Definitions](#terms-and-definitions)
- [External Classes and Interfaces](#external-classes-and-interfaces)

## Overview
- Integration of the Plugin pattern into Angular applications.
- Allows you to separate the application into independent layers with minimal coupling.
- Simplifies plugin implementation and management.
- Increases modularity and extensibility of applications.

## Benefits
- Clean architecture and modularity.
- Easy extension of functionality without changing the core.
- Simple integration with Angular 2+.

## Installation
```bash
npm install --save @orion76/ng-plugin
```

## Links
- Base library: [@orion76/plugin](https://github.com/orion76/plugin)
- Integration example: [@orion76/ng-logger](https://github.com/orion76/ng-logger)

## Usage Example
```typescript
import { NgPluginBase, PluginManagerDefaultService } from '@orion76/ng-plugin';

// Plugin definition
@NgPlugin({
  id: 'my-plugin',
  type: 'MY_PLUGIN_TYPE',
  label: 'My Plugin'
})
export class MyPlugin extends NgPluginBase {
  // ...plugin logic...
}

// Using the plugin manager
const manager = new PluginManagerDefaultService();
const plugin = manager.getInstance('my-plugin');
plugin?.someMethod();
```

## Main Purpose
A ready-made solution for implementing the Plugin pattern and separating the application into layers:
1. Infrastructure layer
2. Enterprise business logic layer

## Terms and Definitions
- **Plugin** — an independent module that implements specific functionality and can be connected to the main system without changing its core.
- **Plugin definition** — a configuration object describing the properties, type, identifier, and class of a plugin. Used for registration and lookup.
- **Plugin manager** — the central component for registering, finding, creating, and managing plugin instances.
- **Plugin instance** — an object created based on a plugin definition and implementing its logic.
- **Deriver** — a helper class for creating derivative plugins based on a base definition.
- **Plugin builder** — a component for creating plugin instances from definitions with DI support.
- **Plugin discovery** — a mechanism for finding and providing plugin definitions to the manager.

## External Classes and Interfaces

### Interface "IPluginDefinition"
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

### Interface "IPlugin"
```typescript
interface IPlugin {
  type: string;
  id: string;
  label: string;
  definition: IPluginDefinition;
}
```

### Interface "IPluginManager"
```typescript
export interface IPluginManager<P extends IPlugin = IPlugin> {
  getDefinition(id: string): P['definition'] | undefined;
  getDefinitions(): P['definition'][];
  getInstance(id: string): P;
}
```

---
In short: the application service receives a plugin manager of a specific type as a dependency, selects the required plugin by definition, and calls its methods.

