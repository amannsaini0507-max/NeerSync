#include "offline_queue.h"

OfflineQueue::OfflineQueue() : m_initialized(false) {}

bool OfflineQueue::begin() {
    if (!LittleFS.begin(true)) {
        m_initialized = false;
        return false;
    }
    m_initialized = true;
    return true;
}

bool OfflineQueue::push(const String& payload) {
    if (!m_initialized && !begin()) return false;
    if (payload.length() == 0) return false;

    File f = LittleFS.open(QUEUE_FILE_PATH, FILE_APPEND);
    if (!f) return false;

    // Write line-delimited JSON
    f.println(payload);
    f.close();
    return true;
}

bool OfflineQueue::pop(String& payload) {
    if (!m_initialized && !begin()) return false;
    if (!LittleFS.exists(QUEUE_FILE_PATH)) return false;

    File f = LittleFS.open(QUEUE_FILE_PATH, FILE_READ);
    if (!f || f.size() == 0) {
        if (f) f.close();
        LittleFS.remove(QUEUE_FILE_PATH);
        return false;
    }

    // Read the first line
    payload = f.readStringUntil('\n');
    payload.trim();

    // Read the remaining lines to a temporary file
    File temp = LittleFS.open("/temp_queue.txt", FILE_WRITE);
    while (f.available()) {
        String remaining = f.readStringUntil('\n');
        if (remaining.length() > 0) {
            temp.println(remaining);
        }
    }
    f.close();
    temp.close();

    LittleFS.remove(QUEUE_FILE_PATH);
    LittleFS.rename("/temp_queue.txt", QUEUE_FILE_PATH);
    return (payload.length() > 0);
}

size_t OfflineQueue::count() {
    if (!m_initialized && !begin()) return 0;
    if (!LittleFS.exists(QUEUE_FILE_PATH)) return 0;

    File f = LittleFS.open(QUEUE_FILE_PATH, FILE_READ);
    if (!f) return 0;

    size_t lines = 0;
    while (f.available()) {
        String s = f.readStringUntil('\n');
        if (s.length() > 0) lines++;
    }
    f.close();
    return lines;
}

void OfflineQueue::clear() {
    if (m_initialized && LittleFS.exists(QUEUE_FILE_PATH)) {
        LittleFS.remove(QUEUE_FILE_PATH);
    }
}
