// src/backend/uuid-service.ts
import { v1, v3, v4, v5, NIL as NIL_UUID } from 'uuid';

export class UUIDService {
  generateV1(): string {
    return v1();
  }

  generateV3(namespace: string, name: string): string {
    try {
      // If namespace is invalid, use NIL UUID as fallback
      return v3(name, namespace || NIL_UUID);
    } catch (error) {
      console.error('Error generating UUID v3:', error);
      return v3(name, NIL_UUID);
    }
  }

  generateV4(): string {
    return v4();
  }

  generateV5(namespace: string, name: string): string {
    try {
      // If namespace is invalid, use NIL UUID as fallback
      return v5(name, namespace || NIL_UUID);
    } catch (error) {
      console.error('Error generating UUID v5:', error);
      return v5(name, NIL_UUID);
    }
  }
}