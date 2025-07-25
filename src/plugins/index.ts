import {payloadCloudPlugin} from "@payloadcms/payload-cloud";
import type {Plugin} from "payload";
import {seo} from "./seo";
import {formBuilder} from "./form-builder";

export const plugins:Plugin[] = [
    seo,
    formBuilder,
    payloadCloudPlugin(),
    // storage-adapter-placeholder
]