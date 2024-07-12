import request from 'supertest';
import { expect } from 'chai';
import app from '../index.js';

describe('Admin Stats Endpoint', () => {
    let token;

    before((done) => {
        request(app)
            .post('/api/v1/user/login')
            .send({
                phone: '01145958585',
                password: 'Ahmed@123'
            })
            .end((err, res) => {
                if (err) return done(err);
                token = res.body.token;
                done();
            });
    });

    it('should get user statistics with pagination', (done) => {
        request(app)
            .get('/api/v1/ads/statistics')
            .set('Authorization', `Bearer ${token}`)
            .query({ page: 1, limit: 10 })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const result = res.body;
                expect(result).to.be.an('object');
                expect(result).to.have.property('data').that.is.an('array');
                expect(result).to.have.property('page', 1);
                expect(result).to.have.property('limit', 10);
                expect(result).to.have.property('total').that.is.a('number');
                expect(result).to.have.property('hasNextPage').that.is.a('boolean');
                expect(result).to.have.property('hasPreviousPage').that.is.a('boolean');
                done();
            });
    });

    it('should filter users by roles CLIENT and AGENT', (done) => {
        request(app)
            .get('/api/v1/ads/statistics')
            .set('Authorization', `Bearer ${token}`)
            .query({ page: 1, limit: 10 })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const result = res.body;
                result.data.forEach(user => {
                    expect(['CLIENT', 'AGENT']).to.include(user.role);
                });
                done();
            });
    });

    it('should calculate ads and requests counts correctly', (done) => {
        request(app)
            .get('/api/v1/ads/statistics')
            .set('Authorization', `Bearer ${token}`)
            .query({ page: 1, limit: 10 })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const result = res.body;
                result.data.forEach(user => {
                    expect(user).to.have.property('adsCount').that.is.a('number');
                    expect(user).to.have.property('totalAdsAmount').that.is.a('number');
                    expect(user).to.have.property('requestsCount').that.is.a('number');
                    expect(user).to.have.property('totalRequestsAmount').that.is.a('number');
                });
                done();
            });
    });
});
