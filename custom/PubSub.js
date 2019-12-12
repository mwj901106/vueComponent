(function (window) {
  const PubSub = {}

  const callbackContainer = {}
  let id = 0
// 订阅
  PubSub.subscribe = function (eventName,callback) {
    let callbacks = callbackContainer[eventName]
    if(!callbacks){
      callbacks = {}
      callbacks[eventName] = callbacks
    }
    const token = `uid_${eventName}_${++id}`
    callbacks[token] = callback
  }
// 发布(异步)
  PubSub.publish = function (eventName,data){
    const callbacks = callbackContainer[eventName]
    if(callbacks){
      Object.values(callbacks).forEach(callback =>{
        setTimeout(() => {
          callback(eventName,data)
        });
      })
    }
  }
// 发布(同步)
  PubSub.publishSync = function (eventName,data) {
    const callbacks = callbackContainer[eventName]
    if (callbacks) {
      Object.values(callbacks).forEach(callback => {
        callback(eventName, data) 
      })
    }
  }
// 取消
  PubSub.unsubscribe = function (flag) {
    if (flag===undefined) {
      callbackContainer = {}
    } else if (typeof flag==='string' && flag.indexOf('uid_')===0) {  
      Object.values(callbackContainer).forEach(callbacks => {
        delete callbacks[flag]
      })
    } else {
      delete callbackContainer[flag]
    }
  }
  Window.PubSub = PubSub
})(window)