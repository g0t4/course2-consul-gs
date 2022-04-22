## notes

Benefits of using `"one-off"` containers via `docker compose run`:

- **Reduce CLI arguments** (reuse)
  - versus `docker container run`
  - i.e.
    - connect to compose project's default network
    - set `--dns` resolver
    - don't have to type out full image name: `dog` instead of `weshigbee/consul2-dog`
    - looks more like using command directly
- **Cleanup** - keeps all generated containers `associated` with compose project
  - `docker compose ps -a`
    - show all `associated` containers
  - `docker compose down --remove-orphans`
    - remove `associated` stragglers
    - without `--rm` to `docker compose run` there can be multiple exited containers as a result of calling `run` multiple times
      - i.e. if using a debug tool (such as `dog`/`dig`/`curl`)
