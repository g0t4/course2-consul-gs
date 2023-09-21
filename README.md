# Getting Started with Consul - 2nd Edition

## Course UPDATES!!!

- For `v1.16+` use the new Docker Hub verified image: [`hashicorp/consul`](https://hub.docker.com/r/hashicorp/consul)
  - The `consul` image that was used in the course is no longer receiving updates after `v1.15`
  - FYI, the course demos were developed with `v1.11.4`
  - TODO
    - update video: "m2 - Consul's Official Docker Image"

## Links

- [`consul.io` site](https://www.consul.io)
- docs
  - [download / install](https://www.consul.io/downloads)
  - [general usage](https://www.consul.io/docs)
  - [`consul` command](https://www.consul.io/commands)
  - [HTTP API](https://www.consul.io/api-docs)
  - [tutorials](https://learn.hashicorp.com/consul)
- githubs
  - [`hashicorp` org](https://www.github.com/hashicorp)
  - [`hashicorp/consul` repo](https://www.github.com/hashicorp/consul)

```shell
# query hashicorp repos with 'consul' in name
gh repo list --no-archived --limit 1000 \
 --json 'name,description' \
 --jq '.[] | select(.name | contains("consul"))' \
 hashicorp \
 | jq
```

## 1st Edition - Notes

- In 2016, I published two courses about Consul:
  - [Getting Started with Consul](https://www.pluralsight.com/courses/consul-getting-started)
  - [Deploying Consul](https://www.pluralsight.com/courses/consul-deploying)
- Examples (for both courses) are available via github: [Consul Getting Started](https://github.com/g0t4/consul-getting-started).
  - 2nd Edition examples are new/modernized to compliment the 1st Edition examples.
- At this time I am only updating the 1st Edition `Getting Started` course.
  - That said, some updated materials may overlap with the `Deploying` course.
