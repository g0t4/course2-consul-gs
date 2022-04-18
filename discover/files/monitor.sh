#!/usr/bin/env bash

sessionname="monitor-files"

watch="watch -d -n 1 --no-title --color"
curl_order="$watch curl 'localhost:3000/orders/report/1 --no-progress-meter | jq -C'"
curl_order_title="localhost:3000/orders/report/1"
curl_shipments="$watch 'curl localhost:5000/shipments --no-progress-meter | jq -C'"
curl_shipments_title="localhost:5000/shipments"
consul_services="$watch consul catalog services"
consul_services_title="consul catalog services"

tmux kill-session -t $sessionname
tmux new-session -d -s $sessionname

tmux set-option status off             # disable status bar
tmux set-option pane-border-status top # pane title bars
tmux set-option pane-border-format "#{pane_title}"
tmux set-option mouse on

#
# | 0 |_1_|
# |___|_2_|
# |   3   |
#
# split screen into 60/40 top & bottom
tmux split-window -p 40 -t 0 -v
# split top half 50/50 left & right
tmux split-window -p 50 -t 0 -h
# split upper right 60/40 top & bottom
tmux split-window -p 30 -t 1 -v

# 0 - upper left - orders service
tmux select-pane -t 0 -T "$curl_order_title"
tmux send-keys -t 0 "$curl_order" C-m

# 1 - upper right top - shipments service
tmux select-pane -t 1 -T "$curl_shipments_title"
tmux send-keys -t 1 "$curl_shipments" C-m

# 2 - upper right bottom - registered services
tmux select-pane -t 2 -T "$consul_services_title"
tmux send-keys -t 2 "$consul_services" C-m

# 3 - bottom pane - running commands
tmux select-pane -t 3 -T "commands"
tmux select-pane -t 3

tmux -2 attach-session -d -t $sessionname

# https://man7.org/linux/man-pages/man1/tmux.1.html
# ctrl+b,arrow # move panes
# ctrl+b,d # detach from session 
#   tmux attach-session -t $sessionname
# ctrl+b,? # list key bindings
# ctrl+b,C # interactive tmux options editing/docs
# tmux refresh # 'fix' if Cmd+K