/*
 * Hooks for renderer
 *
 * @flow
 */

import renderer from '../ui/Renderer';

export default (store) => (next) => (action) => {
  // executed after reducers
  const ret = next(action);

  const state = store.getState();

  switch (action.type) {
    case 'RELOAD_URL':
    case 'SELECT_CANVAS':
    case 'RECEIVE_ME': {
      renderer.updateCanvasData(state);
      break;
    }

    case 'REQUEST_BIG_CHUNK':
    case 'RECEIVE_BIG_CHUNK':
    case 'RECEIVE_BIG_CHUNK_FAILURE':
    case 'RECEIVE_IMAGE_TILE': {
      renderer.forceNextRender = true;
      break;
    }

    case 'TOGGLE_HISTORICAL_VIEW':
    case 'SET_SCALE': {
      const {
        viewscale,
        canvasMaxTiledZoom,
        view,
        canvasSize,
      } = state.canvas;
      renderer.updateScale(viewscale, canvasMaxTiledZoom, view, canvasSize);
      break;
    }

    case 'SET_VIEW_COORDINATES': {
      const { view, canvasSize } = state.canvas;
      renderer.updateView(view, canvasSize);
      break;
    }

    default:
      // nothing
  }

  return ret;
};
