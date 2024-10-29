# Project Structure

The project is structured like common `vue.js 3` projects.

| Directory/File   | Description                                                                |
| ---------------- | -------------------------------------------------------------------------- |
| package.json     | all information about the project, which libraries are required etc.       |
| /docs/           | directory containing documentation                                         |
| /node_modules/   | directory with all files of library dependencies.                          |
| /public/         | directory for static data like images                                      |
| /src/            | directory of source code of vue app                                        |
| /src/views/      | views are simmilar to html pages                                           |
| /src/components/ | parts to be used to compose views                                          |
| /src/router/     | definition on which url which view should be shown                         |
| /src/service/    | services are the "connection" to the database to get data                  |
| /src/stores/     | special feature (Pinia) to acces data within vue from different components |
| /src/assets/     | Assets like CSS styling for the app                                        |
