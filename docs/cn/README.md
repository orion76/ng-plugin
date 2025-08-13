# @orion76/ng-plugin

**用于在 Angular 应用中实现插件（Plugin）架构模式的库**

基础跨平台库：[ @orion76/plugin ](https://github.com/orion76/plugin)

本库的插件思想借鉴自 CMF Drupal 8，并针对 Angular 进行了适配。

## 目录
- [概述](#概述)
- [优势](#优势)
- [安装](#安装)
- [相关链接](#相关链接)
- [使用示例](#使用示例)
- [主要目标](#主要目标)
- [术语与定义](#术语与定义)
- [外部类与接口](#外部类与接口)

## 概述
- 在 Angular 应用中集成插件架构模式。
- 允许将应用拆分为低耦合的独立层。
- 简化插件的实现与管理。
- 提高应用的模块化和可扩展性。

## 优势
- 清晰的架构和模块化设计。
- 无需修改核心即可轻松扩展功能。
- 简单集成到 Angular 2+。

## 安装
```bash
npm install --save @orion76/ng-plugin
```

## 相关链接
- 基础库：[ @orion76/plugin ](https://github.com/orion76/plugin)
- 集成示例：[ @orion76/ng-logger ](https://github.com/orion76/ng-logger)

## 使用示例
```typescript
import { NgPluginBase, PluginManagerDefaultService } from '@orion76/ng-plugin';

// 插件定义
@NgPlugin({
  id: 'my-plugin',
  type: 'MY_PLUGIN_TYPE',
  label: '我的插件'
})
export class MyPlugin extends NgPluginBase {
  // ...插件逻辑...
}

// 使用插件管理器
const manager = new PluginManagerDefaultService();
const plugin = manager.getInstance('my-plugin');
plugin?.someMethod();
```

## 主要目标
为实现插件架构模式和应用分层提供开箱即用的解决方案：
1. 基础设施层
2. 企业业务逻辑层

## 术语与定义
- **插件（Plugin）** — 独立模块，实现特定功能，可在不修改核心的情况下接入主系统。
- **插件定义** — 描述插件属性、类型、标识符和类的配置对象，用于注册和查找。
- **插件管理器** — 负责注册、查找、创建和管理插件实例的核心组件。
- **插件实例** — 基于插件定义创建并实现其逻辑的对象。
- **派生器（Deriver）** — 用于基于基础定义创建派生插件的辅助类。
- **插件构建器** — 支持依赖注入（DI），根据定义创建插件实例的组件。
- **插件发现（Discovery）** — 向管理器查找和提供插件定义的机制。

## 外部类与接口

### 接口 "IPluginDefinition"
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

### 接口 "IPlugin"
```typescript
interface IPlugin {
  type: string;
  id: string;
  label: string;
  definition: IPluginDefinition;
}
```

### 接口 "IPluginManager"
```typescript
export interface IPluginManager<P extends IPlugin = IPlugin> {
  getDefinition(id: string): P['definition'] | undefined;
  getDefinitions(): P['definition'][];
  getInstance(id: string): P;
}
```

---
简而言之：应用服务以依赖的方式获取特定类型的插件管理器，根据定义选择所需插件并调用其方法。
