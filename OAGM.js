/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 - 2018, OAF2E
 * @license     http://opensource.org/licenses/MIT  MIT License
 * @link        https://www.ioa.tw/
 */

function OAGM (option) {
  this._div = null;
  this._option = Object.assign ({className: '', top: 0, left: 0, width: 32, height: 32, html: '', map: null, position: null, css: {} }, option);
  this._option.map && this.setMap (this._option.map);
}
function initOAGM () {
  OAGM.prototype = new google.maps.OverlayView ();

  Object.assign (OAGM.prototype, {
    setPoint: function () {
      if (!this._option.position) {
        this._div.style.left = '-999px';
        this._div.style.top = '-999px';
        return;
      }

      var point = this.getProjection ().fromLatLngToDivPixel (this._option.position);

      if (point) {
        this._div.style.left = (point.x - this._option.width / 2 + this._option.left) + 'px';
        this._div.style.top = (point.y - this._option.height / 2 + this._option.top) + 'px';
      }
    },
    draw: function () {
      if (!this._div) {
        this._div = document.createElement ('div');
        this._div.style.position = 'absolute';

        this._div.className = this._option.className;
        this._div.style.width = this._option.width + 'px';
        this._div.style.height = this._option.height + 'px';
        this._div.innerHTML = this._option.html;

        for (var k in this._option.css)
          if (!(k == 'width' || k == 'height' || k == 'top' || k == 'left' || k == 'bottom' || k == 'right'))
            this._div.style[k] = this._option.css[k];
        
        var that = this;
        google.maps.event.addDomListener (this._div, 'click', function(e) { if (e.stopPropagation) e.stopPropagation (); google.maps.event.trigger (that, 'click'); });

        var panes = this.getPanes ();
        panes.overlayImage.appendChild (this._div);
      }

      this.setPoint ();
    },
    remove: function () {
      if (!this._div)
        return this;

      this._div.parentNode.removeChild (this._div);
      this._div = null;
      
      return this;
    },
    setWidth: function (width) {
      if (!this._div)
        return this;

      this._option.width = width;
      this._div.style.width = this._option.width + 'px';
      this.setPoint ();
      return this;
    },
    setHeight: function (height) {
      if (!this._div)
        return this;

      this._option.height = height;
      this._div.style.height = this._option.height + 'px';
      this.setPoint ();
      return this;
    },
    setTop: function (top) {
      if (!this._div)
        return this;

      this._option.top = top;
      this._div.style.top = this._option.top + 'px';
      this.setPoint ();
      return this;
    },
    setLeft: function (left) {
      if (!this._div)
        return this;

      this._option.left = left;
      this._div.style.left = this._option.left + 'px';
      this.setPoint ();
      return this;
    },
    setHtml: function (html) {
      if (!this._div)
        return this;

      this._option.html = html;
      this._div.innerHTML = this._option.html;
      return this;
    },
    setCss: function (css) {
      if (!this._div)
        return this;

      this._option.css = css;

      for (var k in this._option.css)
        if (!(k == 'width' || k == 'height' || k == 'top' || k == 'left' || k == 'bottom' || k == 'right'))
          this._div.style[k] = this._option.css[k];
      
      return this;
    },
    setClassName: function (className) {
      if (!this._div)
        return this;

      this._option.className = className;
      this._div.className = this._option.className;
      return this;
    },
    getClassName: function () {
      return this._option.className;
    },
    setPosition: function (position) {
      if (!this.map)
        return this;

      this._option.position = position;
      this.setPoint ();

      return this;
    },
    getPosition: function () {
      return this._option.position;
    }
  });
}