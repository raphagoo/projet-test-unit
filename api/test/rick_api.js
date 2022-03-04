import chai from "chai";

describe('Test list API Rick & Morty', () => {
    it('results should be a array', (done) => {
        chai.request('https://rickandmortyapi.com')
            .get('/api/character')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.results.should.be.a('array')
                done()
            })
    });
});
