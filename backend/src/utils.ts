import { camelCase } from "lodash";

export const toCamelCaseKeys = (obj: any): any => {
  const newObj: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const camelKey = camelCase(key);
      if (camelKey === "reactions" && typeof obj[key] === "string") {
        try {
          newObj[camelKey] = JSON.parse(obj[key]);
        } catch (e) {
          console.error(`Failed to parse reactions for record ${obj.id}:`, e);
          newObj[camelKey] = [];
        }
      } else {
        newObj[camelKey] = obj[key];
      }
    }
  }
  return newObj;
};
