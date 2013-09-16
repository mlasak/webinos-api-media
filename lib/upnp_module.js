/*******************************************************************************
 *    Code contributed to the webinos project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Copyright 2013 Istituto Superiore Mario Boella (ISMB)
 * Copyright 2013 Fraunhofer FOKUS
 ******************************************************************************/

var RPCWebinosService = require('webinos-jsonrpc2').RPCWebinosService;

var _rpcHandler;

var UpnpModule = function(rpcHandler, params){
    // inherit from RPCWebinosService
    this.base = RPCWebinosService;
    this.rpcHandler = rpcHandler;
    this.base({
        api: 'http://webinos.org/api/media',
        displayName: 'MediaPlay - UPNP',
        description: 'Webinos Media-Play API, UPNP implementation, Media Renderer'
    });
    
}

UpnpModule.prototype = new RPCWebinosService;

var listeners = [];


UpnpModule.setRpcHandler = function(rpcHandler)
{
    _rpcHandler = rpcHandler;
}

UpnpModule.prototype.isPlaying = function(params, successCB, errorCB)
{
//tbd
}

UpnpModule.prototype.startPlay = function(path, successCB, errorCB) 
{
///tbd
}

function command(key, successCB, errorCB)
{    
    "use strict";
///tbd
} 

UpnpModule.prototype.registerListeners = function(callbacks, successCB, errorCB, objectRef)
{        
    var currentLength = listeners.length;
    listeners.push(objectRef) > currentLength ? successCB("Media-play API registerListeners: " +  objectRef.from) : errorCB("Media-play API failed registerListeners");     
    console.log("Media-play API registerListeners: " +  objectRef.from);
}

UpnpModule.prototype.unregisterListenersOnLeave = function(params, successCB, errorCB, objectRef){    
    //indexOf does not work for complex objects
    for(var i=0;i<listeners.length;i++)
    {        
        if(listeners[i].from === objectRef.from)
        {
            listeners.splice(i, 1);            
            console.log("Media-play API unregisterListener: " + objectRef.from);
            successCB("Media-play: listener " + objectRef.from + " removed");
            return;
        }
    }    
    console.error("Media-play: listener " + objectRef.from + " not found");
    errorCB("Media-play: listener " + objectRef.from + "not found");
}

UpnpModule.prototype.unregisterListenersOnExit = function(params, successCB, errorCB, objectRef)
{       
    //indexOf does not work for complex objects
    for(var i=0;i<listeners.length;i++)
    {        
        if(listeners[i].from === objectRef.from)
        {
            listeners.splice(i, 1);            
            console.log("Media-play API unregisterListener: " + objectRef.from);
            return;
        }
    }    
    console.error("Media-play: listener " + objectRef.from + " not found");
}

function callListeners(type, payload)
{    
    var event = {};
    event.type = type;
    event.payload = (payload === undefined ? playerInstance.currentMedia : payload);
    
    console.log(event.type, event.payload);    
    
    if(typeof event.type !== "string")
        return;
    
    for(var i=0; i<listeners.length; i++)
    {
        var rpc = _rpcHandler.createRPC(listeners[i], event.type,  event);
        _rpcHandler.executeRPC(rpc);        
    }
}

UpnpModule.prototype.setVolume = function(volume, successCB, errorCB)
{            
///tbd
}


UpnpModule.prototype.stepback = function (params, successCB, errorCB)
{
    "use strict";
    command('seek -3', successCB, errorCB);
}

UpnpModule.prototype.bigStepback = function (params, successCB, errorCB)
{
    "use strict";
    command('seek -20', successCB, errorCB);
}    

UpnpModule.prototype.stepforward = function (params, successCB, errorCB)
{
    "use strict";
    command('seek 3', successCB, errorCB);
}

UpnpModule.prototype.bigStepforward = function (params, successCB, errorCB)
{
    "use strict";
    var KEYS_UP="$'\e'[A";
    command('seek 20', successCB, errorCB);
}

UpnpModule.prototype.playPause = function (params, successCB, errorCB)
{
    "use strict";
    command('pause', successCB, errorCB);
}

UpnpModule.prototype.stop = function (params, successCB, errorCB)
{
    "use strict";
    command('q', successCB, errorCB);
}

UpnpModule.prototype.volumeUP = function (params, successCB, errorCB)
{
    "use strict";
    command('volume 2', successCB, errorCB);
}

UpnpModule.prototype.volumeDOWN = function (params, successCB, errorCB)
{
    "use strict";
    command('volume -2', successCB, errorCB);
}

UpnpModule.prototype.increasePlaybackSpeed = function (params, successCB, errorCB)
{
    "use strict";
    command('speed_incr 1', successCB, errorCB);
}

UpnpModule.prototype.decreasePlaybackSpeed = function (params, successCB, errorCB)
{
    "use strict";
    command('speed_incr -1', successCB, errorCB);
}

UpnpModule.prototype.showInfo = function (params, successCB, errorCB)
{
    "use strict";    
    command('osd', successCB, errorCB);
}

UpnpModule.prototype.toggleSubtitle = function (params, successCB, errorCB)
{
    "use strict";
    command('sub_visibility', successCB, errorCB);
}

module.exports = UpnpModule;