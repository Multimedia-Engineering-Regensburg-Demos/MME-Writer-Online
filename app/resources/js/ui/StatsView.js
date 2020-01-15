/* eslint-env browser */

class StatsView {

  constructor(el) {
    this.wordCounterEl = el.querySelector(".words");
    this.readingTimeEl = el.querySelector(".time");
  }

  update(stats) {
    this.wordCounterEl.innerHTML = stats.words;
    this.readingTimeEl.innerHTML = stats.readingTimeInMinutes;
  }
}

export default StatsView;