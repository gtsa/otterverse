FROM ruby:3.1.3-bullseye

ARG UID=1001
ARG GID=1001

RUN groupadd -g ${GID} appuser && \
    useradd -m -u ${UID} -g ${GID} appuser

ENV GEM_HOME="/app/.bundle"
ENV PATH $GEM_HOME/bin:$GEM_HOME/gems/bin:$PATH

RUN gem install bundler rails rake

ENV RAILS_ROOT /app
WORKDIR /app

RUN mkdir -p /app/tmp/pids /app/log && \
    chown -R 1001:1001 /app/tmp /app/log

EXPOSE 3000

USER appuser

ENTRYPOINT ["/app/bin/docker-entrypoint.sh"]
CMD ["rails", "server"]
