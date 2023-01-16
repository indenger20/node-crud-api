/* eslint-disable @typescript-eslint/no-explicit-any */
import { args } from '../utils/parseArgs';
import EntityBase from '../models/entity-base';

type Store<T = EntityBase> = {
  [key: string]: T[];
};

const isMulti = args.values.multi;

class DBBase {
  private memoryStore: Store = {};

  public use(key: string, defaultValue: EntityBase[]) {
    this.memoryStore[key] = defaultValue;
  }

  get store() {
    return this.memoryStore;
  }

  public updateStore(store: Store) {
    this.memoryStore = store;
  }

  sendToMainProcess() {
    if (isMulti) {
      process.send!(this.store);
    }
  }
}

export default DBBase;
