// lib/nominatim.ts
export async function geocodeAddress(address: string) {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
    const data = await response.json();
    return data;
  }
  
  export async function reverseGeocode(lat: number, lon: number) {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
    const data = await response.json();
    return data;
  }
  