import { LooseMap } from '../../models/map.type'

export const CD_VAL_TO_VIN_CHAR_MAP: LooseMap<string> = {
  0: '0',
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: 'X' // TODO: Decide on where to handle capitalization.
}
