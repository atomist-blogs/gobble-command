/*
 * Copyright © 2017 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
    CommandHandler,
    Parameter,
    Tags,
} from "@atomist/automation-client/decorators";
import {
    failure,
    HandleCommand,
    HandlerContext,
    HandlerResult,
    Success,
} from "@atomist/automation-client/Handlers";
import {
    Attachment,
    SlackMessage,
} from "@atomist/slack-messages/SlackMessages";
import axios, {
    AxiosResponse,
} from "axios";

const apiSearchUrl =
    `https://api.giphy.com/v1/gifs/random?limit=1&api_key=${process.env.GIPHY_API_KEY}&tag=turkey`;

@CommandHandler("Gobble Gobble", "gobble")
@Tags("gobble-gobble")
export class Gobble implements HandleCommand {

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        return axios.get(apiSearchUrl)
            .then(res => this.handleResult(res))
            .then(msg => ctx.messageClient.respond(msg))
            .then(() => Success, failure);
    }

    private handleResult(result: AxiosResponse): SlackMessage {
        const data = result.data.data;
        const msg: SlackMessage = {};
        msg.attachments = [{
                fallback: "/gif turkey",
                author_name: "/gif turkey",
                author_link: data.url,
                image_url: data.fixed_height_small_url,
            }];

        return msg;
    }
}
