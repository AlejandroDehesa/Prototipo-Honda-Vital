import { getCurrentTimeDef, getCurrentTime } from './getCurrentTime.js';
import { getSiteKnowledgeDef, getSiteKnowledge } from '../siteKnowledge.js';

export const toolsDefinitions: any[] = [
  getCurrentTimeDef,
  getSiteKnowledgeDef
];

export async function executeTool(name: string, args: any): Promise<any> {
  switch (name) {
    case 'get_current_time':
      return await getCurrentTime();
    case 'get_site_knowledge':
      return await getSiteKnowledge(args);
    default:
      throw new Error(`Tool ${name} not found or not registered.`);
  }
}
