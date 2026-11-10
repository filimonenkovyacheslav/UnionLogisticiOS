# Union Logistics — React Native Mobile Operations App

**A React Native application for logistics staff and couriers to manage tasks, scan parcel barcodes, and work with packing documents and shipment tracking.**

The source includes **iOS and Android projects** and shares operational workflows with a Laravel-based logistics backend.

## Overview

Warehouse and courier teams need quick access to shipment data without working from a desktop browser. This app provides a mobile interface for several day-to-day operations: signing in, checking assigned tasks, scanning barcodes, creating packing records, and recording receipts or tracking-list entries.

### Features implemented in the codebase

| Area | Mobile workflow |
| --- | --- |
| **Authentication** | Login against a configured logistics API, with user/role context |
| **Courier tasks** | Fetch tasks, inspect task details, update status and open associated documents |
| **Barcode scanning** | Camera-based QR/barcode workflow with manual tracking input fallback |
| **Packing lists** | Create new packing records and duplicate existing packing lists |
| **Tracking lists** | Scan or add tracking numbers to named lists |
| **Checklist search** | Search shipment data through the checklist workflow |
| **Receipts** | Mobile receipt-creation screen and API integration |
| **Backend selection** | Support for two configured logistics server endpoints |
| **App navigation** | Drawer and stack navigation across operational screens |

The app also includes loading/error states and Redux actions around several API requests.

## Tech stack

- **React Native 0.70.6** and **React 18**
- **JavaScript**, Redux, Redux Thunk
- **React Navigation** (drawer and native-stack)
- **react-native-camera** and **react-native-qrcode-scanner**
- **AsyncStorage**, React Native Permissions
- **REST/JSON API** communication via `fetch`
- **Xcode/CocoaPods** project for iOS and Gradle project for Android

## App architecture

```text
index.js                 # Registers src/App as the application entry point
src/
  App.js                 # Redux provider and navigation root
  utils/navigation.util.js
  screens/
    SignIn/              # Authentication
    Home/                # Main operations menu
    Tasks/ TasksItem/    # Courier tasks
    Scan/                # Camera-based barcode scanning
    NewPacking/          # Packing workflow
    DuplicatePacking/    # Duplicate packing list
    ScanList/             # Scan into a tracking list
    AddTrackingList/     # Manual tracking-list entry
    SearchByChecklist/   # Checklist lookup
    AddReceipt/          # Receipt entry
  api/                   # API request functions
  actions/               # Redux actions
  reducers/              # Redux state
  config.js              # Backend endpoint configuration
ios/                     # Native iOS project
android/                 # Native Android project
patches/                 # Dependency patches applied during install
```

## Workflow example

1. A staff member signs in to the relevant backend.
2. The app displays courier/warehouse actions based on the available navigation.
3. They open a task or packing workflow.
4. A shipment's barcode is scanned (or entered manually).
5. Tracking and task data is submitted to the backend API.
6. Generated packing documents can be opened through the backend's document endpoints.

These interactions are represented by the screens and API client modules; an actual deployment requires a compatible server and valid credentials.

## Local development

The repository uses **React Native 0.70.6** and its historical native toolchain. A recent Node, Xcode, CocoaPods or Android SDK installation may require compatibility adjustments.

```bash
git clone https://github.com/filimonenkovyacheslav/UnionLogisticiOS.git
cd UnionLogisticiOS

npm install
npm start
```

For iOS, install the matching CocoaPods dependencies and run:

```bash
cd ios
pod install
cd ..
npm run ios
```

For Android, with an appropriate emulator/device and SDK:

```bash
npm run android
```

The `postinstall` script runs `patch-package`; keep the repository's `patches/` directory in place. See `src/config.js` for the configured backend hosts and replace or parameterize them for your environment.

**These setup instructions are indicative and have not been verified against a current mobile toolchain.**

## Related backend

The companion [DD Cargo Laravel logistics codebase](https://github.com/filimonenkovyacheslav/dd_cargo_git) includes API routes for courier tasks, tracking lists, packing documents, receipts, and related workflows.

## Portfolio & security notes

- The repository demonstrates **real application-specific screens and API integrations**, not just the default React Native template. The actual app entry point is `src/App.js`.
- It is a code portfolio snapshot, **not** a claim that current App Store or Google Play binaries are published or that all flows are production-tested today.
- API hosts are visible in source; keep credentials out of source control. Before using the app with live services, review endpoint security, dependency versions, permissions, and platform configuration.

## Developer

**[Vyacheslav Filimonenko](https://github.com/filimonenkovyacheslav)** — Full-Stack / Mobile Developer working with React Native, PHP/Laravel, APIs, and logistics automation.
