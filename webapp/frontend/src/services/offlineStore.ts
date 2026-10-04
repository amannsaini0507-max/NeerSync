// JalSetu Offline Queue & Storage Service

const OFFLINE_QUEUE_KEY = 'jalsetu_offline_queue';

export interface QueuedSubmission {
  id: string;
  type: 'qr_feedback' | 'grievance';
  payload: any;
  timestamp: string;
}

export const offlineStore = {
  getQueuedSubmissions(): QueuedSubmission[] {
    try {
      const data = localStorage.getItem(OFFLINE_QUEUE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  enqueue(type: 'qr_feedback' | 'grievance', payload: any) {
    const queue = this.getQueuedSubmissions();
    const item: QueuedSubmission = {
      id: `local_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      type,
      payload,
      timestamp: new Date().toISOString()
    };
    queue.push(item);
    localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
    return item;
  },

  clearQueue() {
    localStorage.removeItem(OFFLINE_QUEUE_KEY);
  },

  async syncPending(apiClient: any): Promise<number> {
    if (!navigator.onLine) return 0;
    const queue = this.getQueuedSubmissions();
    if (queue.length === 0) return 0;

    let synced = 0;
    const remaining: QueuedSubmission[] = [];

    for (const item of queue) {
      try {
        if (item.type === 'qr_feedback') {
          await apiClient.submitQRFeedback(item.payload.fhtc_id, item.payload.water_came, item.payload.note);
        } else {
          await apiClient.submitFullFeedback(item.payload);
        }
        synced++;
      } catch (err) {
        remaining.push(item);
      }
    }

    localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(remaining));
    return synced;
  }
};
