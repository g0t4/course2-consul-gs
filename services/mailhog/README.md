# mailhog

A test `SMTP` server.

- `SMTP` port `1025`
  - send emails here, addressed to/from anyone
- `HTTP` port `8025`
  - web UI (think gmail) & HTTP API
    - one giant inbox with all emails received
  - button to clear emails
  - supports browser notifications
- many more features:
  - https://hub.docker.com/r/mailhog/mailhog
  - https://github.com/mailhog/MailHog

## commands

```bash

# mailhog one-off container
docker container run --rm -it --name mh \
  -p 8025:8025 -p 1025:1025 mailhog/mailhog

# open web UI http://localhost:8025
# messages API:
curl -s http://localhost:8025/api/v2/messages | jq

# send an email (uses sendmail in container)
echo "hello world" | docker container exec mh \
  sendmail -S localhost:1025 -f me@me.com you@you.com

```
