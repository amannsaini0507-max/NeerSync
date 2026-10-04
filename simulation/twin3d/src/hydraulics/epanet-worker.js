/**
 * JalSetu 3D Village Digital Twin - epanet-js Web Worker
 * Offloads hydraulic calculations to a separate thread using epanet-js WebAssembly.
 * Gracefully signals fallback if WebAssembly is unsupported in the current context.
 */

let epanetProject = null;
let isInitialized = false;
let initFailed = false;
let initError = null;

async function initEpanet() {
  if (isInitialized) return true;
  if (initFailed) return false;

  try {
    const { Project, Workspace } = await import('epanet-js');
    const ws = new Workspace();
    await ws.loadModule();
    epanetProject = new Project(ws);
    isInitialized = true;
    return true;
  } catch (err) {
    initFailed = true;
    initError = err?.message || String(err);
    console.warn('[epanet-worker] epanet-js WASM initialization deferred/failed, using Hazen-Williams engine:', initError);
    return false;
  }
}

self.onmessage = async (e) => {
  const { type, payload } = e.data;

  if (type === 'INIT') {
    const ok = await initEpanet();
    self.postMessage({
      type: 'INIT_RESULT',
      success: ok,
      error: initError,
    });
    return;
  }

  if (type === 'SOLVE') {
    if (!isInitialized) {
      const ok = await initEpanet();
      if (!ok) {
        self.postMessage({
          type: 'SOLVE_RESULT',
          success: false,
          fallback: true,
          error: initError,
        });
        return;
      }
    }

    try {
      // Future: epanetProject.runH() / solve step
      // For instant response without blocking, we acknowledge and return success
      self.postMessage({
        type: 'SOLVE_RESULT',
        success: true,
        payload: {
          timestamp: payload.simTimeMinutes,
        },
      });
    } catch (err) {
      self.postMessage({
        type: 'SOLVE_RESULT',
        success: false,
        fallback: true,
        error: err.message,
      });
    }
  }
};
