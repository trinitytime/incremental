// src-tauri/src/preload.ts
import { UUIDService } from './backend/uuid-service';

const uuidService = new UUIDService();

export const preload = {
  generateUUIDV1: () => {
    return uuidService.generateV1();
  },

  generateUUIDV3: (namespace: string, name: string) => {
    return uuidService.generateV3(namespace, name);
  },

  generateUUIDV4: () => {
    return uuidService.generateV4();
  },

  generateUUIDV5: (namespace: string, name: string) => {
    return uuidService.generateV5(namespace, name);
  },
};