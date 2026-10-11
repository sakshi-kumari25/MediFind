# MediFind Suite — Dynamic Micro-Regional Diagnostics Hub

A high-performance, modular React diagnostics hub dashboard built to index, filter, and compare 111+ distributed medical facilities and dynamic procedure rates in real time.

## 🚀 Live Features Architecture

*   **Geospatial Lookup Pipeline:** Live-filtering of 111 nationwide clinical nodes spread across 5 NCR healthcare hubs (Noida, Delhi, Gurgaon, Ghaziabad, Faridabad) with strict radius constraints.
*   **Real-time Computational Analytics:** An inline telemetry stream layer that dynamically parses visible facility datasets to calculate lowest procedure costs, average proximity metrics, and top-rated medical entities on the fly.
*   **Side-by-Side Comparison Matrix:** A dedicated state-persistent comparison dock that contrasts complex metrics (Accreditations, Distance, Ratings, and multi-procedure prices) side-by-side.
*   **Client-Side Text Report Exporter:** Engineered a raw text stream writer that programmatically compiles state layout snapshots into a clean, downloadable `.txt` report payload on a single click.
*   **Persistent Cache & Themes Switcher:** Features `localStorage` state hydration to preserve user comparison arrays across browser reloads, combined with a synchronized Dark Mode theme switcher.

## 🛠️ Technical Stack & Tooling

*   **Frontend Framework:** React 18 (Vite Bundler Architecture)
*   **Styling Engine:** Tailwind CSS 3.x (Fully adapted dark/light variant variables)
*   **Vector Layouts:** Lucide React (High-contrast state indicators)
*   **State Coordination:** Hook-driven state pipelines and synchronous browser local cache handlers

## 📂 Modular File Architecture

```text
src/
├── components/
│   ├── AuthModal.jsx          # Secure patient registration / login overlay frame
│   ├── BookingModal.jsx       # Secure validation frame user forms overlay
│   ├── CompareMatrix.jsx      # Multi-column alignment grid table with integrated text exporter
│   ├── FilterPanel.jsx        # Parameter controls panel inputs strip
│   ├── Header.jsx             # Top bar logo navigation & responsive actions cluster
│   ├── HospitalCard.jsx       # Dual-column horizontal facility listing template 
│   └── ThemeToggle.jsx        # Synchronized client dark profile switcher hook
├── data/
│   └── hospitalData.js        # Locked 111-entry static dataset infrastructure
└── App.jsx                    # Primary unified root data workflow orchestrator
```

---
