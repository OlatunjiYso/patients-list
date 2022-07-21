const patients = require("./patients");

//Patient cummulative analysis
function cummulatveAnalysis(facilityLat, facilityLon) {
  const meanRespTime = getMeanResponseTime(patients);
  const reportList = patients.map((patient) => {
    const report = {};
    report.name = patient.name;
    report.id = patient.id;
    const offerAcceptancePoint = getOfferAcceptance(patient);
    const offerCancellationPoint = getOfferCancellation(patient);
    const responseTimePoint = getPunctuality(patient, meanRespTime);
    const agePoint = 10;
    const proximityPoint = getProximityPoint(facilityLat, facilityLon, patient);
    const points =
      (offerAcceptancePoint +
        offerCancellationPoint +
        responseTimePoint +
        agePoint +
        proximityPoint) /
      10;
    report.points = points;
    return report;
  });
  reportList.sort((reportA, reportB) => reportB.points - reportA.points);
  return reportList.slice(0, 10);
}

// Analysing the data for the mean response time
function getMeanResponseTime(allPatients) {
  let sumAverage = 0;
  let count = 0;
  for (let i = 0; i < patients.length; i++) {
    let patient = patients[i];
    if (patient.averageReplyTime) {
      count += 1;
      sumAverage += patient.averageReplyTime;
    }
  }
  return sumAverage / count;
}

// Analysing the data for the percentage punctuality.
function getPunctuality(patient, meanResponseTime) {
  let punctualityPercentage = 100;
  const responseTime = patient.averageReplyTime;
  const latenessPercentage = (responseTime / meanResponseTime) * 50;
  punctualityPercentage -= latenessPercentage;
  const weighted = getWeightedPercentage(punctualityPercentage, 20);
  return weighted;
}

// Analysing the data for the offerAcceptance.
function getOfferAcceptance(patient) {
  const acceptedOffers = patient.acceptedOffers;
  const cancelledOffers = patient.canceledOffers;
  let offerAcceptance = 0;
  //return full points for new patients
  if (acceptedOffers == 0 && cancelledOffers == 0) {
    offerAcceptance = 100;
  } else {
    offerAcceptance =
      (acceptedOffers / (acceptedOffers + cancelledOffers)) * 100;
  }
  return getWeightedPercentage(offerAcceptance, 30);
}

// Analysing the data for the offerCancellation.
function getOfferCancellation(patient) {
  const perfectCase = 100;
  const acceptedOffers = patient.acceptedOffers;
  const cancelledOffers = patient.canceledOffers;
  let cancellationDeductions = 0;
   //return full points for new patients
  if (acceptedOffers == 0 && cancelledOffers == 0) {
    cancellationDeductions = 0;
  } else {
    cancellationDeductions =
      (cancelledOffers / (acceptedOffers + cancelledOffers)) * 100;
  }
  const offerCancellation = perfectCase - cancellationDeductions;
  const weighted = getWeightedPercentage(offerCancellation, 30);
  return weighted;
}

// Analysis to get Proximity point
function getProximityPoint(facilityLat, facilityLon, patient) {
  const userLat = patient.location.latitude;
  const userLon = patient.location.longitude;
  const distance = distanceApart(facilityLat, userLat, facilityLon, userLon);
  if (distance <= 10) return 10;
  if (distance <= 20) return 9;
  if (distance <= 30) return 8;
  return 7;
}



function getWeightedPercentage(actualPercentage, percentageWeight) {
  return (actualPercentage * percentageWeight) / 100;
}

//Calculating the distance between 2 points defined by latitude and longitude
function distanceApart(lat1, lat2, lon1, lon2) {
  lon1 = (lon1 * Math.PI) / 180;
  lon2 = (lon2 * Math.PI) / 180;
  lat1 = (lat1 * Math.PI) / 180;
  lat2 = (lat2 * Math.PI) / 180;

  // Haversine formula
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
  let c = 2 * Math.asin(Math.sqrt(a));

  // Radius of earth in kilometers.
  let r = 6371;
  // calculate the result
  return c * r;
}

module.exports = cummulatveAnalysis;
