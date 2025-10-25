const apiKey = "DEMO_KEY"; // replace with your own key
const startDate = "2025-10-01";
const endDate = "2025-10-25";

const url = `https://api.nasa.gov/DONKI/FLR?startDate=${startDate}&endDate=${endDate}&api_key=${apiKey}`;

async function getLatestFlareClass() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.length === 0) {
      console.log("No flares found in this date range.");
      return;
    }

    // Sort by peakTime (latest last)
    data.sort((a, b) => new Date(a.peakTime) - new Date(b.peakTime));

    // Get the classType of the latest flare
    const latestClass = data[data.length - 1].classType;
    console.log(latestClass); // e.g., "M1.0"
    
    return latestClass; // you can send this to Arduino

  } catch (err) {
    console.error("Error fetching flare data:", err);
  }
}

getLatestFlareClass();
