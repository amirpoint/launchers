
const launches = new Map();

let latestFlightNum = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration IIV',
    rocket: 'Explorer 936',
    launchDate: new Date('August 06, 2025'),
    target: 'Kepler-339 c',
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,

};

launches.set(launch.flightNumber, launch);

function existsLaunchWithId(launchId) {
    return launches.has(launchId);

}

function getAllLaunches() {
    return Array.from(launches.values());

};

function addNewLaunch(launch) {
    latestFlightNum++;
    launches.set(
        latestFlightNum,
        Object.assign(launch, {
            flightNumber: latestFlightNum,
            customers: ['Zero to Mastery', 'NASA'],
            success: true,
            upcoming: true,

    })
    );
}

function abortLaunchById(launchId) {
    const aborted = launches.get(launchId)
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunchById,
    
};