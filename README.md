# Contact Manager

A modern **React & Laravel** application for managing contacts with real-time geolocation mapping. This system features a "dual-sync" address entry method: fetch data via **CEP (ViaCEP)** or via **Google Places Autocomplete**.



## Features

* **Two-Way Address Sync:**
    * **CEP Lookup:** Enter a Brazilian ZIP code to automatically fetch street, neighborhood, and city details via ViaCEP.
    * **Google Autocomplete:** Search for any location using the Google Places API to instantly fill the form.
* **Interactive Map:** Real-time marker updates using `@vis.gl/react-google-maps` whenever an address is selected or found.
* **Smart Form Validation:** Masked inputs for CPF, Phone, and CEP using `react-number-format`.
* **Automated Testing:** Comprehensive test suite powered by **Pest PHP**.



## Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React (Inertia.js) |
| **Backend** | Laravel 11, PHP 8.3+ |
| **Database** | MySQL |
| **Testing** | Pest PHP |
| **APIs** | Google Maps Platform, ViaCEP |
