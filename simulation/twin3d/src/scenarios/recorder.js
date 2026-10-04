/**
 * NeerSync 3D Village Digital Twin - Timeline Scenario Recorder & Replay
 * Records time-series frames and replays historical events.
 */

export class ScenarioRecorder {
  constructor() {
    this.isRecording = false;
    this.isReplaying = false;
    this.frames = [];
    this.replayIndex = 0;
  }

  startRecording() {
    this.isRecording = true;
    this.isReplaying = false;
    this.frames = [];
  }

  stopRecording() {
    this.isRecording = false;
    return this.frames.length;
  }

  captureFrame(simMinutes, state, hydraulicResults, activeAlerts) {
    if (!this.isRecording) return;

    this.frames.push({
      simMinutes,
      level: state.level,
      pumpOn: state.pumpOn,
      pumpCurrent: state.pumpCurrent,
      trunkFlow: hydraulicResults.trunkFlow,
      cl: state.cl,
      tu: state.tu,
      faults: { ...state.faults },
      activeAlertsCount: activeAlerts.length,
      timestamp: Date.now(),
    });
  }

  startReplay() {
    if (this.frames.length === 0) return false;
    this.isReplaying = true;
    this.isRecording = false;
    this.replayIndex = 0;
    return true;
  }

  stopReplay() {
    this.isReplaying = false;
  }

  getNextReplayFrame() {
    if (!this.isReplaying || this.replayIndex >= this.frames.length) {
      this.isReplaying = false;
      return null;
    }
    return this.frames[this.replayIndex++];
  }
}
