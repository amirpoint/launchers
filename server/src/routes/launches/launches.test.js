const request = require('supertest');
const app = require('../../app');


describe('Test GET /launches', () => {
    test('It should respond with 200 success.', async () => {
        const res = await request(app)
            .get('/launches')
            .expect('Content-Type', /json/)
            .expect(200);
    });

});

describe('Test POST /launches', () => {
    test('It should respond with 201 success.', async () => {
        const completeData = {
            mission: "MiYA XX",
            rocket: "ExplorerF 136",
            launchDate: "December 29, 2025",
            target: "Kepler-839 c"
        }
        const withoutDateData = {
            mission: "MiYA XX",
            rocket: "ExplorerF 136",
            target: "Kepler-839 c"
        }

        const res = await request(app)
            .post('/launches')
            .send(completeData)
            .expect('Content-Type', /json/)
            .expect(201);

        expect(new Date(res.body.launchDate).valueOf).toBe(new Date(completeData.launchDate).valueOf);
        expect(res.body).toMatchObject(withoutDateData);
        });
    
    test('It should catch MISSING required properties.', async () => {
        const res = await request(app)
            .post('/launches')
            .send({
                mission: "MiYA XX",
                rocket: "ExplorerF 136",
                launchDate: "December 29, 2025"
            })
            .expect('Content-Type', /json/)
            .expect(400);
            expect(res.body).toMatchObject({
                error: "MISSING required launch property."
            });
        
    });
    test('It should catch INVALID dates.', async () => {
        const res = await request(app)
            .post('/launches')
            .send({
                mission: "MiYA XX",
                rocket: "ExplorerF 136",
                launchDate: "bela bla",
                target: "Kepler-839 c"
            })
            .expect('Content-Type', /json/)
            .expect(400);

            expect(res.body).toMatchObject({
                error: "INVALID launch date."
            });

    });

});

describe('Test DELETE /launches', () => {
    test('It should return the aborted launch.', async () => {
        const res = await request(app)
        .delete('/launches/100')
        .expect('Content-Type', /json/)
        .expect(200);
    
    expect(res.body).toMatchObject({
        "flightNumber": 100,
        "mission": "Kepler Exploration IIV",
        "rocket": "Explorer 936",
        "launchDate": "2025-08-05T20:30:00.000Z",
        "target": "Kepler-339 c",
        "customers": [
            "ZTM",
            "NASA"
        ],
        "upcoming": false,
        "success": false
    });

    });

    test('It should catch NOT FOUND the launch.', async () => {
        const res = await request(app)
            .delete('/launches/999')
            .expect('Content-Type', /json/)
            .expect(404)

        expect(res.body).toMatchObject({
            error: "The launch NOT FOUND."
        });

    });
});
