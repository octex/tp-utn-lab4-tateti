const KEY_MATCHES_SAVE = 'matches'

function saveMatchData(matchData)
{
    let currentDataSaved = JSON.parse(localStorage.getItem(KEY_MATCHES_SAVE));
    if (currentDataSaved == null)
    {
        let newMatchesList = JSON.stringify([matchData]);
        localStorage.setItem(KEY_MATCHES_SAVE, newMatchesList);
    }
    else
    {
        currentDataSaved.push(matchData);
        currentDataSaved = JSON.stringify(currentDataSaved);
        localStorage.setItem(KEY_MATCHES_SAVE, currentDataSaved);
    }
}

function getMatchesData()
{
    return JSON.parse(localStorage.getItem(KEY_MATCHES_SAVE));
}
