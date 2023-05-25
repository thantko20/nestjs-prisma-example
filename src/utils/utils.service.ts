import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  excludeFields<T extends object, Key extends keyof T>(
    entity: T,
    keys: Key[],
  ): Omit<T, Key> {
    const tmpEntity = { ...entity };

    for (const key of keys) {
      delete tmpEntity[key];
    }

    return tmpEntity;
  }
}
