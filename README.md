# CityPulse AI — Smart City Explorer

A responsive, map-first city companion prototype. Pune is the initial demonstration city; its home dashboard brings place exploration, safety awareness, trip planning, comparisons, weather, heritage discovery, and citizen reports together in one view. The sidebar and header shortcuts also open dedicated feature pages.

## Run locally

Requirements: Node.js 18 or newer and npm.

```powershell
npm.cmd install
npm.cmd run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`). Internet access is needed for live weather, map tiles, geocoding, OpenStreetMap place lookups, and route requests. No API key, backend, or account is required.

## Open by double-clicking an HTML file

Create a standalone browser file once:

```powershell
npm.cmd install
npm.cmd run build
```

Then double-click `CityPulse.html` in the project folder (or choose any installed modern browser with **Open with**). The production build also writes `dist\index.html`. Both files inline the app JavaScript and styles, so the app does not need the IDE, Node.js, or a web server to display. Keep internet access enabled for map tiles, weather, and other connected services; browsers may restrict some external requests or location features on local files.

Create and preview a production build:

```powershell
npm.cmd run build
npm.cmd run preview
```

## What works

- **City explorer:** Interactive Leaflet map with dynamically loaded OpenStreetMap/Overpass features from the visible map bounds. Moving or zooming the map triggers debounced discovery; supported tags are queried in batches, deduplicated, cached for 15 minutes, and progressively added to the results. Sixteen selectable parent categories support combined filters and visible-area result counts; unmatched queried features appear under **Other Mapped Places**. Names, coordinates, address tags, feature type, source, and available contact/hours/website/fee/photo tags are shown when available. Overpass responses can be partial or unavailable, and the app indicates this rather than claiming complete coverage.
- **Home dashboard:** Seven interactive discovery, safety, planning, comparison, weather, culture, and reporting panels. The desktop sidebar becomes a drawer on mobile; dashboard panels and maps adapt to smaller screens.
- **Smart Match:** A transparent, rule-based prototype score uses selected interests, known demo prices, available ratings, straight-line proximity, current forecast context, and nearby unverified community reports. A step-free preference is applied only when a place has an explicit OpenStreetMap wheelchair tag. Unknown information is not scored as positive evidence. It is not a trained AI/ML model.
- **Safety intelligence and citizen reports:** Category, time, and status filters; map markers for reports with coordinates; validated report submission; optional image and voice-note attachments; and user reports persisted in browser `localStorage`. User reports are marked **unverified**. Seed incident markers are labelled **demo** and are not official incident data.
- **Trip planner:** Duration, budget, interests, pace, accessibility preference, and a starting location. The planner geocodes custom starting points when possible, orders included places by proximity, estimates visit time and spend, considers available forecast context, and lets the user save the plan in browser storage.
- **Place comparison:** Two-place comparisons for estimated affordability, available visitor ratings, available accessibility tags, cleanliness evidence, and nearby reports. Adjustable weights feed a weighted view that excludes unknown data.
- **History and culture:** Interest filters for historical, cultural, religious, and architectural places, with nearby Wikipedia geosearch results, article summaries, links to source articles, and links to the Archaeological Survey of India and Maharashtra Tourism.
- **Live city insights:** Current conditions and a three-day forecast from Open-Meteo, including forecast precipitation context when available. Errors and loading states are visible.
- **Responsive navigation:** Desktop sidebar and mobile navigation, responsive map and cards, geolocation controls, and local guest-mode favorites.

## Data sources and important limitations

- **OpenStreetMap:** Basemap tiles are served by OpenStreetMap Germany, requiring no API key; the app includes provider and OSM attribution. Nominatim provides city/place geocoding, and Overpass listings are queried for the current viewport. Data may be incomplete, untagged, rate-limited, or unavailable; category availability depends on local mapping. Ratings, prices, descriptions, contact details, and accessibility tags are not assumed to exist when absent. No arbitrary radius or feature-count cap is applied.
- **Wikimedia:** Wikipedia geosearch and article summaries for nearby historical/cultural context, cached locally for 24 hours. Articles are community-edited and linked to their sources; they are not official heritage determinations.
- **Open-Meteo:** Current weather and forecast. This is forecast information, not an official severe-weather alert service.
- **OSRM demo routing server:** Driving distance, duration, and available route alternatives. It does not provide live traffic, a safety assessment, or guaranteed route availability.
- **Pune starter content:** The sample place ratings, costs, and descriptions are curated demonstration content, not live reviews, prices, or quotations. Four seeded incident markers are expressly demonstration reports.
- **Citizen submissions:** Reports, timestamps, optional images, and voice notes (each attachment limited to 1 MB) are stored only in the current browser's local storage; there is no server review, cross-device sync, or authority verification. A report location is geocoded for its map marker when the lookup succeeds; it remains in the report list when it does not.
- **Safety:** The prototype has no authoritative, comprehensive incident feed. Missing reports never imply a place or route is safe. It provides awareness only and must not replace official emergency or travel advice.
- **External services:** Public endpoints can be rate-limited, unavailable, or subject to their own usage policies. The app surfaces request failures instead of presenting them as live success. No real-time traffic source is connected.
- **Credentials and permissions:** No API keys are required by the connected public endpoints. Voice reports require microphone permission and a secure context (localhost or HTTPS). Location uses browser geolocation permission. There is no connected official safety/accident, flood, road-closure, traffic, event, or public social-media data feed.

## Short live-demo script

1. Start on Pune's **Home** dashboard. Explore the map and popular places, filter to **Heritage** or **Budget friendly**, and save a place. Point out the curated-demo and data-source disclosures.
2. Open **Safety intelligence**. Call out that seed markers are demo-only, filter incident types or date/status, and submit a short report with a landmark. Show its unverified badge and local-storage disclosure.
3. Open **Trip planner**, choose interests, budget, pace, a starting location, and optionally a step-free preference. Generate a plan, explain the proximity ordering and estimates, then save it.
4. Compare two places. Adjust a weight and point out that missing cleanliness/accessibility/report data is labelled unavailable rather than treated as good.
5. Finish in **History & culture**, switch between interest filters, and open a credible reference link.

## Stack

React 18, Vite, Leaflet / React-Leaflet, Lucide icons, and custom responsive CSS.
