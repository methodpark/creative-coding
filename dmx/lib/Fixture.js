const hexToRgb = require('./hexToRgb');

class Fixture {
  constructor(basePort, universe) {
    this._basePort = basePort;
    this._universe = universe;

    this._brightness = 0;
    this._r = 0;
    this._g = 0;
    this._b = 0;
  }

  color(hex) {
    const rgb = hexToRgb(hex);
    this._r = rgb.r;
    this._g = rgb.g;
    this._b = rgb.b;
    this._update();
  }

  brightness(brightness) {
    this._brightness = brightness;
    this._update();
  }

  generate(brightness, hex) {
    const rgb = hexToRgb(hex);
    return this._getConfig(brightness, rgb.r, rgb.g, rgb.b);
  }

  _getConfig(brightness, r, g, b) {
    return {
      [this._basePort]: brightness * 255,
      [this._basePort + 1]: r,
      [this._basePort + 2]: g,
      [this._basePort + 3]: b,
    }
  }

  _update() {
    const code = this._getConfig(this._brightness, this._r, this._g, this._b);
    this._universe.update(code);
  }
}

module.exports = Fixture;