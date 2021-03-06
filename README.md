# @atomist/gobble-command

It's turkey time. Gobble gobble.

This repository contains the Gobble search example, which is a command that queries GIPHY for a turkey-themed GIF and shows it in the Slack channel you invoke the bot command from. This command uses the Atomist automation-client to run locally on your system, connected to an Atomist bot registered in your Slack team.

## Prerequisites

### Enroll the Atomist bot in your Slack team

<p align="center">
  <img alt="Add to Slack" height="50" width="174" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" />
</p>

### Node.js

You will need to have [Node.js][node] installed.  To verify that the
right versions are installed, please run:

```
$ node -v
v8.4.0
$ npm -v
5.4.1
```

[node]: https://nodejs.org/ (Node.js)

### Cloning the repository and installing dependencies

To get started run the following commands to clone the project,
install its dependencies, and build the project:

```
$ git clone git@github.com:atomist-blogs/gobble-command.git
$ cd gobble-command
$ npm install
$ npm run build
```

### Configuring your environment

If this is the first time you will be running an Atomist API client
locally, you should first configure your system using the
`atomist config` script:

```
$ `npm bin`/atomist config
```

The script does two things: records what Slack team you want your
automations running in and creates
a [GitHub personal access token][token] with "read:org" scope.

You must run the automations in a Slack team of which you are a
member.  You can get your Slack team ID by typing `team` in a DM to
the Atomist Bot.  If you do not supply the Slack team ID on the
command line, the script will prompt you to enter it.

The `atomist config` script will prompt you for your GitHub
credentials.  It needs them to create the GitHub personal access
token.  Atomist does not store your credentials and only writes the
token to your local machine.

The Atomist API client sends GitHub personal access token when
connecting to the Atomist API.  The Atomist API will use the token to
confirm you are who you say you are and are in a GitHub org connected
to the Slack team in which you are running the automations.

[token]: https://github.com/settings/tokens (GitHub Personal Access Tokens)

### GIPHY setup

This command calls the GIPHY API, which requires you to have an API token.
To get an API key, go to the [GIPHY developer site](https://developers.giphy.com/), sign up, and register
a new app to get an API key that looks like this.

![giphy-key]()

<p align="center">
  <img alt="Giphy" width="300" src="https://user-images.githubusercontent.com/774714/33225901-874e3fdc-d135-11e7-97d0-b997f44ffc14.png"/>
</p>

Set the GIPHY_API_KEY environment variable
```
$ export GIPHY_API_KEY=[your_api_key]
```

## Starting up the automation-client

To start the client, run the following command:

```
$ npm start
```

## Invoking a command handler from Slack

This project contains the code to create and respond to a simple
`gobble` bot command.  The code that defines the bot command and
implements responding to the command, i.e., the _command handler_, can
be found in [`Gobble.ts`][gobble].  Once you have your local
automation client running (the previous step in this guide), you can
invoke the command handler by sending the Atomist bot the command in
any channel of your Slack team:

```
@atomist gobble
```

Once you've submitted the command in Slack, you'll see the incoming
and outgoing messages show up in the logs of your locally running
automation-client.  Ultimately, you should see the response from the
bot in Slack.

[gobble]: https://github.com/atomist-blogs/gobble-command/blob/master/src/handlers/commands/Gobble.ts (Command Handler)

Feel free to modify the code in the `Gobble` command handler,
restart your local automation client, and see what happens!

## Support

General support questions should be discussed in the `#support`
channel in our community Slack team
at [atomist-community.slack.com][slack].

If you find a problem, please create an [issue][].

[issue]: https://github.com/atomist/gobble-command/issues

## Development

You will need to install [node][] to build and test this project.

### Build and Run

Command | Reason
------- | ------
`npm install` | to install all the required packages
`npm start` | to start the Atomist automation client
`npm run lint` | to run tslint against the TypeScript
`npm run compile` | to compile all TypeScript into JavaScript
`npm run clean` | remove stray compiled JavaScript files and build directory

### Release

To create a new release of the project, simply push a tag of the form
`M.N.P` where `M`, `N`, and `P` are integers that form the next
appropriate [semantic version][semver] for release.  The version in
the package.json must match the tag.  For example:

[semver]: http://semver.org

```
$ git tag -a 1.2.3
$ git push --tags
```

The Travis CI build (see badge at the top of this page) will publish
the NPM module and automatically create a GitHub release using the tag
name for the release and the comment provided on the annotated tag as
the contents of the release notes.

---

Created by [Atomist][atomist].
Need Help?  [Join our Slack team][slack].

[atomist]: https://www.atomist.com/
[slack]: https://join.atomist.com
