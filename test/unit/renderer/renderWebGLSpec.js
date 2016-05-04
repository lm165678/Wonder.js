describe("renderWebGL", function() {
    var sandbox = null;
    var renderer = null;
    var deviceManager = null;

    function getGL(){
        return wd.DeviceManager.getInstance().gl;
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        renderer = wd.WebGLRenderer.create();
        deviceManager = wd.DeviceManager.getInstance();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        testTool.closeContractCheck(sandbox);
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("init", function(){
        it("set clearColorOptions to color:#000000, alpha:1", function(){
            renderer.init();

            expect(renderer._clearOptions.color).toEqual(
                wd.Color.create("#000000")
            );
        });
        it("init depthTest, blend, colorWrite, side, depthWrite", function(){
            var gl = getGL();

            renderer.init();

            expect(deviceManager.depthTest).toBeTruthy();
            expect(deviceManager.blend).toBeFalsy();
            expect(gl.blendFunc).not.toCalled();
            expect(gl.blendEquation).not.toCalled();
            expect(gl.colorMask).toCalledOnce();
            expect(deviceManager.side).toEqual(wd.ESide.FRONT);
            expect(gl.cullFace).toCalledWith(gl.BACK);
            expect(deviceManager.depthWrite).toBeTruthy();
        });
    });

    describe("clear", function(){
        it("clear by clearOptions", function(){
            sandbox.stub(deviceManager, "clear");

            renderer.clear();

            expect(deviceManager.clear).toCalledWith(renderer._clearOptions);
        });
    });

    describe("render", function(){
        var gl, program;

        function addCommand(commandClass){
            var quadCmd;

            if(commandClass){
             quadCmd = new commandClass();
            }
            else{
                quadCmd = new wd.RenderCommand();
            }

            quadCmd.execute = sandbox.stub();

            renderer.addCommand(quadCmd);

            return {
                quadCmd:quadCmd
            }
        }

        beforeEach(function(){
            gl = {
                TRIANGLES:"TRIANGLES",
                ARRAY_BUFFER:"ARRAY_BUFFER",
                ELEMENT_ARRAY_BUFFER: "ELEMENT_ARRAY_BUFFER",
                UNSIGNED_SHORT: "UNSIGNED_SHORT",

                bindBuffer:sandbox.stub(),
                bufferData:sandbox.stub(),
                drawElements:sandbox.stub(),
                drawArrays:sandbox.stub(),
                createBuffer:sandbox.stub().returns({})
            };
            cloneTool.extend(wd.DeviceManager.getInstance().gl, gl);
            gl = wd.DeviceManager.getInstance().gl;

            program = {
                setAttributeData:sandbox.stub(),
                setUniformData:sandbox.stub(),
                initWithShader:sandbox.stub(),
                isChangeShader:sandbox.stub(),
                use:sandbox.stub()
            };
        });

        describe("1. render opaque commands", function(){
            beforeEach(function(){
                testTool.openContractCheck(sandbox);
            });

            describe("sort command by renderGroup, renderPriority, shader, texture, buffer", function(){
                var quad1,quad2,quad3;

                function prepare(){
                    var result1 = addCommand(wd.QuadCommand);
                    var result2 = addCommand(wd.QuadCommand);
                    var result3 = addCommand(wd.QuadCommand);

                    quad1 = result1.quadCmd;
                    quad2 = result2.quadCmd;
                    quad3 = result3.quadCmd;


                    quad1.blend = false;
                    quad2.blend = false;
                    quad3.blend = false;
                }

                function setSortData(quad1Data, quad2Data, quad3Data){
                    var target1 = {
                        renderGroup:quad1Data.renderGroup || 0,
                        renderPriority:quad1Data.renderPriority || 0
                    }
                    var target2 = {
                        renderGroup:quad2Data.renderGroup || 0,
                        renderPriority:quad2Data.renderPriority || 0
                    }
                    var target3 = {
                        renderGroup:quad3Data.renderGroup || 0,
                        renderPriority:quad3Data.renderPriority || 0
                    }

                    quad1.target = target1;
                    quad2.target = target2;
                    quad3.target = target3;

                    var shader1 = {
                        program:{
                            uid:quad1Data.programId || 1
                        }
                    }
                    var shader2 = {
                        program:{
                            uid:quad2Data.programId || 1
                        }
                    }
                    var shader3 = {
                        program:{
                            uid:quad3Data.programId || 1
                        }
                    }

                    quad1.material = {
                        shader:shader1
                    }
                    quad2.material = {
                        shader:shader2
                    }
                    quad3.material = {
                        shader:shader3
                    }
                }

                beforeEach(function(){
                    prepare();
                });

                it("test sort by group, priority(asce order)", function(){
                    setSortData({
                            renderGroup: 31,
                            renderPriority: 31
                        },
                        {
                            renderGroup:0,
                            renderPriority:31
                        },
                        {
                            renderGroup:0,
                            renderPriority:30
                        });

                    renderer.render();

                    orderTool.judgeInvokeOrder([quad3, quad2, quad1], "execute");
                });
                it("test sort by priority, shader", function(){
                    setSortData({
                            renderPriority: 31,
                            programId: 1023
                        },
                        {
                            renderPriority:30,

                            programId: 1
                        },
                        {
                            renderPriority:31,

                            programId: 1025
                        });

                    renderer.render();

                    orderTool.judgeInvokeOrder([quad2, quad3, quad1], "execute");
                });
                it("test sort by shader, texture", function(){
                    //todo
                });
                it("test sort by texture, buffer", function(){
                    //todo
                });
            });
        });

        describe("2. render procedural commands", function(){
            beforeEach(function(){

            });

            it("", function(){

            });
        });

        describe("3. render transparent commands", function(){
            beforeEach(function(){

            });

            it("", function(){

            });
        });

        //it("fist, render opaque commands;then lock depth buffer and render sorted transparent commands; then unlock depth buffer", function(){
        //    var result1 = addCommand();
        //    var result2 = addCommand();
        //    var result3 = addCommand();
        //    var result4 = addCommand();
        //    var quad1 = result1.quadCmd,
        //        quad2 = result2.quadCmd,
        //        quad3 = result3.quadCmd,
        //        quad4 = result4.quadCmd;
        //
        //    quad1.blend = true;
        //    quad2.blend = true;
        //    quad3.blend = false;
        //    quad4.blend = false;
        //
        //    sandbox.stub(wd.Director.getInstance().scene, "currentCamera", testTool.createCamera(wd.Vector3.create(0, 0, 10)));
        //
        //    var depthWriteArr = [];
        //    testTool.stubGetterSetter(sinon, wd.DeviceManager.prototype, "depthWrite", null, function(val){
        //        depthWriteArr.push(val);
        //    });
        //
        //    quad1.z = 8;
        //    quad2.z = 7;
        //    quad3.z = 2;
        //    quad4.z = -1;
        //
        //    renderer.render();
        //
        //    expect(quad3.execute).toCalledBefore(quad4.execute);
        //    expect(quad4.execute).toCalledBefore(quad2.execute);
        //    expect(quad2.execute).toCalledBefore(quad1.execute);
        //    expect(depthWriteArr).toEqual([
        //        false, true
        //    ]);
        //});
        //
        //it("execute renderCommand", function(){
        //    var result1 = addCommand();
        //    var result2 = addCommand();
        //    var quad1 = result1.quadCmd,
        //        quad2 = result2.quadCmd;
        //
        //    renderer.render();
        //
        //    expect(quad1.execute).toCalledOnce();
        //    expect(quad2.execute).toCalledOnce();
        //    expect(quad1.execute).toCalledBefore(quad2.execute);
        //});

        describe("if skyboxCommand exist, execute skyboxCommand", function(){
            it("set depthFunc to be LEQUAL, then set skyboxCommand's state, then execute skyboxCommand, then restore depthFunc to be LESS", function(){
                var depthFuncValArr = [];
                var stub = sandbox.stub();

                testTool.stubGetterSetter(sinon, wd.DeviceManager.prototype, "depthFunc", null, function(val){
                        depthFuncValArr.push(val);
                    });
                var cmd = {
                    dispose:sandbox.stub(),
                    execute: sandbox.stub()
                };
                renderer.skyboxCommand = cmd;

                renderer.render();

                expect(depthFuncValArr).toEqual([
                    "LEQUAL", "LESS"
                ]);
                expect(cmd.webglState).toEqual(renderer.webglState);
                expect(cmd.execute).toCalledOnce();
            });
        });

        describe("clear command", function(){
            it("dispose command", function () {
                var result = addCommand();
                sandbox.stub(result.quadCmd, "dispose");

                renderer.render();

                expect(result.quadCmd.dispose).toCalledOnce();
            });
            it("clear command queue", function () {
                var result = addCommand();

                renderer.render();

                expect(renderer._commandQueue.getCount()).toEqual(0);
            });
            it("dispose and clear skybox command", function () {
                var skyboxCommand = {
                    execute:sandbox.stub(),
                    dispose:sandbox.stub()
                }
                renderer.skyboxCommand = skyboxCommand;

                renderer.render();

                expect(skyboxCommand.dispose).toCalledOnce();
                expect(renderer.skyboxCommand).toBeNull();
            });
        });
    });

    describe("hasCommand", function(){
        beforeEach(function(){

        });

        it("if has skyboxCommand, return true", function(){
            renderer.skyboxCommand = wd.SingleDrawCommand.create();

            expect(renderer.hasCommand()).toBeTruthy();
        });
        it("if has QuadCommand, return true", function(){
            renderer.skyboxCommand = null;
            renderer.addCommand(new wd.QuadCommand());

            expect(renderer.hasCommand()).toBeTruthy();
        });
        it("else, return false", function(){
            expect(renderer.hasCommand()).toBeFalsy();
        });
    });
});
