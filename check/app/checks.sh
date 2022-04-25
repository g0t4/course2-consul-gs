#!/usr/bin/env bash

sessionname="checks"

watch="watch -d -n 2 --no-title --color "

function watch_curl_json() {
  pane=$1
  url=$2
  title=${3:-$url} # title defaults to url
  cmd="$watch curl '$url --no-progress-meter | jq -C'"

  tmux select-pane -t $pane -T "$title"
  tmux send-keys -t $pane C-l "$cmd" C-m # run cmd
}

function watch_cmd() {
  pane=$1
  _cmd="$2" # assume quoted
  title="${3:-$_cmd}"
  cmd="$watch $_cmd"

  tmux select-pane -t $pane -T "$title"
  tmux send-keys -t $pane C-l "$cmd" C-m
}

function cmd() {
  pane=$1
  cmd="$2"
  title="$cmd"

  tmux select-pane -t $pane -T "$title"
  tmux send-keys -t $pane C-l "$cmd" C-m
}

tmux kill-session -t $sessionname
tmux new-session -d -s $sessionname

tmux set-option status off             # disable status bar
tmux set-option pane-border-status top # pane title bars
tmux set-option pane-border-format "#{pane_title}"
tmux set-option mouse on

# NOTE: zoom out a bit for this layout to work well (designed for ~32ish lines)

# split screen into 3 stacked panes
tmux split-window -l 8 -t 0 -v # split out bottom [10 lines]
tmux split-window -l 8 -t 0 -v # split out middle [10 lines]
# leaves top [remainder]

# split top pane into thirds
tmux split-window -p 40 -t 0 -h # split out top right 33%
tmux split-window -p 40 -t 0 -h # split out top middle [67%*.50=33.5%]
# leaves top left [33.5%]

# split top middle into 2 stack
tmux split-window -p 50 -t 1 -v # split top middle top and bottom (50%)

# split top right into 3 stack
tmux split-window -p 33 -t 3 -v
tmux split-window -p 50 -t 3 -v
# 60% is left for left most pane

# 0 - top left, uncomment one:
# watch_curl_json 0 localhost:3000/orders/report/1 # shipments
watch_cmd 0 "curl --no-progress-meter localhost:3000/orders/submit" "localhost:3000/orders/submit" # smtp

# 1 - top middle top, uncomment one:
# watch_curl_json 1 localhost:5000/shipments ship1 # shipments
watch_cmd 1 '"curl --no-progress-meter localhost:8025/api/v1/messages | jq -r length"' 'mail1 # messages' # smtp

# 2 - top middle bottom, uncomment one:
# watch_curl_json 2 localhost:5001/shipments ship2 # shipments
watch_cmd 2 '"curl --no-progress-meter localhost:8026/api/v1/messages | jq -r length"' 'mail2 # messages' # smtp

# 3 - top right top
watch_cmd 3 "consul catalog services"
# 4 - top right middle
dog="dog shipments.service.consul"
watch_cmd 4 "docker compose run --rm $dog --color=always " "$dog"
# 5 - top right bottom
dog="dog smtp.service.consul"
watch_cmd 5 "docker compose run --rm $dog --color=always " "$dog"

# 6 - middle
cmd 6 "consul monitor"

# 7 - bottom
tmux select-pane -t 7 -T "commands"
tmux select-pane -t 7

tmux -2 attach-session -d -t $sessionname
