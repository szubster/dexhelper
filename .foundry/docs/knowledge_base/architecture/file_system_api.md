# File System Access API Constraints

## Android Limitations
When implementing features that rely on the Web File System Access API (`showOpenFilePicker`, `showDirectoryPicker`), be aware of severe constraints on mobile devices, specifically Android:

1.  **Limited Support**: `showDirectoryPicker` is generally not supported on Android browsers. `showOpenFilePicker` has partial support.
2.  **Storage Access Framework (SAF)**: Android's security model heavily restricts browser access to the broader file system.
3.  **Cloud-Synced Folders**: Attempting to use the API to persist access to folders managed by third-party background sync applications (like Google Drive or DropBox sync clients) is unreliable. The browser will often be denied persistent read permissions due to SAF, requiring the user to manually re-select the file on every app launch.

## Architectural Implications
For features requiring persistent, automated file monitoring (like live save-file tracking for emulators), the File System Access API is only a viable architecture for **desktop environments**.

For mobile or dedicated Android emulation devices, an alternative architecture is required, such as:
-   Server-side integration with the cloud provider (e.g., Cloudflare connecting directly to the Google Drive API).
-   A native Android companion app for background syncing.
