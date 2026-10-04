#ifndef JALSETU_OFFLINE_QUEUE_H
#define JALSETU_OFFLINE_QUEUE_H

#include <Arduino.h>
#include <FS.h>
#include <LittleFS.h>

#define MAX_OFFLINE_MESSAGES 128
#define QUEUE_FILE_PATH      "/jalsetu_queue.txt"

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

#endif // JALSETU_OFFLINE_QUEUE_H
