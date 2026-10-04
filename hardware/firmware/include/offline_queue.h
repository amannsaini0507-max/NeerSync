#ifndef NEERSYNC_OFFLINE_QUEUE_H
#define NEERSYNC_OFFLINE_QUEUE_H

#include <Arduino.h>
#include <FS.h>
#include <LittleFS.h>

#define MAX_OFFLINE_MESSAGES 128
#define QUEUE_FILE_PATH      "/neersync_queue.txt"

class OfflineQueue {
public:
    OfflineQueue();
    bool begin();

    // Push JSON payload to FIFO queue
    bool push(const String& payload);

    // Pop the oldest unsent payload
    bool pop(String& payload);

    // Check how many messages are queued
    size_t count();

    // Clear queue
    void clear();

private:
    bool m_initialized;
};

#endif // NEERSYNC_OFFLINE_QUEUE_H
