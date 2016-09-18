
export const OPEN_PROJECT = 'OPEN_PROJECT'
export const CLOSE_PROJECT = 'CLOSE_PROJECT'

export function openProject(name) {
  return {type: OPEN_PROJECT, name}
}

export function closeProject(name) {
  return {type: CLOSE_PROJECT, name}
}
