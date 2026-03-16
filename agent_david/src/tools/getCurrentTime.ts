export const getCurrentTimeDef = {
  type: "function",
  function: {
    name: "get_current_time",
    description: "Returns the current accurate time",
    parameters: {
      type: "object",
      properties: {},
      required: []
    }
  }
};

export async function getCurrentTime(): Promise<string> {
  const now = new Date();
  return now.toISOString();
}
