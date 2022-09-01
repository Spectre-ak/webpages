function sendStats() {
    fetch('https://api.bigdatacloud.net/data/ip-geolocation?key=' + process.env.REACT_APP_GEO_LOC_KEY).then(res => res.json()).then(res => {
        console.log(res);
        const query_parameters = {};
        query_parameters['ip'] = res.ip;
        query_parameters['country_name'] = res.country.name;
        query_parameters['isoNameFull'] = res.country.isoNameFull;
        query_parameters['unRegion'] = res.country.unRegion;
        query_parameters['continents'] = res.location.continent;
        query_parameters['principalSubdivision'] = res.location.principalSubdivision;
        query_parameters['isoPrincipalSubdivision'] = res.location.isoPrincipalSubdivision;
        query_parameters['city'] = res.location.city;
        query_parameters['timeZone'] = res.location.timeZone.displayName;
        query_parameters['organisation'] = res.network.organisation;
        query_parameters['registeredCountryName'] = res.network.registeredCountryName;
        const query_ar = [];
        for (var key in query_parameters) {
            query_ar.push(key + '=' + query_parameters[key]);
        }
        const query_string = query_ar.join('&');
        console.log(query_string);
        getUserDetails(query_string);
    }).catch(err => {
        console.log(err);
    });
}

function getUserDetails(query_string) {
    console.log(process.env.REACT_APP_SHEET_SCRIPT_URL + '?' + query_string);
    fetch(process.env.REACT_APP_SHEET_SCRIPT_URL + '?' + query_string).then(res => res.text()).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
}

export default sendStats;
