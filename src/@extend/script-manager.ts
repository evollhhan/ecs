import { EventEmitter } from '../@core';

interface IScriptOptions {
  action: (...args: any) => any;
  eventName?: string;
  condition?: (...args: any) => boolean;
  autoStart?: boolean;
}

interface IScript extends IScriptOptions {
  // disabled?: boolean;
  actionWithCondition?: (...args: any) => any;
}

class ScriptManager extends EventEmitter {
  private scripts: {
    [index: string]: IScript
  } = {};

  use (scriptName: string, ...args: any) {
    const script = this.scripts[scriptName];
    if (script) {
      script.action(...args);
    }
  }

  register (scriptName: string, scriptOptions: IScriptOptions) {
    if (this.scripts[scriptName]) {
      console.error(`Duplicate Script: ${scriptName} with options:`, scriptOptions);
      return;
    }
    const { eventName, condition, autoStart } = scriptOptions;
    const script: IScript = { ...scriptOptions };
    // Event.
    if (eventName) {
      if (condition) {
        script.actionWithCondition = () => condition && script.action();
        this.on(eventName, script.actionWithCondition);
      } else {
        this.on(eventName, script.action);
      }
    }
    // AutoStart.
    if (autoStart) {
      script.action();
    }
    // Registered.
    this.scripts[scriptName] = script;
  }

  unregister (scriptName: string) {
    const script = this.scripts[scriptName];
    if (!script) return;
    const { eventName, condition, action, actionWithCondition } = script;
    if (eventName) {
      this.off(eventName, condition ? actionWithCondition : action);
    }
    delete this.scripts[scriptName];
  }
}

const scriptManager = new ScriptManager();

export default scriptManager;
