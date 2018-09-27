const { Transform } = require('stream');

/**
 * @module
 * Creates a transform stream with backpressure governed by the check() function.
 * @param {function} check - function that returns a promise. If it resolves to
 * truthy, chunk is passed through.
 * @param {object} config - general stream config passed to new Transform().
 * @returns {Transform} A transform stream.
 */
module.exports = function (check, config = {}) {
  function transform (chunk, encoding, callback) {
    const me = this;

    async function loop () {
      if (me.destroyed) return;
      try {
        const result = await check();
        if (result) {
          return callback(null, chunk);
        } else {
          setTimeout(loop, config.interval || 100);
        }
      } catch (err) {
        callback(err);
      }
    }
    loop();
  }

  function destroy (err, cb) {
    this.destroyed = true;
    if (err) this.emit('error', err);
    return cb();
  }

  const _config = Object.assign(config, {
    transform,
    destroy
  });
  return new Transform(_config);
};
