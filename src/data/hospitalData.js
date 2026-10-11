export const SERVICE_LABELS = {
  xray: 'Digital X-Ray Scan',
  blood_test: 'Blood Lab Panel (CBC)',
  mri: 'MRI Scan',
};

// Explicit static array infrastructure - locked to 111 listings minimum
const BASE_MOCK_LIST = [
  { id: "max_noida", name: "Max Super Speciality Hospital", location: "Sector 19, Noida", region: "noida", distance: 2.4, rating: 4.8, accreditation: "NABH Accredited", prices: { xray: 650, blood_test: 350, mri: 6200 }, slots: ["09:00 AM", "11:30 AM", "03:00 PM"] },
  { id: "fortis_noida", name: "Fortis Hospital", location: "Sector 62, Noida", region: "noida", distance: 4.1, rating: 4.6, accreditation: "NABH & JCI", prices: { xray: 800, blood_test: 400, mri: 7000 }, slots: ["10:00 AM", "12:15 PM", "05:00 PM"] },
  { id: "metro_noida", name: "Metro Hospital & Heart Institute", location: "Sector 11, Noida", region: "noida", distance: 1.8, rating: 4.5, accreditation: "NABH Accredited", prices: { xray: 550, blood_test: 300, mri: 5900 }, slots: ["09:30 AM", "04:00 PM"] },
  { id: "kailash_noida", name: "Kailash Hospital & Heart Institute", location: "Sector 27, Noida", region: "noida", distance: 3.2, rating: 4.4, accreditation: "NABH Certified", prices: { xray: 600, blood_test: 320, mri: 6100 }, slots: ["08:30 AM", "11:00 AM", "02:15 PM"] },
  { id: "sharda_greano", name: "Sharda University Hospital", location: "Knowledge Park III, Greater Noida", region: "noida", distance: 1.2, rating: 4.3, accreditation: "NABL Certified Labs", prices: { xray: 450, blood_test: 250, mri: 5500 }, slots: ["08:30 AM", "01:15 PM", "03:45 PM"] },
  { id: "yashoda_greano", name: "Yashoda Speciality Hospital", location: "Alpha 2, Greater Noida", region: "noida", distance: 5.5, rating: 4.6, accreditation: "NABH Accredited", prices: { xray: 700, blood_test: 390, mri: 6400 }, slots: ["10:00 AM", "03:30 PM", "06:00 PM"] },
  { id: "aiims_delhi", name: "AIIMS New Delhi", location: "Ansari Nagar, New Delhi", region: "delhi", distance: 1.5, rating: 4.9, accreditation: "Govt Certified", prices: { xray: 150, blood_test: 80, mri: 2500 }, slots: ["08:00 AM", "10:30 AM", "01:00 PM"] },
  { id: "blk_delhi", name: "BLK-Max Super Speciality Hospital", location: "Pusa Road, New Delhi", region: "delhi", distance: 5.2, rating: 4.7, accreditation: "NABH & JCI", prices: { xray: 750, blood_test: 380, mri: 6500 }, slots: ["11:00 AM", "02:30 PM", "04:00 PM"] },
  { id: "apollo_delhi", name: "Indraprastha Apollo Hospital", location: "Sarita Vihar, New Delhi", region: "delhi", distance: 6.8, rating: 4.8, accreditation: "JCI Accredited", prices: { xray: 950, blood_test: 480, mri: 7800 }, slots: ["09:00 AM", "12:00 PM", "04:30 PM"] },
  { id: "gangaram_delhi", name: "Sir Ganga Ram Hospital", location: "Rajinder Nagar, New Delhi", region: "delhi", distance: 4.3, rating: 4.6, accreditation: "NABH Accredited", prices: { xray: 700, blood_test: 360, mri: 6300 }, slots: ["10:15 AM", "01:45 PM", "05:15 PM"] },
  { id: "medanta_gurgaon", name: "Medanta - The Medicity", location: "Sector 38, Gurgaon", region: "gurgaon", distance: 3.1, rating: 4.9, accreditation: "JCI Accredited", prices: { xray: 900, blood_test: 450, mri: 7500 }, slots: ["09:30 AM", "12:00 PM", "03:30 PM"] },
  { id: "artemis_gurgaon", name: "Artemis Hospital", location: "Sector 51, Gurgaon", region: "gurgaon", distance: 6.4, rating: 4.5, accreditation: "NABH Accredited", prices: { xray: 700, blood_test: 420, mri: 6800 }, slots: ["10:15 AM", "01:45 PM", "04:30 PM"] },
  { id: "fortis_gurgaon", name: "Fortis Memorial Research Institute", location: "Sector 44, Gurgaon", region: "gurgaon", distance: 2.9, rating: 4.8, accreditation: "NABH & JCI", prices: { xray: 850, blood_test: 440, mri: 7200 }, slots: ["11:15 AM", "02:00 PM", "05:30 PM"] }
];

const BRANDS = ["Prime Scan Center", "Curewell Medical", "Sterling Hospital", "San जीवन Care", "Narayana Health", "Apex Diagnostics"];

// 1. ADDED NEW NCR CITIES HERE: ghaziabad & faridabad
const CLUSTERS = ["noida", "delhi", "gurgaon", "ghaziabad", "faridabad"];

// 2. ADDED SECTOR LOCAL NAMES FOR THE NEW CITIES HERE:
const SECTORS = {
  noida: ["Sector 50", "Sector 128", "Sector 78", "Sector 62", "Knowledge Park I", "Alpha 1"],
  delhi: ["Rohini", "Karol Bagh", "Saket", "Dwarka", "Vasant Kunj", "Okhla Phase 3"],
  gurgaon: ["Sector 45", "Sohna Road", "Sector 43", "DLF Phase 3", "Golf Course Road"],
  ghaziabad: ["Indirapuram", "Vasundhara", "Raj Nagar Extension", "Kaushambi", "Vaishali", "Kavi Nagar"],
  faridabad: ["Sector 15", "Sector 21", "Green Field", "Nit Area", "Sector 37", "Surajkund"]
};

const ACCs = ["NABL Certified Lab", "Govt Registered Node", "NABH Accredited", "ISO 9001 Facility"];

// Safely generate the total array to hard-code 111 target count items permanently
const buildHardcodedArray = () => {
  const result = [...BASE_MOCK_LIST];
  const itemsNeeded = 111 - result.length;

  for(let i = 0; i < itemsNeeded; i++) {
    const region = CLUSTERS[i % CLUSTERS.length];
    const sector = SECTORS[region][i % SECTORS[region].length];
    const brand = BRANDS[i % BRANDS.length];
    
    result.push({
      id: `fixed_node_${region}_${i}`,
      name: `${brand} (#${i + 14})`,
      location: `${sector}, ${region.toUpperCase()}`,
      region: region,
      distance: parseFloat((11.0 + (i % 5) * 0.5).toFixed(1)), // Keeps distance well within your 15km filter view limits
      rating: parseFloat((4.0 + (i % 10) * 0.1).toFixed(1)),
      accreditation: ACCs[i % ACCs.length],
      prices: {
        xray: 400 + (i * 25 % 500),
        blood_test: 150 + (i * 15 % 300),
        mri: 4000 + (i * 200 % 3500)
      },
      slots: ["09:30 AM", "11:00 AM", "03:15 PM"]
    });
  }
  return result;
};

export const regionalHospitals = buildHardcodedArray();