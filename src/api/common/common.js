import { createInstanceWithAuth } from '../index';
function fileDelete(id) {
  return createInstanceWithAuth(`/api/h1/file/${id}`, {}, {}, 'application/json; charset=utf-8').delete();
}
function creatoryVideCategory(id) {
  return createInstanceWithAuth(`/api/h1/syscode/parents/${id}`, {}, {}, 'application/json; charset=utf-8').get();
}
export { fileDelete, creatoryVideCategory };
