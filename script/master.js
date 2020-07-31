// // entry
// displayDataOnMasterSelector = (baseUrl, apiUrl) => {
//     getTodaysData(baseUrl, apiUrl)
// }

// getTodaysData = (baseUrl, endpoint) => {
//     // params
//     const yesterday = 0
//     const allowNull = 0

//     const reqUrl = `${baseUrl}${endpoint}?yesterday=${yesterday}&allowNull=${allowNull}`

//     fetch(reqUrl, {
//         method: 'GET'
//     }).then((res) => {
//         return res.json()
//     }).then((data) => {
//         setUpNavButtons(data)
//         setUpPieChart(data)
//     })
// }

setUpNavButtons = (data) => {
    // infected - active
    document.getElementById('active-delta').innerText = `Today: ${addDecimals(data.todayCases)}`
    document.getElementById('active-total').innerText = numbersFriendlyFormat(data.active)

    // deaths
    document.getElementById('deaths-delta').innerText = `Today: ${addDecimals(data.todayDeaths)}`
    document.getElementById('deaths-total').innerText = numbersFriendlyFormat(data.deaths)

    // recovered
    document.getElementById('recovered-delta').innerText = `Today: ${addDecimals(data.todayRecovered)}`
    document.getElementById('recovered-total').innerText = numbersFriendlyFormat(data.recovered)

    // total cases
    document.getElementById('cases-delta').innerText = `Today: ${addDecimals(data.cases)}`
    document.getElementById('cases-total').innerText = numbersFriendlyFormat(data.cases)
}