import EntityBase from '../models/entity-base';
import DBBase from './db.base';

class DataBase extends DBBase {
  async create(key: string, entity: EntityBase) {
    this.store[key]?.push(entity);

    this.sendToMainProcess();
    return entity;
  }

  async getAll(key: string) {
    return this.store[key];
  }

  async getById(key: string, id: string) {
    return this.store[key].find((entity: EntityBase) => entity.id === id);
  }

  async update(key: string, id: string, entity: EntityBase) {
    const entities = this.store[key];
    const selectedEntityIndex = entities.findIndex((ent) => ent.id === id);

    if (selectedEntityIndex !== -1) {
      entities[selectedEntityIndex] = entity;
    }

    this.sendToMainProcess();
    return entity;
  }

  async delete(key: string, id: string) {
    const entities = this.store[key];
    const selectedEntityIndex = entities.findIndex((entity) => entity.id === id);

    if (selectedEntityIndex !== -1) {
      entities.splice(selectedEntityIndex, 1);
      this.sendToMainProcess();

      return true;
    }
    this.sendToMainProcess();
    return false;
  }
}

export default new DataBase();
