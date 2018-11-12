const Color = require('Color');

class Fixture {
  constructor(basePort, universe) {
    this._basePort = basePort;
    this._universe = universe;

    this._brightness = 0;
    this._r = 0;
    this._g = 0;
    this._b = 0;
  }

  color(color) {
    const rgb = this._getColor(color);
    this._r = rgb.r;
    this._g = rgb.g;
    this._b = rgb.b;
    this._update();

    return this;
  }

  brightness(brightness) {
    this._brightness = brightness;
    this._update();

    return this;
  }

  generate(brightness, hex) {
    return this._getConfig(brightness, hex ? this._getColor(hex) : null);
  }

  _getConfig(brightness, rgb) {
    const result = {
      [this._basePort]: brightness * 255
    };

    if (rgb) {
      result[this._basePort + 1] = rgb.r;
      result[this._basePort + 2] = rgb.g;
      result[this._basePort + 3] = rgb.b;
    }
    
    return result;
  }

  _update() {
    const code = this._getConfig(this._brightness, {r: this._r, g: this._g, b: this._b});
    this._universe.update(code);
  }

  _getColor(color) {
    if (color.object) {
      return color.object();
    }

    return new Color(color).object();
  }
}

module.exports = Fixture;