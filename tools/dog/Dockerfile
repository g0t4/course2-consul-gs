FROM archlinux

# install dog package
# https://archlinux.org/packages/community/x86_64/dog/
RUN pacman -Syu --noconfirm && \
  pacman -S dog --noconfirm

ENTRYPOINT [ "dog" ]