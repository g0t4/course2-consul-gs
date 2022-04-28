#!/usr/bin/env bash

sessionname="kv"

watch="watch -d -n 1 --no-title --color "

function watch_curl_json() {
  pane=$1
  url=$2
  cmd="$watch curl '$url --no-progress-meter | jq -C'"

  tmux select-pane -t $pane -T "$url"    # title = url
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
tmux bind-key -n C-k "clear-history; refresh-client" # refresh-client fix for hitting Cmd+K

# NOTE: zoom out a bit for this layout to work well (designed for ~32ish lines)
tmux split-window -p 33 -t 0 -v # split out bottom [10 lines]
tmux split-window -p 50 -t 0 -v # split out middle [10 lines]
# leaves top [remainder]

tmux split-window -p 33 -t 0 -h # split out top right 33%
tmux split-window -p 50 -t 0 -h # split out top middle [67%*.50=33.5%]
# leaves top left [33.5%]

# 0 - top left
watch_cmd 0 "consul kv get -recurse"

# 1 - top middle
# watch_cmd 1 "docker compose ..."

# 2 - top right top
# watch_cmd 2 "docker compose ..."

# 3 - middle
cmd 3 "consul monitor"

# bottom
tmux select-pane -t bottom -T "commands"
tmux select-pane -t bottom

tmux -2 attach-session -d -t $sessionname
