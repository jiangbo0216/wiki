## 创建场景

```js
const scene = new THREE.Scene();
// 透视摄像机
const camera = new THREE.PerspectiveCamera( 75 /* 视野角度*/, window.innerWidth / window.innerHeight /* 长宽比 */, 0.1  , 1000 /* 近截面（near）和远截面（far） */ );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

```

## 兼容性检查

引入  <https://github.com/mrdoob/three.js/blob/master/examples/jsm/WebGL.js>

```js
if (WEBGL.isWebGLAvailable()) {
    // Initiate function or other initializations here
    animate();
} else {
    const warning = WEBGL.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}
```


