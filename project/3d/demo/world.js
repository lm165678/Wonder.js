var mMatrix = Math3D.Matrix.create();
var mvpMatrix = null;



var keyState = {};
var isRotate = false;

$(function(){
    var webgl = Engine3D.Webgl.create();

    webgl.init();

    bindCanvasEvent(c);

    var loader = Engine3D.Loader.create();

    loader.load([{
        src: "../content/1.jpg",
        id: "1"
        //type: "texture"
    },
        {
            src: "../content/2.jpg",
            id: "2"
            //type: "texture"
        },
        {
            src: "../content/3.jpg",
            id: "3"
            //type: "texture"
        },
        {
            src: "../content/4.jpg",
            id: "4"
            //type: "texture"
        },
        {
            src: "../content/5.jpg",
            id: "5"
            //type: "texture"
        },
        {
            src: "../content/6.jpg",
            id: "6"
            //type: "texture"
        }]);




    var camera = Engine3D.Camera.create({
            eyeX: 0,
            eyeY: 0.0,
            eyeZ: 1.0,
            centerX:0,
            centerY:0,
            centerZ: -1,
            upX:0,
            upY: 1,
            upZ: 0
        },
        //    eyeX: -0.5,
        //        eyeY: -0.5,
        //        eyeZ:-0.5 ,
        //        centerX:-0.5,
        //        centerY:-0.5,
        //        centerZ: -1,
        //        upX:0,
        //        upY: 1,
        //        upZ: 0
        //},
        {
            angle: 60,
            aspect : c.width / c.height,
            near : 0.1,
            far : 10
        });


    var onload = function(){
        var skyBox = null;
        var rectangle = null;
        var cube = null;
        var sphere = null;



        init();

        loop();


        function init(){
            var vs = Engine3D.Shader.create();
            var fs = Engine3D.Shader.create();

            var skyBoxPrg = Engine3D.Program.create(vs.createShader("skyBox-vs"), fs.createShader("skyBox-fs"));

            skyBox = createSkyBox();

            skyBox.program = skyBoxPrg;

            var texture2DPrg  = Engine3D.Program.create(vs.createShader("rectangle-vs"), fs.createShader("rectangle-fs"));

            rectangle = createRectangle();
            rectangle.program = texture2DPrg;




            var lightPrg  = Engine3D.Program.create(vs.createShader("sphere-vs"), fs.createShader("sphere-fs"));

            cube = createCube();
            cube.program = lightPrg;


            sphere = createSphere();
            sphere.program = lightPrg;


            gl.clearColor(0, 0, 0, 1);

            gl.enable(gl.DEPTH_TEST);



            //init Matrix

            mMatrix.setIdentity();


            camera.init();
        }


        function loop(){
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Clear the color buffer


            camera.onStartLoop();

            move();
            if(isRotate){
                camera.rotate();
            }
            zoom();


            camera.run();



            drawSprites();




            camera.onEndLoop();

            setAllFalse();
            isRotate = false;



            requestAnimationFrame(loop);
        }


        function drawSprites(){
            var o = skyBox;
            o.program.use();


            o.onStartLoop();


            o.update();

            mvpMatrix = camera.computeMvpMatrix(o.matrix);

            var dataArr = [{
                name: "a_position",
                buffer: o.buffers.vertexBuffer  ,
                category: "attribute"
            },
                {
                    name: "a_texCoord",
                    buffer: o.buffers.texCoordBuffer  ,
                    category: "attribute"
                },
                {
                    name:"u_mvpMatrix",
                    type: Engine3D.DataType.FLOAT_MAT4,
                    val: mvpMatrix.values,
                    category: "uniform"
                }];

            //o.texture.bindToUnit(0);

            o.draw(dataArr);


            o.onEndLoop();





            o = rectangle;
            o.program.use();

            o.onStartLoop();


            o.update();

            mvpMatrix = camera.computeMvpMatrix(o.matrix);


            dataArr = [{
                name: "a_position",
                buffer: o.buffers.vertexBuffer  ,
                category: "attribute"
            },
                {
                    name: "a_texCoord",
                    buffer: o.buffers.texCoordBuffer  ,
                    category: "attribute"
                },
                {
                    name:"u_mvpMatrix",
                    type: Engine3D.DataType.FLOAT_MAT4,
                    val: mvpMatrix.values,
                    category: "uniform"
                }];

            //o.texture.bindToUnit(0);

            o.draw(dataArr);

            o.onEndLoop();





            //light
            var pointLightArr = [
            ];


            var pointLightPos = [0.0, 0.0, 0.15];
            var pointColor = [1.0, 1.0, 0.0];
            var pointIntensity = 0.8;


            var attenuation = Engine3D.Light.Attenuation.create(4);

            pointLightArr.push(Engine3D.Light.PointLight.create(
                pointLightPos,
                pointColor,
                pointIntensity,
                attenuation
            ));

            pointLightPos = [0.15, 0.0, 0.0];
            pointColor = [0.0, 1.0, 0.0];
            pointIntensity = 1.0;


            attenuation = Engine3D.Light.Attenuation.create(4);

            pointLightArr.push(Engine3D.Light.PointLight.create(
                pointLightPos,
                pointColor,
                pointIntensity,
                attenuation
            ));




            var ambientLightColor = [0.2, 0.2, 0.2];




            var viewPos = camera.computeViewPosInWorldCoordinate();



            //draw cube

            o = cube;
            o.program.use();


            o.onStartLoop();


            o.update();

            mvpMatrix = camera.computeMvpMatrix(o.matrix);

            var normalMatrix = Math3D.Matrix.create();

            normalMatrix.setInverseOf(o.matrix);
            normalMatrix.transpose();



            //dataArr = [{
            //    name: "a_position",
            //    buffer: o.buffers.vertexBuffer  ,
            //    category: "attribute"
            //},
            //    {
            //        name: "a_texCoord",
            //        buffer: o.buffers.texCoordBuffer  ,
            //        category: "attribute"
            //    },
            //    {
            //        name:"u_mvpMatrix",
            //        type: Engine3D.DataType.FLOAT_MAT4,
            //        val: mvpMatrix.values,
            //        category: "uniform"
            //    }];


            dataArr = [{
                name: "a_position",
                buffer: o.buffers.vertexBuffer  ,
                category: "attribute"
            },
                {
                    name: "a_normal",
                    buffer: o.buffers.normalBuffer  ,
                    category: "attribute"
                },
                {
                    name: "a_texCoord",
                    buffer: o.buffers.texCoordBuffer  ,
                    category: "attribute"
                },
                {
                    name:"u_normalMatrix",
                    type: Engine3D.DataType.FLOAT_MAT4,
                    val: normalMatrix.values,
                    category: "uniform"
                },
                {
                    name:"u_mMatrix",
                    type: Engine3D.DataType.FLOAT_MAT4,
                    val: o.matrix.values,
                    category: "uniform"
                },
                {
                    name:"u_ambient",
                    type: Engine3D.DataType.FLOAT_3,
                    val: ambientLightColor,
                    category: "uniform"
                },
                {
                    name:"u_viewPos",
                    type: Engine3D.DataType.FLOAT_3,
                    val: viewPos,
                    category: "uniform"
                },

                {
                    name:"u_pointLights[0]",
                    type: Engine3D.DataType.STRUCT,
                    val: {
                        member: [
                            ["FLOAT_3", "position"],
                            ["FLOAT_3", "color"],
                            ["FLOAT", "intensity"],
                            ["FLOAT", "range"],
                            ["FLOAT", "constant"],
                            ["FLOAT", "linear"],
                            ["FLOAT", "quadratic"]
                        ],
                        val:pointLightArr[0]
                    },
                    category: "uniform"
                },
                {
                    name:"u_pointLights[1]",
                    type: Engine3D.DataType.STRUCT,
                    val: {
                        member: [
                            ["FLOAT_3", "position"],
                            ["FLOAT_3", "color"],
                            ["FLOAT", "intensity"],
                            ["FLOAT", "range"],
                            ["FLOAT", "constant"],
                            ["FLOAT", "linear"],
                            ["FLOAT", "quadratic"]
                        ],
                        val:pointLightArr[1]
                    },
                    category: "uniform"
                },
                {
                    name:"u_mvpMatrix",
                    type: Engine3D.DataType.FLOAT_MAT4,
                    val: mvpMatrix.values,
                    category: "uniform"
                }];
                o.draw(dataArr);


            o.onEndLoop();








            //draw sphere
            o = sphere;
            o.program.use();


            o.onStartLoop();


            o.update();



            mvpMatrix = camera.computeMvpMatrix(o.matrix);
            normalMatrix = Math3D.Matrix.create();

            normalMatrix.setInverseOf(o.matrix);
            normalMatrix.transpose();


            //var lightColor = [1.0, 1.0, 1.0];
            //
            //var lightDirection  = Math3D.Vector3.create(0.0, 0.0,0.15);
            //lightDirection.normalize();
            //
            //
            //
            //var specularStrength = 1.0;
            //
            //
            //var directionLight = Engine3D.Light.DirectionLight.create(
            //    lightDirection.values,
            //    lightColor,
            //    specularStrength
            //);






            dataArr = [{
                name: "a_position",
                buffer: o.buffers.vertexBuffer  ,
                category: "attribute"
            },
                {
                    name: "a_normal",
                    buffer: o.buffers.normalBuffer  ,
                    category: "attribute"
                },
                {
                    name: "a_texCoord",
                    buffer: o.buffers.texCoordBuffer  ,
                    category: "attribute"
                },
                //{
                //    name:"u_sampler",
                //    type:  Engine3D.DataType.TEXTURE_ARR,
                //    //val: 0,
                //    category: "uniform"
                //},
                {
                    name:"u_normalMatrix",
                    type: Engine3D.DataType.FLOAT_MAT4,
                    val: normalMatrix.values,
                    category: "uniform"
                },
                {
                    name:"u_mMatrix",
                    type: Engine3D.DataType.FLOAT_MAT4,
                    val: o.matrix.values,
                    category: "uniform"
                },
                {
                    name:"u_ambient",
                    type: Engine3D.DataType.FLOAT_3,
                    val: ambientLightColor,
                    category: "uniform"
                },
                {
                    name:"u_viewPos",
                    type: Engine3D.DataType.FLOAT_3,
                    val: viewPos,
                    category: "uniform"
                },

                //todo 数据结构待优化
                //{
                //    name:"u_directionLight",
                //    type: Engine3D.DataType.STRUCT,
                //    val: {
                //        member: [
                //            ["FLOAT_3", "direction"],
                //            ["FLOAT_3", "color"],
                //            ["FLOAT", "intensity"]
                //        ],
                //        val:directionLight
                //    },
                //    category: "uniform"
                //},
                {
                    name:"u_pointLights[0]",
                    type: Engine3D.DataType.STRUCT,
                    val: {
                        member: [
                            ["FLOAT_3", "position"],
                            ["FLOAT_3", "color"],
                            ["FLOAT", "intensity"],
                            ["FLOAT", "range"],
                            ["FLOAT", "constant"],
                            ["FLOAT", "linear"],
                            ["FLOAT", "quadratic"]
                        ],
                        val:pointLightArr[0]
                    },
                    category: "uniform"
                },
                {
                    name:"u_pointLights[1]",
                    type: Engine3D.DataType.STRUCT,
                    val: {
                        member: [
                            ["FLOAT_3", "position"],
                            ["FLOAT_3", "color"],
                            ["FLOAT", "intensity"],
                            ["FLOAT", "range"],
                            ["FLOAT", "constant"],
                            ["FLOAT", "linear"],
                            ["FLOAT", "quadratic"]
                        ],
                        val:pointLightArr[1]
                    },
                    category: "uniform"
                },
                {
                    name:"u_mvpMatrix",
                    type: Engine3D.DataType.FLOAT_MAT4,
                    val: mvpMatrix.values,
                    category: "uniform"
                }];


            o.draw(dataArr);

            o.onEndLoop();

        }

        function move(){
            if(keyState["a"]){
                camera.moveLeft();
            }
            else if(keyState["d"]){
                camera.moveRight();
            }
            else if(keyState["w"]){
                camera.moveFront();
            }
            else if(keyState["s"]){
                camera.moveBack();
            }
        }

        function zoom(){
            if(keyState["g"]){
                camera.zoomOut();
            }
            else if(keyState["h"]){
                camera.zoomIn();
            }
        }

        function createSkyBox() {
            var vertices = new Float32Array([
                1.0,  1.0,  1.0,
                -1.0,  1.0,  1.0,
                -1.0, -1.0,  1.0,
                1.0, -1.0,  1.0,
                1.0, -1.0, -1.0,
                1.0,  1.0, -1.0,
                -1.0,  1.0, -1.0,
                -1.0, -1.0, -1.0
            ]);

            // Indices of the vertices
            var indices = new Uint8Array([
                0, 1, 2,   0, 2, 3,    // front
                0, 3, 4,   0, 4, 5,    // right
                0, 5, 6,   0, 6, 1,    // up
                1, 6, 7,   1, 7, 2,    // left
                7, 4, 3,   7, 3, 2,    // down
                4, 7, 6,   4, 6, 5     // back
            ]);

            var texCoords = vertices;


            var o = Engine3D.Sprite.create("TRIANGLES");

            o.buffers = {
                vertexBuffer:Engine3D.ArrayBuffer.create(vertices, 3, gl.FLOAT),
                texCoordBuffer: Engine3D.ArrayBuffer.create(texCoords, 3, gl.FLOAT),
                indexBuffer: Engine3D.ElementBuffer.create(indices, gl.UNSIGNED_BYTE)
            };






            var i = 0,
                len = 1;
            var arr = [];

            for(i = 0;i < len; i++){
                arr.push({
                    material: createMaterial(i, createTextureSkyBox(i)),
                    ////todo optimize data structure
                    //todo type should be DataType instead of string
                    uniformData:{
                        //todo for no light map object,it should refactor Material,now just set diffuse to pass.
                        "u_sampler":["TEXTURE_CUBE", "diffuse"]
                    }
                    //indexCount: 6,
                    //indexOffset: i * 6
                });
            }

            o.textureArr = arr;



            o.init();

            return o;
        }



        function createRectangle() {
            var vertices = new Float32Array([
                0.3, 0.3, 0.3,
                -0.3, 0.3, 0.3,
                -0.3, -0.3, 0.3,
                0.3, -0.3, 0.3
            ]);

            // Indices of the vertices
            var indices = new Uint8Array([
                0, 1, 2,   0, 2, 3
            ]);

            var texCoords = new Float32Array([
                1.0, 1.0,
                0.0, 1.0,
                0.0, 0.0,
                1.0, 0.0
            ]);


            var o = Engine3D.Sprite.create("TRIANGLES");

            o.buffers = {
                vertexBuffer:Engine3D.ArrayBuffer.create(vertices, 3, gl.FLOAT),
                texCoordBuffer: Engine3D.ArrayBuffer.create(texCoords, 2, gl.FLOAT),
                indexBuffer: Engine3D.ElementBuffer.create(indices, gl.UNSIGNED_BYTE)
            };








            var i = 0,
                len = 1;
            var arr = [];

            for(i = 0;i < len; i++){
                arr.push({
                    material: createMaterial(i, createTexture(i)),
                    uniformData:{
                        //todo for no light map object,it should refactor Material,now just set diffuse to pass.
                        "u_sampler":["TEXTURE_2D", "diffuse"]
                    }
                });
            }

            o.textureArr = arr;



            o.init();

            return o;
        }



        /*!
         实现正方体每个面不同纹理的方法：
         1、将6个面的纹理压缩到一张图片上，通过uv map
         2、绘制6次，每次画一个面
         3、使用cube map

         此处使用第2个方法
         */
        function createCube(){
            var data = Engine3D.Cubic.Cube.create().getCubeData();
            var o = Engine3D.Sprite.create("TRIANGLES");

            o.buffers = {
                vertexBuffer:Engine3D.ArrayBuffer.create(data.vertices, 3, gl.FLOAT),
                texCoordBuffer: Engine3D.ArrayBuffer.create(data.texCoords, 2, gl.FLOAT),
                normalBuffer: Engine3D.ArrayBuffer.create(data.normals, 3, gl.FLOAT),
                indexBuffer: Engine3D.ElementBuffer.create(data.indices, gl.UNSIGNED_BYTE)
            };

            //todo 按2d引擎思路，重构出action和animation？
            //o.actionData = {
            //    "rotate": {
            //        axis: [0, 1, 0],
            //        speed:10
            //    }
            //};
            //
            //o.addActions(
            //    {"rotate":Engine3D.Action.Rotate.create(
            //        {axis: [0, 1, 0], speed:10}
            //    )
            //    }
            //);


            var i = 0;
            var arr = [];

            for(i = 0;i < 6; i++){
                arr.push({
                    material:createMaterial(i, createTexture(i)),
                    //uniformData:{
                    //    //todo for no light map object,it should refactor Material,now just set diffuse to pass.
                    //    //add light map?
                    //    "u_sampler":["TEXTURE_2D", "diffuse"]
                    //},
                    uniformData:{
                        "u_diffuseSampler":["INT", "diffuse"],
                        "u_specularSampler":["INT", "specular"],
                        "u_shininess":["FLOAT", "shininess"]
                    },
                    indexCount: 6,
                    indexOffset: i * 6
                });
            }

            o.textureArr = arr;


            //o.initData = function(){
            //    this.runRotateAction();
            //};

            o.init();

            return o;
        }

        function createSphere(){
            var data = Engine3D.Cubic.Sphere.create().getSphereDataByLatitudeLongtitude(
                0, 0, 0, 30, 30, 0.1
            );
            var o = Engine3D.Sprite.create("TRIANGLES");

            o.buffers = {
                vertexBuffer:Engine3D.ArrayBuffer.create(data.vertices, 3, gl.FLOAT),
                texCoordBuffer: Engine3D.ArrayBuffer.create(data.texCoords, 2, gl.FLOAT),
                normalBuffer: Engine3D.ArrayBuffer.create(data.normals, 3, gl.FLOAT),
                indexBuffer: Engine3D.ElementBuffer.create(data.indices, gl.UNSIGNED_SHORT)
            };



            var i = 0;
            var arr = [];
            var len = 1;

            for(i = 0;i < len; i++){
                arr.push({
                    material:createMaterial(i, createTexture(i)),
                    uniformData:{
                        "u_diffuseSampler":["INT", "diffuse"],
                        "u_specularSampler":["INT", "specular"],
                        "u_shininess":["FLOAT", "shininess"]
                    }
                });
            }

            o.textureArr = arr;


            o.initData = function(){
                this.runAction(this.getRotateAction());
                this.runAction(this.getTranslateAction());
            };

            o.init();

            return o;
        }
        function createMaterial(index, texture){
            var material = Engine3D.Material.create(
                index,
                index,
                64
            );

            material.texture = texture;

            return material;
        }

        function createTextureSkyBox(index){
            //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            var texture = Engine3D.TextureCubeMap.create({
                "TEXTURE_MIN_FILTER":"LINEAR"
            });
            if (!texture) {
                console.log('Failed to create the texture object');
                return null;
            }
            texture.bindToUnit(index);
            texture.createTextureArea([
                loader.getResource("1"),
                loader.getResource("2"),
                loader.getResource("3"),
                loader.getResource("4"),
                loader.getResource("5"),
                loader.getResource("6")
            ]);

            texture.unBind();

            return texture;
        }
        function createTexture(index){
            var texture = Engine3D.Texture2D.create({
                "TEXTURE_MIN_FILTER":"LINEAR"
            }, true);
            if (!texture) {
                console.log('Failed to create the texture object');
                return null;
            }
            texture.bindToUnit(index);
            texture.createTextureArea(
                loader.getResource(String(index + 1))
            );

            texture.unBind();

            return texture;
        }
    };



    loader.onload = onload;


    function setAllFalse(){
        var i = null;

        for(i in keyState){
            if(keyState.hasOwnProperty(i)){
                keyState[i] = false;
            }
        }
    }
    function bindCanvasEvent(canvas) {
        var dragging = false;         // Dragging or not
        var lastX = -1, lastY = -1;   // Last position of the mouse

        canvas.onmousedown = function(ev) {   // Mouse is pressed
            var x = ev.clientX, y = ev.clientY;
            // Start dragging if a moue is in <canvas>
            var rect = ev.target.getBoundingClientRect();
            if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
                lastX = x; lastY = y;
                dragging = true;
            }
        };

        canvas.onmouseup = function(ev) { dragging = false;  }; // Mouse is released

        canvas.onmousemove = function(ev) { // Mouse is moved
            var x = ev.clientX, y = ev.clientY;
            if (dragging) {
                var factor = 100/canvas.height; // The rotation ratio
                var dx = factor * (x - lastX);
                var dy = factor * (y - lastY);

                //此处为针对视图坐标系的角度变换！
                camera.rotateSpeedY = -dx;
                camera.rotateSpeedX = -dy;


                isRotate = true;
            }
            lastX = x;
            lastY = y;
        };

        //todo 使用引擎的key模块来重构

        $("body").on("keydown", function(event){
            var keyCode = {
                65: "a",
                87: "w",
                83: "s",
                68: "d",
                71: "g",
                72: "h"
            };

            setAllFalse();

            keyState[keyCode[event.keyCode]] = true;
        });
    }
});

