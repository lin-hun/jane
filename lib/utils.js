let noPromiseMethods = {
  // 媒体
  stopRecord: true,
  getRecorderManager: true,
  pauseVoice: true,
  stopVoice: true,
  pauseBackgroundAudio: true,
  stopBackgroundAudio: true,
  getBackgroundAudioManager: true,
  createAudioContext: true,
  createInnerAudioContext: true,
  createVideoContext: true,
  createCameraContext: true,

  // 位置
  createMapContext: true,

  // 设备
  canIUse: true,
  startAccelerometer: true,
  stopAccelerometer: true,
  startCompass: true,
  stopCompass: true,
  onBLECharacteristicValueChange: true,
  onBLEConnectionStateChange: true,

  // 界面
  hideToast: true,
  hideLoading: true,
  showNavigationBarLoading: true,
  hideNavigationBarLoading: true,
  navigateBack: true,
  createAnimation: true,
  pageScrollTo: true,
  createSelectorQuery: true,
  createCanvasContext: true,
  createContext: true,
  drawCanvas: true,
  hideKeyboard: true,
  stopPullDownRefresh: true,

  // 拓展接口
  arrayBufferToBase64: true,
  base64ToArrayBuffer: true
}

let Utils = {}
// promiseify
Object.keys(wx).forEach((k) => {
  let method;
  if (noPromiseMethods[k] && k.substr(0, 2) !== 'on' && !(/\w+Sync$/.test(key))){
    method = new Promise((resolve, reject) => {
      wx[k]({
        success(v){
          resolve(v)
        },
        fail(v){
          reject(v)
        }
      })
    })
  }
  Utils[k] = method||wx[k]

})

module.exports = Utils