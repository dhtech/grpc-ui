/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
(function(global, factory) { /* global define, require, module */

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobufjs/minimal"], factory);

    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/minimal"));

})(this, function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.ReflectionResponse = (function() {
    
        /**
         * Properties of a ReflectionResponse.
         * @exports IReflectionResponse
         * @interface IReflectionResponse
         * @property {IReflection|null} [reflection] ReflectionResponse reflection
         * @property {IError|null} [error] ReflectionResponse error
         */
    
        /**
         * Constructs a new ReflectionResponse.
         * @exports ReflectionResponse
         * @classdesc Represents a ReflectionResponse.
         * @implements IReflectionResponse
         * @constructor
         * @param {IReflectionResponse=} [properties] Properties to set
         */
        function ReflectionResponse(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * ReflectionResponse reflection.
         * @member {IReflection|null|undefined} reflection
         * @memberof ReflectionResponse
         * @instance
         */
        ReflectionResponse.prototype.reflection = null;
    
        /**
         * ReflectionResponse error.
         * @member {IError|null|undefined} error
         * @memberof ReflectionResponse
         * @instance
         */
        ReflectionResponse.prototype.error = null;
    
        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;
    
        /**
         * ReflectionResponse response.
         * @member {"reflection"|"error"|undefined} response
         * @memberof ReflectionResponse
         * @instance
         */
        Object.defineProperty(ReflectionResponse.prototype, "response", {
            get: $util.oneOfGetter($oneOfFields = ["reflection", "error"]),
            set: $util.oneOfSetter($oneOfFields)
        });
    
        /**
         * Creates a new ReflectionResponse instance using the specified properties.
         * @function create
         * @memberof ReflectionResponse
         * @static
         * @param {IReflectionResponse=} [properties] Properties to set
         * @returns {ReflectionResponse} ReflectionResponse instance
         */
        ReflectionResponse.create = function create(properties) {
            return new ReflectionResponse(properties);
        };
    
        /**
         * Encodes the specified ReflectionResponse message. Does not implicitly {@link ReflectionResponse.verify|verify} messages.
         * @function encode
         * @memberof ReflectionResponse
         * @static
         * @param {IReflectionResponse} message ReflectionResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReflectionResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.reflection != null && message.hasOwnProperty("reflection"))
                $root.Reflection.encode(message.reflection, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.error != null && message.hasOwnProperty("error"))
                $root.Error.encode(message.error, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };
    
        /**
         * Encodes the specified ReflectionResponse message, length delimited. Does not implicitly {@link ReflectionResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ReflectionResponse
         * @static
         * @param {IReflectionResponse} message ReflectionResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReflectionResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a ReflectionResponse message from the specified reader or buffer.
         * @function decode
         * @memberof ReflectionResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ReflectionResponse} ReflectionResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReflectionResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ReflectionResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.reflection = $root.Reflection.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.error = $root.Error.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a ReflectionResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ReflectionResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ReflectionResponse} ReflectionResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReflectionResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a ReflectionResponse message.
         * @function verify
         * @memberof ReflectionResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ReflectionResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            var properties = {};
            if (message.reflection != null && message.hasOwnProperty("reflection")) {
                properties.response = 1;
                {
                    var error = $root.Reflection.verify(message.reflection);
                    if (error)
                        return "reflection." + error;
                }
            }
            if (message.error != null && message.hasOwnProperty("error")) {
                if (properties.response === 1)
                    return "response: multiple values";
                properties.response = 1;
                {
                    var error = $root.Error.verify(message.error);
                    if (error)
                        return "error." + error;
                }
            }
            return null;
        };
    
        /**
         * Creates a ReflectionResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ReflectionResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ReflectionResponse} ReflectionResponse
         */
        ReflectionResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.ReflectionResponse)
                return object;
            var message = new $root.ReflectionResponse();
            if (object.reflection != null) {
                if (typeof object.reflection !== "object")
                    throw TypeError(".ReflectionResponse.reflection: object expected");
                message.reflection = $root.Reflection.fromObject(object.reflection);
            }
            if (object.error != null) {
                if (typeof object.error !== "object")
                    throw TypeError(".ReflectionResponse.error: object expected");
                message.error = $root.Error.fromObject(object.error);
            }
            return message;
        };
    
        /**
         * Creates a plain object from a ReflectionResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ReflectionResponse
         * @static
         * @param {ReflectionResponse} message ReflectionResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ReflectionResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (message.reflection != null && message.hasOwnProperty("reflection")) {
                object.reflection = $root.Reflection.toObject(message.reflection, options);
                if (options.oneofs)
                    object.response = "reflection";
            }
            if (message.error != null && message.hasOwnProperty("error")) {
                object.error = $root.Error.toObject(message.error, options);
                if (options.oneofs)
                    object.response = "error";
            }
            return object;
        };
    
        /**
         * Converts this ReflectionResponse to JSON.
         * @function toJSON
         * @memberof ReflectionResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ReflectionResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return ReflectionResponse;
    })();
    
    $root.Reflection = (function() {
    
        /**
         * Properties of a Reflection.
         * @exports IReflection
         * @interface IReflection
         * @property {Array.<string>|null} [service] Reflection service
         * @property {Array.<Uint8Array>|null} [fileDescriptor] Reflection fileDescriptor
         */
    
        /**
         * Constructs a new Reflection.
         * @exports Reflection
         * @classdesc Represents a Reflection.
         * @implements IReflection
         * @constructor
         * @param {IReflection=} [properties] Properties to set
         */
        function Reflection(properties) {
            this.service = [];
            this.fileDescriptor = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * Reflection service.
         * @member {Array.<string>} service
         * @memberof Reflection
         * @instance
         */
        Reflection.prototype.service = $util.emptyArray;
    
        /**
         * Reflection fileDescriptor.
         * @member {Array.<Uint8Array>} fileDescriptor
         * @memberof Reflection
         * @instance
         */
        Reflection.prototype.fileDescriptor = $util.emptyArray;
    
        /**
         * Creates a new Reflection instance using the specified properties.
         * @function create
         * @memberof Reflection
         * @static
         * @param {IReflection=} [properties] Properties to set
         * @returns {Reflection} Reflection instance
         */
        Reflection.create = function create(properties) {
            return new Reflection(properties);
        };
    
        /**
         * Encodes the specified Reflection message. Does not implicitly {@link Reflection.verify|verify} messages.
         * @function encode
         * @memberof Reflection
         * @static
         * @param {IReflection} message Reflection message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Reflection.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.service != null && message.service.length)
                for (var i = 0; i < message.service.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.service[i]);
            if (message.fileDescriptor != null && message.fileDescriptor.length)
                for (var i = 0; i < message.fileDescriptor.length; ++i)
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.fileDescriptor[i]);
            return writer;
        };
    
        /**
         * Encodes the specified Reflection message, length delimited. Does not implicitly {@link Reflection.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Reflection
         * @static
         * @param {IReflection} message Reflection message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Reflection.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a Reflection message from the specified reader or buffer.
         * @function decode
         * @memberof Reflection
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Reflection} Reflection
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Reflection.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Reflection();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.service && message.service.length))
                        message.service = [];
                    message.service.push(reader.string());
                    break;
                case 2:
                    if (!(message.fileDescriptor && message.fileDescriptor.length))
                        message.fileDescriptor = [];
                    message.fileDescriptor.push(reader.bytes());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a Reflection message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Reflection
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Reflection} Reflection
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Reflection.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a Reflection message.
         * @function verify
         * @memberof Reflection
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Reflection.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.service != null && message.hasOwnProperty("service")) {
                if (!Array.isArray(message.service))
                    return "service: array expected";
                for (var i = 0; i < message.service.length; ++i)
                    if (!$util.isString(message.service[i]))
                        return "service: string[] expected";
            }
            if (message.fileDescriptor != null && message.hasOwnProperty("fileDescriptor")) {
                if (!Array.isArray(message.fileDescriptor))
                    return "fileDescriptor: array expected";
                for (var i = 0; i < message.fileDescriptor.length; ++i)
                    if (!(message.fileDescriptor[i] && typeof message.fileDescriptor[i].length === "number" || $util.isString(message.fileDescriptor[i])))
                        return "fileDescriptor: buffer[] expected";
            }
            return null;
        };
    
        /**
         * Creates a Reflection message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Reflection
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Reflection} Reflection
         */
        Reflection.fromObject = function fromObject(object) {
            if (object instanceof $root.Reflection)
                return object;
            var message = new $root.Reflection();
            if (object.service) {
                if (!Array.isArray(object.service))
                    throw TypeError(".Reflection.service: array expected");
                message.service = [];
                for (var i = 0; i < object.service.length; ++i)
                    message.service[i] = String(object.service[i]);
            }
            if (object.fileDescriptor) {
                if (!Array.isArray(object.fileDescriptor))
                    throw TypeError(".Reflection.fileDescriptor: array expected");
                message.fileDescriptor = [];
                for (var i = 0; i < object.fileDescriptor.length; ++i)
                    if (typeof object.fileDescriptor[i] === "string")
                        $util.base64.decode(object.fileDescriptor[i], message.fileDescriptor[i] = $util.newBuffer($util.base64.length(object.fileDescriptor[i])), 0);
                    else if (object.fileDescriptor[i].length)
                        message.fileDescriptor[i] = object.fileDescriptor[i];
            }
            return message;
        };
    
        /**
         * Creates a plain object from a Reflection message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Reflection
         * @static
         * @param {Reflection} message Reflection
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Reflection.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.service = [];
                object.fileDescriptor = [];
            }
            if (message.service && message.service.length) {
                object.service = [];
                for (var j = 0; j < message.service.length; ++j)
                    object.service[j] = message.service[j];
            }
            if (message.fileDescriptor && message.fileDescriptor.length) {
                object.fileDescriptor = [];
                for (var j = 0; j < message.fileDescriptor.length; ++j)
                    object.fileDescriptor[j] = options.bytes === String ? $util.base64.encode(message.fileDescriptor[j], 0, message.fileDescriptor[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.fileDescriptor[j]) : message.fileDescriptor[j];
            }
            return object;
        };
    
        /**
         * Converts this Reflection to JSON.
         * @function toJSON
         * @memberof Reflection
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Reflection.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return Reflection;
    })();
    
    $root.Error = (function() {
    
        /**
         * Properties of an Error.
         * @exports IError
         * @interface IError
         * @property {string|null} [message] Error message
         */
    
        /**
         * Constructs a new Error.
         * @exports Error
         * @classdesc Represents an Error.
         * @implements IError
         * @constructor
         * @param {IError=} [properties] Properties to set
         */
        function Error(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * Error message.
         * @member {string} message
         * @memberof Error
         * @instance
         */
        Error.prototype.message = "";
    
        /**
         * Creates a new Error instance using the specified properties.
         * @function create
         * @memberof Error
         * @static
         * @param {IError=} [properties] Properties to set
         * @returns {Error} Error instance
         */
        Error.create = function create(properties) {
            return new Error(properties);
        };
    
        /**
         * Encodes the specified Error message. Does not implicitly {@link Error.verify|verify} messages.
         * @function encode
         * @memberof Error
         * @static
         * @param {IError} message Error message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Error.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.message != null && message.hasOwnProperty("message"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.message);
            return writer;
        };
    
        /**
         * Encodes the specified Error message, length delimited. Does not implicitly {@link Error.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Error
         * @static
         * @param {IError} message Error message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Error.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes an Error message from the specified reader or buffer.
         * @function decode
         * @memberof Error
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Error} Error
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Error.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Error();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.message = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes an Error message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Error
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Error} Error
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Error.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies an Error message.
         * @function verify
         * @memberof Error
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Error.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.message != null && message.hasOwnProperty("message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            return null;
        };
    
        /**
         * Creates an Error message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Error
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Error} Error
         */
        Error.fromObject = function fromObject(object) {
            if (object instanceof $root.Error)
                return object;
            var message = new $root.Error();
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };
    
        /**
         * Creates a plain object from an Error message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Error
         * @static
         * @param {Error} message Error
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Error.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.message = "";
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            return object;
        };
    
        /**
         * Converts this Error to JSON.
         * @function toJSON
         * @memberof Error
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Error.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return Error;
    })();
    
    $root.InvokeRequest = (function() {
    
        /**
         * Properties of an InvokeRequest.
         * @exports IInvokeRequest
         * @interface IInvokeRequest
         * @property {string|null} [method] InvokeRequest method
         * @property {Uint8Array|null} [payload] InvokeRequest payload
         */
    
        /**
         * Constructs a new InvokeRequest.
         * @exports InvokeRequest
         * @classdesc Represents an InvokeRequest.
         * @implements IInvokeRequest
         * @constructor
         * @param {IInvokeRequest=} [properties] Properties to set
         */
        function InvokeRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * InvokeRequest method.
         * @member {string} method
         * @memberof InvokeRequest
         * @instance
         */
        InvokeRequest.prototype.method = "";
    
        /**
         * InvokeRequest payload.
         * @member {Uint8Array} payload
         * @memberof InvokeRequest
         * @instance
         */
        InvokeRequest.prototype.payload = $util.newBuffer([]);
    
        /**
         * Creates a new InvokeRequest instance using the specified properties.
         * @function create
         * @memberof InvokeRequest
         * @static
         * @param {IInvokeRequest=} [properties] Properties to set
         * @returns {InvokeRequest} InvokeRequest instance
         */
        InvokeRequest.create = function create(properties) {
            return new InvokeRequest(properties);
        };
    
        /**
         * Encodes the specified InvokeRequest message. Does not implicitly {@link InvokeRequest.verify|verify} messages.
         * @function encode
         * @memberof InvokeRequest
         * @static
         * @param {IInvokeRequest} message InvokeRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InvokeRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.method != null && message.hasOwnProperty("method"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.method);
            if (message.payload != null && message.hasOwnProperty("payload"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.payload);
            return writer;
        };
    
        /**
         * Encodes the specified InvokeRequest message, length delimited. Does not implicitly {@link InvokeRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof InvokeRequest
         * @static
         * @param {IInvokeRequest} message InvokeRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InvokeRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes an InvokeRequest message from the specified reader or buffer.
         * @function decode
         * @memberof InvokeRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {InvokeRequest} InvokeRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InvokeRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.InvokeRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.method = reader.string();
                    break;
                case 2:
                    message.payload = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes an InvokeRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof InvokeRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {InvokeRequest} InvokeRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InvokeRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies an InvokeRequest message.
         * @function verify
         * @memberof InvokeRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        InvokeRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.method != null && message.hasOwnProperty("method"))
                if (!$util.isString(message.method))
                    return "method: string expected";
            if (message.payload != null && message.hasOwnProperty("payload"))
                if (!(message.payload && typeof message.payload.length === "number" || $util.isString(message.payload)))
                    return "payload: buffer expected";
            return null;
        };
    
        /**
         * Creates an InvokeRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof InvokeRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {InvokeRequest} InvokeRequest
         */
        InvokeRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.InvokeRequest)
                return object;
            var message = new $root.InvokeRequest();
            if (object.method != null)
                message.method = String(object.method);
            if (object.payload != null)
                if (typeof object.payload === "string")
                    $util.base64.decode(object.payload, message.payload = $util.newBuffer($util.base64.length(object.payload)), 0);
                else if (object.payload.length)
                    message.payload = object.payload;
            return message;
        };
    
        /**
         * Creates a plain object from an InvokeRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof InvokeRequest
         * @static
         * @param {InvokeRequest} message InvokeRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        InvokeRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.method = "";
                object.payload = options.bytes === String ? "" : [];
            }
            if (message.method != null && message.hasOwnProperty("method"))
                object.method = message.method;
            if (message.payload != null && message.hasOwnProperty("payload"))
                object.payload = options.bytes === String ? $util.base64.encode(message.payload, 0, message.payload.length) : options.bytes === Array ? Array.prototype.slice.call(message.payload) : message.payload;
            return object;
        };
    
        /**
         * Converts this InvokeRequest to JSON.
         * @function toJSON
         * @memberof InvokeRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        InvokeRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return InvokeRequest;
    })();
    
    $root.InvokeResponse = (function() {
    
        /**
         * Properties of an InvokeResponse.
         * @exports IInvokeResponse
         * @interface IInvokeResponse
         * @property {Uint8Array|null} [payload] InvokeResponse payload
         * @property {IError|null} [error] InvokeResponse error
         */
    
        /**
         * Constructs a new InvokeResponse.
         * @exports InvokeResponse
         * @classdesc Represents an InvokeResponse.
         * @implements IInvokeResponse
         * @constructor
         * @param {IInvokeResponse=} [properties] Properties to set
         */
        function InvokeResponse(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * InvokeResponse payload.
         * @member {Uint8Array} payload
         * @memberof InvokeResponse
         * @instance
         */
        InvokeResponse.prototype.payload = $util.newBuffer([]);
    
        /**
         * InvokeResponse error.
         * @member {IError|null|undefined} error
         * @memberof InvokeResponse
         * @instance
         */
        InvokeResponse.prototype.error = null;
    
        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;
    
        /**
         * InvokeResponse response.
         * @member {"payload"|"error"|undefined} response
         * @memberof InvokeResponse
         * @instance
         */
        Object.defineProperty(InvokeResponse.prototype, "response", {
            get: $util.oneOfGetter($oneOfFields = ["payload", "error"]),
            set: $util.oneOfSetter($oneOfFields)
        });
    
        /**
         * Creates a new InvokeResponse instance using the specified properties.
         * @function create
         * @memberof InvokeResponse
         * @static
         * @param {IInvokeResponse=} [properties] Properties to set
         * @returns {InvokeResponse} InvokeResponse instance
         */
        InvokeResponse.create = function create(properties) {
            return new InvokeResponse(properties);
        };
    
        /**
         * Encodes the specified InvokeResponse message. Does not implicitly {@link InvokeResponse.verify|verify} messages.
         * @function encode
         * @memberof InvokeResponse
         * @static
         * @param {IInvokeResponse} message InvokeResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InvokeResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.payload != null && message.hasOwnProperty("payload"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.payload);
            if (message.error != null && message.hasOwnProperty("error"))
                $root.Error.encode(message.error, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };
    
        /**
         * Encodes the specified InvokeResponse message, length delimited. Does not implicitly {@link InvokeResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof InvokeResponse
         * @static
         * @param {IInvokeResponse} message InvokeResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InvokeResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes an InvokeResponse message from the specified reader or buffer.
         * @function decode
         * @memberof InvokeResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {InvokeResponse} InvokeResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InvokeResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.InvokeResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.payload = reader.bytes();
                    break;
                case 2:
                    message.error = $root.Error.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes an InvokeResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof InvokeResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {InvokeResponse} InvokeResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InvokeResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies an InvokeResponse message.
         * @function verify
         * @memberof InvokeResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        InvokeResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            var properties = {};
            if (message.payload != null && message.hasOwnProperty("payload")) {
                properties.response = 1;
                if (!(message.payload && typeof message.payload.length === "number" || $util.isString(message.payload)))
                    return "payload: buffer expected";
            }
            if (message.error != null && message.hasOwnProperty("error")) {
                if (properties.response === 1)
                    return "response: multiple values";
                properties.response = 1;
                {
                    var error = $root.Error.verify(message.error);
                    if (error)
                        return "error." + error;
                }
            }
            return null;
        };
    
        /**
         * Creates an InvokeResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof InvokeResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {InvokeResponse} InvokeResponse
         */
        InvokeResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.InvokeResponse)
                return object;
            var message = new $root.InvokeResponse();
            if (object.payload != null)
                if (typeof object.payload === "string")
                    $util.base64.decode(object.payload, message.payload = $util.newBuffer($util.base64.length(object.payload)), 0);
                else if (object.payload.length)
                    message.payload = object.payload;
            if (object.error != null) {
                if (typeof object.error !== "object")
                    throw TypeError(".InvokeResponse.error: object expected");
                message.error = $root.Error.fromObject(object.error);
            }
            return message;
        };
    
        /**
         * Creates a plain object from an InvokeResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof InvokeResponse
         * @static
         * @param {InvokeResponse} message InvokeResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        InvokeResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (message.payload != null && message.hasOwnProperty("payload")) {
                object.payload = options.bytes === String ? $util.base64.encode(message.payload, 0, message.payload.length) : options.bytes === Array ? Array.prototype.slice.call(message.payload) : message.payload;
                if (options.oneofs)
                    object.response = "payload";
            }
            if (message.error != null && message.hasOwnProperty("error")) {
                object.error = $root.Error.toObject(message.error, options);
                if (options.oneofs)
                    object.response = "error";
            }
            return object;
        };
    
        /**
         * Converts this InvokeResponse to JSON.
         * @function toJSON
         * @memberof InvokeResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        InvokeResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return InvokeResponse;
    })();

    return $root;
});
