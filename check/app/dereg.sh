#!/usr/bin/env bash

sessionname="dereg"

watch="watch -d -n 1 --no-title --color "

function watch_curl_json(){
  pane=$1
  url=$2
  cmd="$watch curl '$url --no-progress-meter | jq -C'"

  tmux select-pane -t $pane -T "$url"  # title = url
  tmux send-keys -t $pane C-l "$cmd" C-m         # run cmd
}

function watch_cmd(){
  pane=$1
  _cmd="$2" # assume quoted
  title="${3:-$_cmd}"
  cmd="$watch $_cmd"

  tmux select-pane -t $pane -T "$title"
  tmux send-keys -t $pane C-l "$cmd" C-m
}

function cmd(){
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
tmux split-window -l 10 -t 0 -v # split out bottom [10 lines]
tmux split-window -l 10 -t 0 -v # split out middle [10 lines]
# leaves top [remainder]

tmux split-window -p 33 -t 0 -h # split out top right 33%
tmux split-window -p 50 -t 0 -h # split out top middle [67%*.50=33.5%]
# leaves top left [33.5%] 

tmux split-window -l 4 -t 2 -v
tmux split-window -l 4 -t 2 -v
# 60% is left for left most pane

# 0 - top left
watch_curl_json 0 localhost:3000/orders/report/1

# 1 - top middle
watch_curl_json 1 localhost:5000/shipments

# 2 - top right top
watch_cmd 2 "consul catalog services"

# 3 - top right middle
dog="dog @172.18.0.2 shipments.service.consul"
watch_cmd 3 "docker compose run --rm $dog --color=always " "$dog"

# 4 - top right bottom
dog="dog @172.18.0.2 smtp.service.consul"
watch_cmd 4 "docker compose run --rm $dog --color=always " "$dog"

# 5 - middle
cmd 5 "consul monitor"

# 6 - bottom
tmux select-pane -t 6 -T "commands"
tmux select-pane -t 6

tmux -2 attach-session -d -t $sessionname
