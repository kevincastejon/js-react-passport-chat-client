export default class Utils {
  static getCookie = (cname) => {
    const name = `${cname}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i += 1) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  };

  static setCookie = (cname, cvalue, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${cname}=${cvalue};${expires};path=/`;
  };

  static deleteCookie = (cname) => {
    document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  static extractHour(time) {
    const date = new Date(time);
    let h = date.getHours();
    let m = date.getMinutes();

    h = (h < 10) ? `0${h}` : h;
    m = (m < 10) ? `0${m}` : m;

    return `${h}:${m}`;
  }

  static sameDay(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return d1.getFullYear() === d2.getFullYear()
    && d1.getMonth() === d2.getMonth()
    && d1.getDate() === d2.getDate();
  }

  static extractSimpleDate(date) {
    const d = new Date(date);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dd = d.getDate();
    const month = months[d.getMonth()];
    const yyyy = d.getFullYear();
    return `${dd} ${month} ${yyyy}`;
  }

  static decToRGB(dec) {
    const c = dec;
    const components = {
      r: (c & 0xff0000) >> 16,
      g: (c & 0x00ff00) >> 8,
      b: (c & 0x0000ff),
    };
    return (components);
  }

  static RGBToDec(r, g, b) {
    return (r << 16) + (g << 8) + (b);
  }

  static stringToDec(h) {
    let r = 0; let g = 0; let
      b = 0;

    // 3 digits
    if (h.length === 4) {
      r = `0x${h[1]}${h[1]}`;
      g = `0x${h[2]}${h[2]}`;
      b = `0x${h[3]}${h[3]}`;

      // 6 digits
    } else if (h.length === 7) {
      r = `0x${h[1]}${h[2]}`;
      g = `0x${h[3]}${h[4]}`;
      b = `0x${h[5]}${h[6]}`;
    }

    return `rgb(${+r},${+g},${+b})`;
  }
}
Utils.colors = ['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB'];
