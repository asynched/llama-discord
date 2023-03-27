"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = require("node:path");
const module_alias_1 = require("module-alias");
require("dotenv/config");
(0, module_alias_1.addAlias)('@', (0, node_path_1.resolve)(__dirname));
require('@/main');
