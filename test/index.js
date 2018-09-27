const expect = require('chai').expect;
const transformStreamBackpressure = require('..');
const { Writable } = require('stream');

describe('transform-stream-backpressure', function () {
  it('provides a transform stream', function (done) {
    const check = async () => true;
    const config = {};
    const stream = transformStreamBackpressure(check, config);
    stream.on('data', (chunk) => {
      expect(chunk.toString()).to.equal('nerf');
      done();
    });
    stream.write('nerf');
    stream.on('error', done);
    stream.destroy();
  });

  it('provides backpressure', function () {
    const check = async () => false;
    const config = { highWaterMark: 2, objectMode: true };
    const stream = transformStreamBackpressure(check, config);
    stream.pipe(new Writable({
      write (chunk, enc, cb) {
        console.log('written', chunk.toString());
        cb();
      }
    }));
    expect(stream.writableHighWaterMark).to.equal(2);
    let result = stream.write({one: 1});
    expect(result).to.equal(true);
    result = stream.write({two: 2});
    expect(result).to.equal(false);
    stream.destroy();
  });

  it('provides a way to cancel polling', function (done) {
    const check = async () => { throw new Error('should not be called'); };
    const config = { highWaterMark: 2, objectMode: true };
    const stream = transformStreamBackpressure(check, config);
    stream.on('error', function (err) {
      expect(err).to.be.an.instanceof(Error);
      expect(err.message).to.equal('you bet');
      done();
    });
    stream.destroy(new Error('you bet'));
    stream.write({two: 2});
  });
});
