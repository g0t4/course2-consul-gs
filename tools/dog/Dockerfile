FROM archlinux

# install dog package
# https://archlinux.org/packages/community/x86_64/dog/
RUN pacman -Syu --noconfirm && \
  pacman -S dog --noconfirm

# dog command is only intended purpose for this image (not exec'ing into a shell, no piping in/out - dog command has concise, colorized output that rocks as is - NO HELPERS needed)

ENTRYPOINT [ "dog" ]