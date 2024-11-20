import CustomStore from 'devextreme/data/custom_store';

import { TCrud } from './../../common/interfaces';

export const getCustomStore = ({
  loadFn,
  insertFn,
  updateFn,
}: {
  loadFn: TCrud; 
  insertFn: TCrud
  updateFn:  TCrud 
}) => new CustomStore({
  key: 'id',
  load: loadFn,
  insert: insertFn,
  update: updateFn,
});
