# Catcher

A catcher game web app where the user controls a boat with the mouse and catches falling items. Based on the type of the item, the score is calculated. When the game ends, players can enter their names and submit their scores to the Leaderboard.

The Leaderboard displays the top 100 players with the highest scores in decreasing order.

## Deployment

### https://catcher.amansingh.dev

## About the project

This game is built on a microservice architecture with two microservices: `client` and `leaderboard`, managed by Docker and Kubernetes. The development workflow is overseen by Skaffold (https://skaffold.dev), which handles the processes of building, pushing, and deploying our application.

1. Multiple microservices can be added, and different teams can work on the project independently.
2. Asynchronous communication using an event bus like JetStream or Kafka can be easily configured.
3. GitHub workflows are in place for CI/CD. These workflows include automated tests upon the creation of a pull request and automated deployment when code is pushed to the `main` branch.

The `client` is a React application created using `"create-react-app"`. It utilizes Redux to manage the global state.

The `leaderboard` is an Express application that fetches and stores player data from a MongoDB database.

## Setup Instructions

#### Development Tools

The following development tools must be installed (in the same order) on your machine before you begin editing the code.

1. Docker Desktop. (https://www.docker.com/products/docker-desktop)
2. Enable Kubernetes from Settings in Docker Desktop. Before proceeding, make sure that docker and kubernetes are running and configured correctly.
3. `ingress-nginx` for Docker Desktop. (https://kubernetes.github.io/ingress-nginx/deploy/#docker-desktop). I recommend using `kubectl` to install `ingress-nginx` with the following command.<pre>kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/aws/deploy.yaml</pre>
4. Skaffold (https://skaffold.dev)
5. Edit your `hosts` file and add `"127.0.0.1 catcher.amansingh.dev"` at the end of the file. Editing this file require admin privileges. `hosts` file can be found at:  
   &emsp;&emsp; Windows - `C:\Windows\System32\drivers\etc`  
   &emsp;&emsp; Mac & Linux - `/etc/hosts`

#### Steps to run the game locally

1. Extract `catcher.zip` or clone the repository.
2. Pull the required images from docker hub using the following command or build the images locally.<pre>docker pull amansinghs/catcher-client && docker pull amansinghs/catcher-leaderboard</pre>
3. Run the following command from the project root directory.<pre>skaffold dev</pre>
4. Visit `catcher.amansingh.dev` from your web browser.
5. Your web browser will show you an HSTS error because of self-signed SSL certificate from Kubernetes. Type `"thisisunsafe"` anywhere in the browser window to bypass this screen. Note that this is only for development environment. Correct SSL certificate is already in place for production environment.

Skaffold will automatically create the required `Deployments` and `Services`. If you edit any file, it will re-deploy the latest changes. See `skaffold.yaml` for details.

Note: There is a known bug with Skaffold where the deployments fail to stabilize sometimes. (https://github.com/GoogleContainerTools/skaffold/issues/8972). Just add `"--tolerate-failures-until-deadline"` flag with `"skaffold dev"` command.

<pre>skaffold dev --tolerate-failures-until-deadline</pre>

## APIs Endpoints

#### Leader Board API

<details>
 <summary><code>GET</code> <code><b>/api/leaderboard</b></code> <code>(Fetches Top 100 players sorted by score in decreasing order)</code></summary>

##### Parameters

> | name | type | data type | description |
> | ---- | ---- | --------- | ----------- |
> | N/A  | N/A  | N/A       | N/A         |

##### Responses

> | http code | content-type               | response                                        |
> | --------- | -------------------------- | ----------------------------------------------- |
> | `200`     | `application/json        ` | `[{id: '1', name: 'Player Name', score: 100}]`  |
> | `500`     | `application/json`         | `{errors: [{message: 'Something went wrong'}]}` |

</details>

<details>
 <summary><code>POST</code> <code><b>/api/leaderboard</b></code> <code>(Saves player name and score)</code></summary>

##### Parameters

> | name  | type     | data type | description        |
> | ----- | -------- | --------- | ------------------ |
> | name  | required | string    | name of the player |
> | score | required | number    | player's score     |

##### Responses

> | http code | content-type               | response                                                                                                      |
> | --------- | -------------------------- | ------------------------------------------------------------------------------------------------------------- |
> | `201`     | `application/json        ` | `{id: '1', name: 'Player Name', score: 100}`                                                                  |
> | `400`     | `application/json`         | `{errors: [{message: 'Player name is required', field: 'name'}, {message: 'Invalid score', field: 'score'}]}` |
> | `500`     | `application/json`         | `{errors: [{message: 'Something went wrong'}]}`                                                               |

</details>

## MongoDB Schemas

#### Player

| name    | type       |
| ------- | ---------- |
| `id`    | `ObjectId` |
| `name`  | `string`   |
| `score` | `number`   |

## Knows Issues

1. Collision detection is not perfect. Sometimes if the mouse is placed in a certain way, game fails to register the `catch` event.

## Suggested Improvements

1. Add Levels with increasing difficulty. For example, item fall speed will increase every four items caught with a positive score.
2. Currently, the game requires a mouse to play. If a user is on a mobile device, move the the boat using tilt events.
3. Create a separate npm module `common` to store common code such as Error classes, middlewares, events, etc.
