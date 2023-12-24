const {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunchById,

} = require('../../models/launches.model');


function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());

};

function httpAddNewLaunch(req, res) {
    const launch = req.body;
    launch.launchDate = new Date(launch.launchDate);
    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        res.status(400).json({
            error: 'MISSING required launch property.'
        });
    } else if (isNaN(launch.launchDate)) {
        res.status(400).json({
            error: 'INVALID launch date.'
        });
        
    }
    
    addNewLaunch(launch);
    return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
    launchId = Number(req.params.id)
    
    if (!existsLaunchWithId(launchId)) {
        return res.status(404).json({
            error: 'The launch NOT FOUND.'
        });

    } else {
        return res.status(200).json(abortLaunchById(launchId));
        
    }
}


module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,

};
