<template>
  <div style="height: 100%">
    <div class="intro-container" v-show="loginShow">
      <h1 class="login-title">活动平台登陆</h1>
      <el-input class="top20" placeholder="请输入账号" v-model="user.username" style="margin-top: 30px">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-input class="top20" placeholder="请输入密码" type="password" v-model="user.password" @keyup.enter.native="login"></el-input>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-button class="top20" @click="toRegister" type="success" style="width:100%">注册</el-button>
        </el-col>
        <el-col :span="12">
          <el-button class="top20" @click="login" type="primary" style="width:100%">登陆</el-button>
        </el-col>
      </el-row>
      <div>
      </div>
    </div>
    <div class="sky-container" id="sky-container" v-show="!loginShow">
      <div class="x-mark">
        <section style="width: 300px">
          <h1 style="color:white">欢 迎 !</h1>
          <h3 class="login-title top10">平台会员注册</h3>
          <el-input class="top20 "  placeholder="用户名" v-model="registerParams.username"></el-input>
          <el-input class="top20 " placeholder="密码" v-model="registerParams.password" type="password"></el-input>
          <el-input class="top20 "  placeholder="重复密码" v-model="registerParams.password"  type="password" ></el-input>
        </section>
        <el-button @click="register" class="top20" type="success" style="width: 300px">注册</el-button>
        <el-button @click="toLogin" class="top20" type="primary" style="width:300px;margin-left: 0px">返回登陆</el-button>
      </div>
    </div>
    <div>
      <el-button class="back-home-button" type="primary" @click="toHome">返回首页</el-button>
    </div>
    <div id="backroundCanvas"></div>
  </div>
</template>

<script>


  export default {
    data() {
      return {
        user: {
          username: '',
          password: '',
        },
        registerParams: {
          username: '',
          password: '',
        },
        loginShow: true,
      }
    },
    methods: {
      toRegister() {
        this.loginShow = false
        var introContainer = document.getElementsByClassName('intro-container')[0];
        var skyContainer = document.getElementsByClassName('sky-container')[0];
        var xMark = document.getElementsByClassName('x-mark')[0];
        var introTimeline = new TimelineMax();
        introTimeline.add([TweenLite.fromTo(introContainer, 0.5, {opacity: 1}, {
          opacity: 0,
          ease: Power3.easeIn
        }), TweenLite.to(camera.rotation, 3, {
          x: Math.PI / 2,
          ease: Power3.easeInOut
        }), TweenLite.to(camera.position, 2.5, {z: 20, ease: Power3.easeInOut}), TweenLite.to(camera.position, 3, {
          y: 120,
          ease: Power3.easeInOut
        }), TweenLite.to(plane.scale, 3, {x: 2, ease: Power3.easeInOut})]);

        introTimeline.add([TweenLite.to(xMark, 2, {
          opacity: 1,
          ease: Power3.easeInOut
        }), TweenLite.to(skyContainer, 2, {opacity: 1, ease: Power3.easeInOut})]);
      },
      toLogin() {
        this.loginShow = true
        var outroTimeline = new TimelineMax();
        var introContainer = document.getElementsByClassName('intro-container')[0];
        var skyContainer = document.getElementsByClassName('sky-container')[0];
        var xMark = document.getElementsByClassName('x-mark')[0];
        outroTimeline.add([TweenLite.to(xMark, 0.5, {
          opacity: 0,
          ease: Power3.easeInOut
        }), TweenLite.to(skyContainer, 0.5, {opacity: 0, ease: Power3.easeInOut}), TweenLite.to(camera.rotation, 3, {
          x: 0,
          ease: Power3.easeInOut
        }), TweenLite.to(camera.position, 3, {z: 50, ease: Power3.easeInOut}), TweenLite.to(camera.position, 2.5, {
          y: 0,
          ease: Power3.easeInOut
        }), TweenLite.to(plane.scale, 3, {x: 1, ease: Power3.easeInOut})]);

        outroTimeline.add([TweenLite.to(introContainer, 0.5, {opacity: 1, ease: Power3.easeIn})]);
      },
      login() {
        this.$store.dispatch('Login', this.user).then(res => {
          this.$router.push('/')
          this.$message.success(res.data.msg)
        })
      },
      register() {
        this.$store.dispatch('Register', this.registerParams).then(res => {
          this.$message.success(res.data.msg)
        })
      },
      toHome() {
        this.$router.push('/home')
      }
    },
    mounted() {
      document.getElementById('backroundCanvas').appendChild(renderer.domElement)
    },
  }

  var raycaster = new THREE.Raycaster();
  var normalizedMouse = {
    x: 0,
    y: -180
  };
  var darkBlue = {
    r: 0,
    g: 52,
    b: 74
  };
  // var baseColorRGB = darkBlue;
  var baseColor = "rgb(" + darkBlue.r + "," + darkBlue.g + "," + darkBlue.b + ")";

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.5, 1000);
  var renderer = new THREE.WebGLRenderer();

  // Scene initialization
  camera.position.z = 50;
  renderer.setClearColor("#121212", 1.0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // document.body.appendChild(renderer.domElement);


  // Lights
  var topLight = new THREE.DirectionalLight(0xffffff, 1);
  topLight.position.set(0, 1, 1).normalize();
  scene.add(topLight);

  var bottomLight = new THREE.DirectionalLight(0xffffff, 0.4);
  bottomLight.position.set(1, -1, 1).normalize();
  scene.add(bottomLight);

  var skyLightRight = new THREE.DirectionalLight(0x666666, 0.2);
  skyLightRight.position.set(-1, -1, 0.2).normalize();
  scene.add(skyLightRight);

  var skyLightCenter = new THREE.DirectionalLight(0x666666, 0.2);
  skyLightCenter.position.set(-0, -1, 0.2).normalize();
  scene.add(skyLightCenter);

  var skyLightLeft = new THREE.DirectionalLight(0x666666, 0.2);
  skyLightLeft.position.set(1, -1, 0.2).normalize();
  scene.add(skyLightLeft);

  // Mesh creation
  var geometry = new THREE.PlaneGeometry(400, 400, 70, 70);
  var darkBlueMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shading: THREE.FlatShading,
    side: THREE.DoubleSide,
    vertexColors: THREE.FaceColors
  });

  geometry.vertices.forEach(function (vertice) {
    vertice.x += (Math.random() - 0.5) * 4;
    vertice.y += (Math.random() - 0.5) * 4;
    vertice.z += (Math.random() - 0.5) * 4;
    vertice.dx = Math.random() - 0.5;
    vertice.dy = Math.random() - 0.5;
    vertice.randomDelay = Math.random() * 5;
  });

  for (var i = 0; i < geometry.faces.length; i++) {
    geometry.faces[i].color.setStyle(baseColor);
    geometry.faces[i].baseColor = darkBlue;
  }

  var plane = new THREE.Mesh(geometry, darkBlueMaterial);
  scene.add(plane);

  // Create stars
  var farthestStars = createStars(1200, 420, "#0952BD");
  var farStars = createStars(1200, 370, "#A5BFF0");
  var nearStars = createStars(1200, 290, "#118CD6");

  scene.add(farthestStars);
  scene.add(farStars);
  scene.add(nearStars);

  farStars.rotation.x = 0.25;
  nearStars.rotation.x = 0.25;

  function createStars(amount, yDistance) {
    var color = arguments.length <= 2 || arguments[2] === undefined ? "0x000000" : arguments[2];

    var opacity = Math.random();
    var starGeometry = new THREE.Geometry();
    var starMaterial = new THREE.PointsMaterial({color: color, opacity: opacity});

    for (var i = 0; i < amount; i++) {
      var vertex = new THREE.Vector3();
      vertex.z = (Math.random() - 0.5) * 1500;
      vertex.y = yDistance;
      vertex.x = (Math.random() - 0.5) * 1500;

      starGeometry.vertices.push(vertex);
    }

    return new THREE.Points(starGeometry, starMaterial);
  }

  var timer = 0;

  function render() {
    requestAnimationFrame(render);
    timer += 0.01;
    var vertices = plane.geometry.vertices;
    for (var i = 0; i < vertices.length; i++) {
      // Ease back to original vertice position while still maintaining sine wave
      vertices[i].x -= Math.sin(timer + vertices[i].randomDelay) / 40 * vertices[i].dx;
      vertices[i].y += Math.sin(timer + vertices[i].randomDelay) / 40 * vertices[i].dy;
      // ((vertices[i].x - vertices[i].originalPosition.x) * 0.1) +
    }
    // Determine where ray is being projected from camera view
    raycaster.setFromCamera(normalizedMouse, camera);
    // Send objects being intersected into a variable
    var intersects = raycaster.intersectObjects([plane]);

    if (intersects.length > 0) {
      var faceBaseColor = intersects[0].face.baseColor;

      plane.geometry.faces.forEach(function (face) {
        face.color.r *= 255;
        face.color.g *= 255;
        face.color.b *= 255;

        face.color.r += (faceBaseColor.r - face.color.r) * 0.01;
        face.color.g += (faceBaseColor.g - face.color.g) * 0.01;
        face.color.b += (faceBaseColor.b - face.color.b) * 0.01;

        var rInt = Math.floor(face.color.r);
        var gInt = Math.floor(face.color.g);
        var bInt = Math.floor(face.color.b);

        var newBasecol = "rgb(" + rInt + "," + gInt + "," + bInt + ")";
        face.color.setStyle(newBasecol);
      });
      plane.geometry.colorsNeedUpdate = true;

      intersects[0].face.color.setStyle("#006ea0");
      plane.geometry.colorsNeedUpdate = true;
    }

    plane.geometry.verticesNeedUpdate = true;
    plane.geometry.elementsNeedUpdate = true;

    farthestStars.rotation.y -= 0.00001;
    farStars.rotation.y -= 0.00005;
    nearStars.rotation.y -= 0.00011;

    renderer.render(scene, camera);
  }

  window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  window.addEventListener("mousemove", function (event) {
    // Normalize mouse coordinates
    normalizedMouse.x = event.clientX / window.innerWidth * 2 - 1;
    normalizedMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  });
  render();
</script>


<style>
  .back-home-button {
    display: flex;
    align-items: center;
    left: 20px;
    top: 20px;
    position: absolute;
  }
  .login-title {
    opacity:0.8;
    text-align: center;
    font-weight: bold;
    color: #eee;
    font-size: 2em
  }

  .login-content {
    display: flex;
    justify-content: center;
  }

  .intro-container {
    position: absolute;
    top: 40%;
    /*height: 200px;*/
    width: 300px;
    transform: translateY(-65%);
    background-color: rgba(0, 0, 0, 0);
    /*text-align: center;*/
    margin: 0 auto;
    right: 0;
    left: 0;
    color: white;
  }

  h1 {
    font-family: 'brandon-grotesque', sans-serif;
    font-weight: bold;
    margin-top: 0px;
    margin-bottom: 0;
    font-size: 20px;
  }

  @media screen and (min-width: 860px) {
    h1 {
      font-size: 40px;
      line-height: 52px;
    }
  }

  .fancy-text {
    font-family: "adobe-garamond-pro", sans-serif;
    font-style: italic;
    letter-spacing: 1px;
    margin-bottom: 17px;
  }

  .button {
    position: relative;
    cursor: pointer;
    display: inline-block;
    font-family: 'brandon-grotesque', sans-serif;
    text-transform: uppercase;
    min-width: 200px;
    margin-top: 30px;
  }

  .button:hover .border {
    box-shadow: 0px 0px 10px 0px white;
  }

  .button:hover .border .left-plane, .button:hover .border .right-plane {
    transform: translateX(0%);
  }

  .button:hover .text {
    color: #121212;
  }

  .button .border {
    border: 1px solid white;
    transform: skewX(-20deg);
    height: 32px;
    border-radius: 3px;
    overflow: hidden;
    position: relative;
    transition: .10s ease-out;
  }

  .button .border .left-plane, .button .border .right-plane {
    position: absolute;
    background: white;
    height: 32px;
    width: 100px;
    transition: .15s ease-out;
  }

  .button .border .left-plane {
    left: 0;
    transform: translateX(-100%);
  }

  .button .border .right-plane {
    right: 0;
    transform: translateX(100%);
  }

  .button .text {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    transition: .15s ease-out;
  }

  .x-mark {
    right: 10px;
    top: 10px;
    position: absolute;
    cursor: pointer;
    opacity: 0;
  }

  .x-mark:hover .right {
    transform: rotate(-45deg) scaleY(1.2);
  }

  .x-mark:hover .left {
    transform: rotate(45deg) scaleY(1.2);
  }

  .x-mark .container {
    position: relative;
    width: 20px;
    height: 20px;
  }

  .x-mark .left, .x-mark .right {
    width: 2px;
    height: 20px;
    background: white;
    position: absolute;
    border-radius: 3px;
    transition: .15s ease-out;
    margin: 0 auto;
    left: 0;
    right: 0;
  }

  .x-mark .right {
    transform: rotate(-45deg);
  }

  .x-mark .left {
    transform: rotate(45deg);
  }

  .sky-container {
    position: absolute;
    /*color: white;*/
    text-transform: uppercase;
    /*margin: 0 auto;*/
    /*right: 0;*/
    /*left: 0;*/
    /*top: 2%;*/
    text-align: center;
    opacity: 0;
  }

  @media screen and (min-width: 860px) {
    .sky-container {
      top: 18%;
      right: 12%;
      left: auto;
    }
  }

  .sky-container__left, .sky-container__right {
    display: inline-block;
    vertical-align: top;
    font-weight: bold;
  }

  .sky-container__left h2, .sky-container__right h2 {
    font-family: 'brandon-grotesque', sans-serif;
    font-size: 26px;
    line-height: 26px;
    margin: 0;
  }

  @media screen and (min-width: 860px) {
    .sky-container__left h2, .sky-container__right h2 {
      font-size: 72px;
      line-height: 68px;
    }
  }

  .sky-container__left {
    margin-right: 5px;
  }

  .sky-container .thirty-one {
    letter-spacing: 4px;
  }

  .text-right {
    text-align: right;
  }

  .text-left {
    text-align: left;
  }

  .twitter:hover a {
    transform: rotate(-45deg) scale(1.05);
  }

  .twitter:hover i {
    color: #21c2ff;
  }

  .twitter a {
    bottom: -40px;
    right: -75px;
    transform: rotate(-45deg);
  }

  .twitter i {
    bottom: 7px;
    right: 7px;
    color: #00ACED;
  }

  .social-icon a {
    position: absolute;
    background: white;
    color: white;
    box-shadow: -1px -1px 20px 0px rgba(0, 0, 0, 0.3);
    display: inline-block;
    width: 150px;
    height: 80px;
    transform-origin: 50% 50%;
    transition: .15s ease-out;
  }

  .social-icon i {
    position: absolute;
    pointer-events: none;
    z-index: 1000;
    transition: .15s ease-out;
  }

  .youtube:hover a {
    transform: rotate(45deg) scale(1.05);
  }

  .youtube:hover i {
    color: #ec4c44;
  }

  .youtube a {
    bottom: -40px;
    left: -75px;
    transform: rotate(45deg);
  }

  .youtube i {
    bottom: 7px;
    left: 7px;
    color: #E62117;
  }

</style>
