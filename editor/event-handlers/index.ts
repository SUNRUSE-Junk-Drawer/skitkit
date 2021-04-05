import { refresh } from "./refresh";

const importedRefresh = refresh;

if (`serviceWorker` in navigator) {
  addEventListener(`load`, () => {
    navigator.serviceWorker.register(`service-worker.js`);
    importedRefresh();
  });
} else {
  addEventListener(`load`, () => {
    importedRefresh();
  });
}

addEventListener(`hashchange`, () => {
  importedRefresh();
});
