import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Filters out browser-generated and non-standard DOM attributes from props
 * @param props - The props object to filter
 * @returns A new object containing only valid DOM props
 */
export function filterDOMProps(props: Record<string, any>) {
  const validProps: Record<string, any> = {};
  for (const key in props) {
    // Skip browser-generated attributes and any non-standard attributes
    if (!key.startsWith('fd') && !key.startsWith('__') && key !== 'data-form-type') {
      validProps[key] = props[key];
    }
  }
  return validProps;
}