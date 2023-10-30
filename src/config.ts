const isLocalhost = window.location.hostname === 'localhost'

export default {
    publicVapidKey: 'BBylzpJbeexgDvm7xlclV_ffBfou-TGThy4WKqM7t7DzfApf2XfbulNmNGGTirGo8VMJkpoLKX3eB6Xzj-H8x0g',
    baseUrl: isLocalhost ? 'http://localhost:5001' : ''
}