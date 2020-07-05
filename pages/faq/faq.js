// pages/faq/faq.js

var faqs = require("../../configs/faq.js")

var touching = false;
var touchX, touchY;

const TOUCH_THRESHOLD_X = 50;

Page({

  /**
   * Page initial data
   */
  data: {
    subjects: [],
    previousSubjects: [],
    nextSubjects: [],
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
    var previousSubjects = this.data.previousSubjects;
    var nextSubjects = this.data.nextSubjects;
    var current = this.data.current.subject;
    var index = this.data.current.index;

    var next = null;
    if (nextSubjects.length > 0) {
      next = nextSubjects.shift();
    }
    else if (subjects.length > 0) {
      next = subjects.shift();
    }

    if (current == null) {
      current = next;
      index = -1;
    }
    else if (current != null && next != null) {
      previousSubjects.push(current);
      current = next;
      index = -1;
    }

    this.setData({
      subjects, 
      previousSubjects, 
      nextSubjects, 
      current: {
        subject: current, 
        index
      }
    });
  },

  selectPreviousSubject: function() {
    var subjects = this.data.subjects;
    var previousSubjects = this.data.previousSubjects;
    var nextSubjects = this.data.nextSubjects;
    var current = this.data.current.subject;
    var index = this.data.current.index;

    var previous = null;
    if (previousSubjects.length > 0) {
      previous = previousSubjects.pop();
    }

    if (current != null && previous != null) {
      nextSubjects.unshift(current);
      current = previous;
      index = -1;
    }

    this.setData({
      subjects, 
      previousSubjects, 
      nextSubjects, 
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