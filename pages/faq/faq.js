// pages/faq/faq.js

var faqs = require("../../configs/faq.js")

var touching = false;
var touchX, touchY;

var TOUCH_THRESHOLD_X = 50;

Page({

  /**
   * Page initial data
   */
  data: {
    subjects: [],
    previous: [],
    next: [],
    current: {
      subject: null,
      index: -1
    },
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log("onLoad");
    
    var subjects = faqs.subjects.slice();
    this.setData({
      subjects
    });

    this.selectNextSubject();
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  onTouchStart: function(e) {
    var x = e.touches[0].pageX;
    console.log("onTouchStart: ", x);

    touchX = x;
    touching = true;
  },

  onTouchMove: function(e) {
    var x = e.touches[0].pageX;
    console.log("onTouchMove: ", x);

    var endX = x;
    if (touching) {
      if (endX - touchX >= TOUCH_THRESHOLD_X) {
        touching = false;
        this.selectPreviousSubject();
      }
      else if (touchX - endX >= TOUCH_THRESHOLD_X) {
        touching = false;
        this.selectNextSubject();
      }
    }
  },

  onTouchEnd: function(e) {
    console.log("onTouchEnd");

    touching = false;
  },

  onNextFAQ: function(e) {
    console.log("onNextFAQ");

    this.selectNextFAQ();
  },

  selectNextSubject: function() {
    var subjects = this.data.subjects;
    var previous = this.data.previous;
    var next = this.data.next;
    var current = this.data.current.subject;
    var index = this.data.current.index;

    if (current != null && previous[previous.length-1] !== current) {
      previous.push(current);
      index = -1;
    }

    if (next.length > 0) {
      current = next.shift();
    }
    else if (subjects.length > 0) {
      current = subjects.shift();
    }

    this.setData({
      subjects, 
      previous, 
      next, 
      current: {
        subject: current, 
        index
      }
    });
  },

  selectPreviousSubject: function() {
    var subjects = this.data.subjects;
    var previous = this.data.previous;
    var next = this.data.next;
    var current = this.data.current.subject;
    var index = this.data.current.index;

    if (current != null && previous.length > 0) {
      next.unshift(current);
      index = -1;
    }

    if (previous.length > 0) {
      current = previous.pop();
    }

    this.setData({
      subjects, 
      previous, 
      next, 
      current: {
        subject: current, 
        index
      }
    });
  },

  selectNextFAQ: function() {
    var index = this.data.current.index;
    var subject = this.data.current.subject;
    if (index != subject.faqs.length - 1) {
      index++;
    }

    this.setData({current: {subject, index}});
  }
})