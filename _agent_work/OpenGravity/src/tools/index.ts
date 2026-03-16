import { getCurrentTimeDef, getCurrentTime } from './getCurrentTime.js';

export const toolsDefinitions: any[] = [
  getCurrentTimeDef
];

export async function executeTool(name: string, args: any): Promise<any> {
  switch (name) {
    case 'get_current_time':
      return await getCurrentTime();
    default:
      throw new Error(`Tool ${name} not found or not registered.`);
  }
}
