

alias ".."="cd .."
alias "..."="cd ../.."
alias "...."="cd ../../.."

alias bat="batcat"
alias ls="exa --group-directories-first --group --color=always --classify --binary"
alias la="ls -al"

# use exa's tree view as a tree command
alias tree="exa --tree --group-directories-first --ignore-glob 'node_modules|bower_components|.git'"
alias treeal="tree --all --long --group"

complete -C /usr/bin/consul consul
